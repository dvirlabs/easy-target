from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from ipaddress import ip_address
from fastapi import UploadFile, File
from typing import List
from dotenv import load_dotenv, dotenv_values
import pandas as pd
import requests
import logging
import os
import io


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.chdir = ("..")

load_dotenv()

######## Check if target exsist in targets.yml file ########
def check_target_exists(target_ip, port):

    targets_file = os.getenv('PROMETHEUS_TARGETS_FILE')
    with open(targets_file, "r") as f:
        for line in f:
            if f"'{target_ip}:{port}'" in line.strip():
                return True
    return False

######## Validate that the port is between 1 to 65535 ########
def validate_port(port: str):
    try:
        port_num = int(port)
        if port_num < 1 or port_num > 65535:
            raise ValueError
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid port: must be between 1 and 65535")

######## Api request to insert new target to targets.yml file ########
@app.post("/add_target")
async def add_target(data: dict): 
    # Validate IP address format
    try:
        target_ip = data.get('target_ip')
        port = data.get('port')
        ip_address(target_ip)
        validate_port(port)
        int(port)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid IP address format")
        # Check if target already exists
    if check_target_exists(target_ip, port):
        raise HTTPException(status_code=409, detail=f"Target '{target_ip}:{port}' already exists")
    
    targets_file = os.getenv('PROMETHEUS_TARGETS_FILE')

    # Update prometheus.yml with the new target
    with open(targets_file, "a") as f:
        f.write(f"\n  - '{target_ip}:{port}'")  # Adjust port if needed 

    return {f"Target {target_ip} added successfully!"}

######## Api request to remove exsisting target from targets.yml file ########
@app.delete("/remove_target")
async def remove_target(data: dict):
    # Validate IP address format
    try:
        target_ip = data.get('target_ip') 
        port = data.get('port')
        ip_address(target_ip)
        validate_port(port)
        int(port)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid IP address format")

    target_to_remove = f"'{target_ip}:{port}'"
    targets_file = os.getenv('PROMETHEUS_TARGETS_FILE')
    
    # Check if target exists before attempting removal
    if not check_target_exists(target_ip, port):
        raise HTTPException(status_code=404, detail=f"Target '{target_ip}:{port}' not found")

    # Read the original targets.yml file
    with open(targets_file, "r") as f:
        lines = f.readlines()

    # Filter out the target to remove from the list
    filtered_lines = [line for line in lines if target_to_remove not in line]

    # Write the updated targets.yml file
    with open(targets_file, "w") as f:
        f.writelines(filtered_lines)

    return {f"Target {target_ip} removed successfully!"}

######## Api request that create an Api request to Prometheus and get the targets from it ########
@app.get("/get_targets")
async def get_prometheus_targets():    
    prometheus_url = os.getenv('PROMETHEUS_URL') + '/api/v1/targets'
    try:
        # Define the parameters for the query
        params = {
            "limit": 10
        }
        
        # Make the request to the Prometheus API
        response = requests.get(prometheus_url, params=params)

        # Check if the request was successful
        if response.status_code == 200:
            # Extract and return the JSON response
            data = response.json()
            targets = data["data"]["activeTargets"]
            scrape_urls = [target["discoveredLabels"]["__address__"] for target in targets]
            return scrape_urls
        else:
            # Raise an HTTPException with the error status code and message
            raise HTTPException(status_code=response.status_code, detail=response.text)
    except Exception as e:
        # If an exception occurs, raise an HTTPException with status code 500 and the exception message
        raise HTTPException(status_code=500, detail=str(e))
    
######## Api request to export the exsisting targets into a targets.xlsx file ########    
@app.get("/export_targets")
async def export_targets():
    try:
        # Fetch targets data
        targets = await get_prometheus_targets()

        # Convert targets data to DataFrame
        df = pd.DataFrame(targets, columns=["Target IP"])

        # Convert DataFrame to xlsx file
        output = io.BytesIO()
        df.to_excel(output, index=False)
        output.seek(0)

        # Send xlsx file as response
        return Response(content=output.getvalue(), media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", headers={"Content-Disposition": "attachment; filename=targets.xlsx"})
    except Exception as e:
        logging.exception("An error occurred during export_targets:")
        raise HTTPException(status_code=500, detail=str(e))
    
######## Api request to add targets from file ########
@app.post("/add_targets_from_file")
async def add_targets_from_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        targets_str = contents.decode('utf-8')
        targets = [line.strip() for line in targets_str.split('\n') if line.strip()]

        invalid_targets = []
        valid_targets = []
        targets_file = os.getenv('PROMETHEUS_TARGETS_FILE')

        for target in targets:
            try:
                target_ip, port = target.split(':')
                ip_address(target_ip)
                validate_port(port)
                if check_target_exists(target_ip, port):
                    invalid_targets.append(f"Target '{target_ip}:{port}' already exists")
                else:
                    valid_targets.append(f"  - '{target_ip}:{port}'")  # Adjust format here
            except ValueError:
                invalid_targets.append(f"Invalid IP or port: '{target}'")

        if len(invalid_targets) > 0:
            raise HTTPException(status_code=400, detail=(' '.join(invalid_targets)))

        with open(targets_file, "a") as f:
            if os.stat(targets_file).st_size > 0:
                f.write("\n")  # Add newline if file not empty
            for target in valid_targets:
                f.write(target + "\n")  # Write target with newline

        return {"message": "Targets added successfully from file", "errors": invalid_targets}
    except Exception as e:
        raise e

    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)

