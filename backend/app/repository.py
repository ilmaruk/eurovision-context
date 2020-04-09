import typing
import uuid

from app import db
from app.models import Song, Vote, VoteSong


def get_all_songs() -> typing.List[Song]:
    return Song.query.all()


def count_all_songs() -> int:
    return len(get_all_songs())


def get_song(id: str) -> Song:
    return Song.query.get(id)


def set_vote(vote: typing.Dict) -> typing.Optional[str]:
    try:
        v = Vote(email=vote["email"], validation=str(uuid.uuid4()))
        db.session.add(v)
        db.session.flush()

        for index, song in enumerate(vote["songs"]):
            s = VoteSong(vote=v.id, song=int(song), position=index+1)
            db.session.add(s)

        db.session.commit()
    except Exception as error:
        db.session.rollback()
        return str(error)

    return None
