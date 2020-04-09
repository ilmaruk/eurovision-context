import os
import smtplib

from flask import Flask

from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

smtp = None
smtp_host = os.environ.get("SMTP_HOST")
if smtp_host is not None:
    smtp = smtplib.SMTP(host=smtp_host, port=int(os.environ.get("SMTP_PORT", "587")))
    smtp.starttls()
    smtp.login(os.environ.get("SMTP_USER", ""), os.environ.get("SMTP_PASS", ""))

from app import routes, models
