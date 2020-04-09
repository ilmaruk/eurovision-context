import typing
from email.utils import parseaddr

from app.repository import count_all_songs, get_song


def validate_vote(vote: typing.Dict) -> typing.Optional[str]:
    try:
        if not validate_songs(vote["songs"]):
            return "invalid songs list"
        if not validate_email(vote["email"]):
            return "invalid email address"
    except KeyError as error:
        return f"missing field {str(error)}"

    return None


def validate_songs(songs: typing.List[str]) -> bool:
    """Make sure that the list of songs has no duplicates.
    """
    known = []  # type: typing.List[str]
    for id in songs:
        if id in known:
            return False
        known.append(id)

    return True


def validate_email(email: str) -> bool:
    """Only accept well formed Oracle email addresses.
    """
    _, address = parseaddr(email)
    return address.endswith("@oracle.com")
