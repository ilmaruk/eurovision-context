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
            "id": self.id,
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

    songs = db.relationship("VoteSong", backref="vote")

    def __repr__(self) -> str:
        return '<Vote email:{} valid:{}>'.format(self.email, self.valid)


class VoteSong(db.Model):
    vote_id = db.Column(db.Integer, db.ForeignKey("vote.id"), nullable=False, index=True)
    song_id = db.Column(db.Integer, nullable=False, index=True)
    position = db.Column(db.Integer, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint("vote_id", "song_id", "position"),
    )

    def __repr__(self) -> str:
        return '<VoteSong vote_id:{} song_id:{} position:{}>'.format(self.vote_id, self.song_id, self.position)
