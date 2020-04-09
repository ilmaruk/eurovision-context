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
    data = {}
    for s in get_all_songs():
        data[s.id] = s.serialise()
    return jsonify(data), HTTPStatus.OK


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

    error = set_vote(vote)
    if error is not None:
        return jsonify({"error": f"invalid vote: {error}"}), HTTPStatus.BAD_REQUEST

    return "", HTTPStatus.CREATED
