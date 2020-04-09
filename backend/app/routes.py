import smtplib
from http import HTTPStatus

from flask import jsonify, request

from app import app
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

    # send_validation_code(vote["email"], v.validation)

    return "", HTTPStatus.CREATED


def send_validation_code(email: str, code: str) -> None:
    s = smtplib.SMTP(host="smtp.gmail.com", port=587)
    s.starttls()
    s.login("email", "pass")
    s.send_message(msg=f"Here's your validation code: {code}", from_addr="eurovision.context@oracle.com", to_addrs=[email])
