from app import app
from flask import jsonify


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"


@app.route("/songs")
def list_songs():
    """Returns a JSON blob with the list of songs.
    """
    songs = [
        {
            "id": 1,
            "title":  "Running",
            "country": "Cyprus",
            "artist": "Sandro",
            "link": "https://www.youtube.com/watch?v=Jl_qEw_4OK0&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=21"
        },
        {
            "id": 3,
            "title":  "Violent Thing",
            "country": "Germany",
            "artist": "Ben Dolic",
            "link": "https://www.youtube.com/watch?v=hAobDQ9GbT4&list=PLmWYEDTNOGUL69D2wj9m2onBKV2s3uT5Y&index=31"
        }
    ]
    return jsonify(songs)
