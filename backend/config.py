import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_DATABASE_URI = "mysql://{}:{}@{}:{}/{}".format(
        os.environ.get("MYSQL_USER", ""),
        os.environ.get("MYSQL_PASS", ""),
        os.environ.get("MYSQL_HOST", "mysql"),
        os.environ.get("MYSQL_PORT", "3306"),
        os.environ.get("MYSQL_NAME", "eurovision")
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
