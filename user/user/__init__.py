import os
from sqlalchemy import create_engine

from user.config.config import DBConfig
from user.user.engine import EngineManager


mode = os.environ.get("mode", "test").strip().lower()

dbc = None
if mode != "test" and mode != "development":
    dbc = DBConfig("/etc/AddressBook/cfg.json")
engine = EngineManager(mode, configObj=dbc)
