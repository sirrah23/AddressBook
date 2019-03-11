"""Contains code that allows you to write UserDataObjects to SQL and to fetch data from SQL and
return its associated UserDataObject.
"""
from . import engine
from user.user.data import UserDataObject
from user.user.schema import User
from sqlalchemy.orm import sessionmaker


class UserSqlDataConn:
    def __init__(self):
        self.session = sessionmaker(bind=engine.engine)()

    def _cleaned_user_dd(self, user_data):
        dd = user_data.data_dict
        dd["hashed_password"] = dd["password"]
        del dd["password"]
        return dd

    def fetch_by_uuid(self, uuid):
        res = self.session.query(User).filter(User.uuid == uuid).all()
        if not res:
            return None
        user_dd = self._cleaned_user_dd(res[0])
        return UserDataObject.from_data_dict(user_dd)

    def fetch_by_username(self, username):
        res = self.session.query(User).filter(User.username == username).all()
        if not res:
            return None
        user_dd = self._cleaned_user_dd(res[0])
        return UserDataObject.from_data_dict(user_dd)

    def store_user(self, udo):
        if self.fetch_by_username(udo.username) is not None:
            raise ValueError(f"{udo.username} already exists in the database")
        user_to_store = {
            "uuid": udo.uuid,
            "username": udo.username,
            "password": udo.hashed_password,
            "email": udo.email,
        }
        u = User(**user_to_store)
        self.session.add(u)
        self.session.commit()
