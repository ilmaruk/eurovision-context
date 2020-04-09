FROM python:3.7

COPY backend/requirements.txt /tmp

RUN pip install -r /tmp/requirements.txt

ENV FLASK_APP backend.py

COPY backend/ /app

WORKDIR /app

CMD ["flask", "run", "--host=0.0.0.0", "--port=80"]