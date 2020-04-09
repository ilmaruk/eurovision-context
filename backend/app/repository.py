import operator
import typing
import uuid

from app import db
from app.models import Song, Vote, VoteSong


def get_all_songs() -> typing.List[Song]:
    return Song.query.all()


def count_all_songs() -> int:
    return Song.query.count()


def get_song(id: str) -> Song:
    return Song.query.get(id)


def set_vote(vote: typing.Dict) -> Vote:
    v = Vote(email=vote["email"], validation=str(uuid.uuid4()))
    try:
        db.session.add(v)
        db.session.flush()

        for index, song in enumerate(vote["songs"]):
            s = VoteSong(vote_id=v.id, song_id=int(song), position=index+1)
            db.session.add(s)

        db.session.commit()
    except Exception as error:
        db.session.rollback()
        raise

    return v


def get_results() -> typing.List:
    totals = {}

    votes = Vote.query.filter(Vote.valid)  # type: typing.List[Vote]
    for vote in votes:  # type: Vote
        for vs in vote.songs:  # type: VoteSong
            id = vs.song_id
            if id not in totals.keys():
                totals[id] = 0
            totals[id] += _points_map[vs.position]

    results = [{"song": {"id": i}, "points": points} for i, points in totals.items()]
    return sorted(results, key=lambda r: r["points"], reverse=True)


_points_map = {
    1: 12,
    2: 10,
    3: 8,
    4: 7,
    5: 6,
    6: 5,
    7: 4,
    8: 3,
    9: 2,
    10: 1,
}