"""Contains code that allows you to write UserDataObjects to SQL and to fetch data from SQL and 
return its associated UserDataObject.
"""
from . import engine
from user.user.data import UserDataObject
from user.user.schema import User
from sqlalchemy.orm import sessionmaker

class UserSqlDataConn:

    def __init__(self):
        self.session = sessionmaker(bind=engine)()
    
    def fetch_by_uuid(self, uuid):
        res = self.session.query(User).filter(User.uuid == uuid).all()
        if not res:
            return None
        return UserDataObject.from_data_dict(res[0].data_dict)

    def fetch_by_username(self, username):
        res = self.session.query(User).filter(User.username == username).all()
        if not res:
            return None
        return UserDataObject.from_data_dict(res[0].data_dict)
    
    def store_user(self, udo):
        if self.fetch_by_username(udo.username) is not None:
                raise ValueError(f"{udo.username} already exists in the database")
        u = User(**udo.to_data_dict())
        self.session.add(u)
        self.session.commit()
        
