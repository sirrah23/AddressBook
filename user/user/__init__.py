import os
from sqlalchemy import create_engine

from user.config.config import DBConfig

def buildDBStrFromConfig(cfg):
    DB_TYPE = cfg.config["DB_TYPE"]
    DB_USER = cfg.config["DB_USER"]
    DB_PASS = cfg.config["DB_PASS"]
    DB_HOST = cfg.config["DB_HOST"]
    DB_NAME = cfg.config["DB_NAME"]
    return f"{DB_TYPE}://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}"

env = os.environ.get("mode", "test").strip().lower()

if env == "test" or env == "development":
    engine = create_engine("sqlite:///:memory:")
else:
    dbc = DBConfig("/home/harris/Programming/AddressBook/cfg.json")
    engine = create_engine(buildDBStrFromConfig(dbc))
