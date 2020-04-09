import typing

import pytest

from app.validators import validate_email, validate_songs

email_test_data = [
    ("invalid", False),
    ("somebody@nowhere.no", False),
    ("somebody@oracle.com", True),
]


@pytest.mark.parametrize("email,expected", email_test_data)
def test_validate_email(email: str, expected: bool) -> None:
    assert validate_email(email) is expected


songs_test_data = [
    (["a", "b", "a"], False),
    (["a", "b"], True),
    (["a"], True),
    ([], True),
]


@pytest.mark.parametrize("songs,expected", songs_test_data)
def test_validate_songs(songs: typing.List[str], expected: bool) -> None:
    assert validate_songs(songs) is expected
