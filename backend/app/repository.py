import typing

from app.models import Song


def get_all_songs() -> typing.List[Song]:
    return Song.query.all()
