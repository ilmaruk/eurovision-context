FROM python:3.7

COPY backend/ /app

RUN pip install -r /app/requirements.txt

ENV FLASK_APP backend.py

WORKDIR /app

CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]