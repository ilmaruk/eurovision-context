import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from http import HTTPStatus

from flask import jsonify, request

from app import app, smtp
from app.repository import get_all_songs, set_vote
from app.validators import validate_vote


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route("/songs", methods=["GET"])
def list_songs() -> (str, int):
    """Return a JSON blob with the list of songs.
    """
    return jsonify([s.serialise() for s in get_all_songs()]), HTTPStatus.OK


@app.route("/vote", methods=["POST"])
def handle_vote() -> (str, int):
    """Handle a JSON blob representing a vote by storing the vote
    and emailing the voter, with a validation code.
    """
    if request.content_type != "application/json":
        return f"invalid content type: {request.content_type}", HTTPStatus.BAD_REQUEST
    vote = request.get_json()

    error = validate_vote(vote)
    if error is not None:
        return jsonify({"error": f"invalid payload: {error}"}), HTTPStatus.BAD_REQUEST

    try:
        v = set_vote(vote)
    except Exception as error:
        return jsonify({"error": f"invalid vote: {str(error)}"}), HTTPStatus.BAD_REQUEST

    send_validation_code(vote["email"], v.validation)

    return "", HTTPStatus.CREATED


@app.route("/validate", methods=["GET"])
def validate_vote_code() -> (str, int):
    return "not implemented", HTTPStatus.NOT_IMPLEMENTED


def send_validation_code(email: str, code: str) -> None:
    sender_address = "noreply@oracle.com"

    # Setup the MIME
    message = MIMEMultipart()
    message["From"] = sender_address
    message["To"] = email
    message["Subject"] = "Verify your Eurovision Context vote"

    host = os.environ.get("PUBLIC_BACKEND_HOST", "http://localhost:5000")

    # The body and the attachments for the mail
    body = f"""
Thanks for submitting your vote for Eurovision Context 2020.
Please validate it by clicking on the link below:
{host}/validate?email={email}&code={code}

Yours,
The Eurovision Context Team
"""
    message.attach(MIMEText(body, "plain"))
    
    # Send the mail
    text = message.as_string()
    smtp.sendmail(sender_address, email, text)
