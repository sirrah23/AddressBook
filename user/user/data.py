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

    _data_dict_keys = ["username", "password", "email", "uuid", "hashed_password"]

    def __init__(self, username, email, password=None, hashed_password=None, uuid=None):
        self._password = None
        self._hashed_password = None
        self._uuid = None
        self._set_username(username)
        self._set_password(password)
        self._set_hashed_password(hashed_password)
        self._set_email(email)
        self._set_uuid(uuid)

    def _set_username(self, username):
        validate_string(username)
        self._username = username
    
    def _get_username(self):
        return self._username
    
    def _set_password(self, password):
        if password is None:
            return
        password_type = type(password)
        if password_type not in (str, bytes):
            raise ValueError(f"Input password is expected to be of type `str` or `bytes` but is of type {password_type.__name__}")
        if password_type == bytes:
            password = str(password)
        validate_string(password)
        self._password = password 
    
    def _get_password(self):
        return self._password
    
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
        if self._uuid is None:
            self._uuid = str(uuid.uuid4())
        return self._uuid
    
    def _set_hashed_password(self, hashed_password):
        self._hashed_password = None
        if self._password is not None:
            self._hashed_password = bcrypt.hashpw(self._password.encode(encoding="utf8"), bcrypt.gensalt()).decode("utf8")
        elif hashed_password is not None:
            self._hashed_password = hashed_password
    
    def _get_hashed_password(self):
        return self._hashed_password
    
    username = property(_get_username, _set_username)
    password = property(_get_password, _set_password)
    email = property(_get_email, _set_email)
    uuid = property(_get_uuid, _set_uuid)
    hashed_password = property(_get_hashed_password, _set_hashed_password)

    def is_correct_password(self, input_password):
        if type(input_password) != bytes:
            input_password = input_password.encode(encoding="utf8")
        return bcrypt.checkpw(input_password, self._hashed_password.encode(encoding="utf8"))

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