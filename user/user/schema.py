"""Contains the schemas for the tables in the database.
"""
from . import engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Boolean


Base = declarative_base()


class User(Base):
    """Represents the contents of the user table.
    """

    __tablename__ = "user"

    uuid = Column(String, primary_key=True)
    username =  Column(String)
    email = Column(String)
    password = Column(String)
    is_active = Column(Boolean, default=True)


def initializeDatabase():
    """Makes the database usable by creating all of the tables.
    """
    Base.metadata.create_all(engine)
