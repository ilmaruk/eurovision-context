import typing

from sqlalchemy import PrimaryKeyConstraint

from app import db


class Song(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(120), nullable=False)
    artist = db.Column(db.String(60), nullable=False)
    country = db.Column(db.String(16), nullable=False)
    link = db.Column(db.Text, nullable=False)

    def __repr__(self) -> str:
        return '<Song title:{} artist:{}>'.format(self.title, self.artist)

    def serialise(self) -> typing.Dict:
        return {
            "title": self.title,
            "artist": self.artist,
            "country": self.country,
            "link": self.link,
        }


class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), nullable=False, unique=True)
    validation = db.Column(db.String(36), nullable=False, unique=True)
    valid = db.Column(db.Boolean(), default=False)

    def __repr__(self) -> str:
        return '<Vote email:{} valid:{}>'.format(self.email, self.valid)


class VoteSong(db.Model):
    vote = db.Column(db.Integer, nullable=False)
    song = db.Column(db.Integer, nullable=False)
    position = db.Column(db.Integer, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint("vote", "song", "position"),
    )

    def __repr__(self) -> str:
        return '<VoteSong vote:{} song:{} position:{}>'.format(self.vote, self.song, self.position)