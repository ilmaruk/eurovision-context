from app import app
from flask import jsonify

from app.repository import get_all_songs


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route("/songs")
def list_songs():
    """Returns a JSON blob with the list of songs.
    """
    data = {}
    for s in get_all_songs():
        data[s.id] = s.serialise()
    return jsonify(data)
