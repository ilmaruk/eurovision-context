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

SKIP_VOTE_VALIDATION = os.environ.get("SKIP_VOTE_VALIDATION", "false") == "true"
SMTP_HOST = os.environ.get("SMTP_HOST")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "")
SMTP_PASS = os.environ.get("SMTP_PASS", "")

smtp = None
if SMTP_HOST is not None:
    smtp = smtplib.SMTP(host=SMTP_HOST, port=SMTP_PORT)
    smtp.starttls()
    smtp.login(SMTP_USER, SMTP_PASS)

from app import routes, models
