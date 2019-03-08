"""This file contains any configuration related codeself.
"""

import json
from pathlib import Path


class DBConfig:
    """Read a JSON configuration file containing database informationself.
    """

    def __init__(self, fname):
        keys = ["DB_TYPE", "DB_USER", "DB_PASS", "DB_HOST", "DB_NAME"]
        p = Path(fname).expanduser()
        with p.open() as f:
            self.config = json.load(f)
        for key in keys:
            if key not in self.config:
                raise KeyError(f"{fname} is missing the following key: {key}")

    def getDbStr(self):
        DB_TYPE = self.config["DB_TYPE"]
        DB_USER = self.config["DB_USER"]
        DB_PASS = self.config["DB_PASS"]
        DB_HOST = self.config["DB_HOST"]
        DB_NAME = self.config["DB_NAME"]
        return f"{DB_TYPE}://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}"
