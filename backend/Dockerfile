FROM python:3.11.2

WORKDIR /easy-target/backend

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY main.py .

ENV PROMETHEUS_TARGETS_FILE=targets.yml 

EXPOSE 8000

 CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

