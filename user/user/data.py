"""This file contains the user data object which can be used to read/write 
from/to the database and to marshall data in formats like JSON.
"""

import uuid
import bcrypt

def validate_string(s):
    if type(s) != str:
        raise TypeError(f"Expected a value of type string but instead received {type(s).__name__}")
    bad_chars = ("\n", "\r", "\t")
    is_valid = True
    for bad_char in bad_chars:
        if bad_char in s:
            is_valid = False
            break
    if not s.strip() or not is_valid:
        raise ValueError(f"Input contains one or more invalid characters: {s}")


class UserDataObject(object):

    def __init__(self, username, password, email, uuid=None):
        self._set_username(username)
        self._set_password(password)
        self._set_email(email)
        self._set_uuid(uuid)

    def _set_username(self, username):
        validate_string(username)
        self._username = username
    
    def _get_username(self):
        return self._username
    
    def _set_password(self, password):
        if type(password) == bytes:
            self._hashed_password = password
        else:
            validate_string(password)
            self._hashed_password = bcrypt.hashpw(password.encode(encoding="UTF-8"), bcrypt.gensalt())
    
    def _get_password(self):
        return self._hashed_password
    
    def _set_email(self, email):
        validate_string(email)
        self._email = email
    
    def _get_email(self):
        return self._email
    
    def _set_uuid(self, uuid):
        if uuid == None:
            self._uuid = uuid
            return
        validate_string(uuid)
        self._uuid = uuid
    
    def _get_uuid(self):
        if self._uuid == None:
            self._uuid = str(uuid.uuid4())
        return self._uuid
    
    username = property(_get_username, _set_username)
    password = property(_get_password, _set_password)
    email = property(_get_email, _set_email)
    uuid = property(_get_uuid, _set_uuid)

    _data_dict_keys = ["username", "password", "email", "uuid"]

    def to_data_dict(self):
        res = {}
        for prop in dir(self):
            if prop in self.__class__._data_dict_keys:
                res[prop] = getattr(self, prop)
        return res
    
    @classmethod
    def from_data_dict(cls, user_data_dict):
        args = {}
        for prop in user_data_dict:
            if prop in cls._data_dict_keys:
                args[prop] = user_data_dict[prop]
        return cls(**args)