from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
import requests


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.chdir = ("..")


@app.post("/add_target")
async def add_target(data: dict): 
    # Validate IP address format
    try:
        target_ip = data.get('target_ip')
        port = data.get('port')
        from ipaddress import ip_address
        ip_address(target_ip)
        int(port)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid IP address format")
    
    targets_file = "prometheus-app/test.yml"

    # Update prometheus.yml with the new target
    with open(targets_file, "a") as f:
        f.write(f"\n  - '{target_ip}:{port}'")  # Adjust port if needed 

    return {f"Target {target_ip} added successfully!"}

@app.delete("/remove_target")
async def remove_target(data: dict):
    # Validate IP address format
    try:
        target_ip = data.get('target_ip')
        port = data.get('port')
        from ipaddress import ip_address
        ip_address(target_ip)
        int(port)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid IP address format")

    target_to_remove = f"'{target_ip}:{port}'"
    targets_file = "prometheus-app/test.yml"

    # Read the original targets.yml file
    with open(targets_file, "r") as f:
        lines = f.readlines()

    # Filter out the target to remove from the list
    filtered_lines = [line for line in lines if target_to_remove not in line]

    # Write the updated targets.yml file
    with open(targets_file, "w") as f:
        f.writelines(filtered_lines)

    return {"message": f"Target {target_ip} removed successfully!"}


@app.get("/get_targets")
async def get_prometheus_targets():    
    prometheus_url = "http://localhost:9090/api/v1/targets"
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
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)
