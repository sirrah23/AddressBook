"""This file contains code which manages the relationship with the database engineself.
"""
from sqlalchemy import create_engine


class EngineManager:
    def __init__(self, mode, configObj=None):
        if mode == "test" or mode == "development":
            self.engine = create_engine("sqlite:///:memory:")
        else:
            if not configObj:
                raise ValueError("No database configuration object provided")
            self.engine = create_engine(configObj.getDbStr())
