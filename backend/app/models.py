import typing

from app import db


class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(120), nullable=False)
    artist = db.Column(db.String(60), nullable=False)
    country = db.Column(db.String(16), nullable=False)
    link = db.Column(db.Text, nullable=False)

    def __repr__(self) -> str:
        return '<Song {} {}>'.format(self.title, self.artist)

    def serialise(self) -> typing.Dict:
        return {
            "title": self.title,
            "artist": self.artist,
            "country": self.country,
            "link": self.link,
        }
