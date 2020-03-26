FROM python:3.7

COPY requirements.txt /tmp
RUN pip install -r /tmp/requirements.txt

COPY backend/ /app

WORKDIR /app

CMD ["python", "app.py"]