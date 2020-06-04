import operator
import typing
import uuid

from sqlalchemy.exc import IntegrityError

from app import db
from app.models import Song, Vote, VoteSong


def get_all_songs() -> typing.List[Song]:
    return Song.query.all()


def count_all_songs() -> int:
    return Song.query.count()


def get_song(id: str) -> Song:
    return Song.query.get(id)


def set_vote(vote: typing.Dict, skip_validation: bool = False) -> Vote:
    v = Vote(email=vote["email"], validation=str(uuid.uuid4()), valid=skip_validation)
    try:
        db.session.add(v)
        db.session.flush()

        for index, song in enumerate(vote["songs"]):
            s = VoteSong(vote_id=v.id, song_id=song["id"], position=index+1)
            db.session.add(s)

        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        raise Exception("this email address has already used to vote")
    except Exception as error:
        db.session.rollback()
        raise

    return v


def get_results(limit: int) -> typing.Dict:
    """Fetch votes and build the results table.
    The number of votes to fetch can be limited via the 'l' query parameter.
    """
    totals = {}

    votes = Vote.query.filter(Vote.valid).order_by(Vote.id.asc())
    total_votes = votes.count()
    used_votes = total_votes
    if limit > 0:
        votes = votes[:limit]
        used_votes = limit
    for vote in votes:  # type: Vote
        for vs in vote.songs:  # type: VoteSong
            id = vs.song_id
            if id not in totals.keys():
                totals[id] = {
                    "song": vs.song.serialise(),
                    "points": 0,
                }
            totals[id]["points"] += _points_map[vs.position]

    data = {
        "results": sorted(totals.values(), key=lambda r: r["points"], reverse=True),
        "last": votes[-1].email,
        "votes_total": total_votes,
        "votes_used": used_votes,
    }

    return data


def set_vote_valid(email: str, code: str) -> bool:
    v = Vote.query.filter(Vote.email == email).filter(Vote.validation == code).first()  # type: Vote
    if v is None:
        return False

    v.valid = True
    db.session.add(v)
    db.session.commit()


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
