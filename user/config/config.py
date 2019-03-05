"""This file contains any configuration related codeself.
"""

import json


class DBConfig:
    """Read a JSON configuration file containing database informationself.
    """

    def __init__(self, fname):
        keys = ["DB_TYPE", "DB_USER", "DB_PASS", "DB_HOST", "DB_NAME"]
        with open(fname) as f:
            self.config = json.load(f)
        for key in keys:
            if key not in self.config:
                raise KeyError(f"{fname} is missing the following key: {key}")
