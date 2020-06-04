import os
import smtplib

from urllib.parse import urlparse, parse_qs

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from http import HTTPStatus

from flask import jsonify, request

from app import app, smtp, SKIP_VOTE_VALIDATION
from app.repository import get_all_songs, set_vote, get_results, set_vote_valid
from app.validators import validate_vote


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route("/songs", methods=["GET", "OPTIONS"])
def list_songs() -> (str, int):
    """Return a JSON blob with the list of songs.
    """
    songs = []
    for s in get_all_songs():
        serialised = s.serialise()
        parsed_url = urlparse(serialised["link"])
        parsed_qs = parse_qs(parsed_url.query)
        serialised["video_id"] = parsed_qs["v"][0]
        songs.append(serialised)
    return jsonify(songs), HTTPStatus.OK


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
        v = set_vote(vote, SKIP_VOTE_VALIDATION)
    except Exception as error:
        return jsonify({"error": f"invalid vote: {str(error)}"}), HTTPStatus.BAD_REQUEST

    if not SKIP_VOTE_VALIDATION:
        send_validation_code(vote["email"], v.validation)

    return jsonify(""), HTTPStatus.CREATED


@app.route("/results", methods=["GET"])
def list_results() -> (str, int):
    try:
        limit = int(request.args.get("l", 0))
    except ValueError:
        # If the limit is not an integer, just ignore it
        limit = 0
    results = get_results(limit)
    if limit > 0:
        results["next"] = f"{request.base_url}?l={limit+1}"

    for s in results["results"]:
        s["var"] = "⥈"
    if limit > 1:
        prev = get_results(limit-1)
        for cp, c in enumerate(results["results"]):
            for pp, p in enumerate(prev["results"]):
                if p["song"]["id"] == c["song"]["id"] and pp != cp:
                    c["var"] = "⇡" if cp < pp else "⇣"
                    break

    return jsonify(results), HTTPStatus.CREATED


@app.route("/validate", methods=["GET"])
def validate_vote_code() -> (str, int):
    if not set_vote_valid(request.args.get("email"), request.args.get("code")):
        return "", HTTPStatus.UNAUTHORIZED
    return jsonify(""), HTTPStatus.OK


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


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
    return response
