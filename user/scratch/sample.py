"""An example of how the registration service would be initialized and used...just some scratch work.

TODO: Delete this file at some point
"""
from user.user.schema import initializeDatabase
from user.user.data import UserDataObject
from user.user.sql import UserSqlDataConn
from user.user.service import RegistrationService

def fmt_msg(msg):
    nl = "\n"
    sep = "================================================================"
    return f"{nl}{sep}{nl}{msg}{nl}{sep}{nl}"

initializeDatabase()

ud_good = {"username": "u1", "password": "p1", "email": "email@domain.com"}
ud_bad  = {"username": "u1", "password": "p1", "email": 32                }

rs = RegistrationService(UserSqlDataConn, UserDataObject)
print(fmt_msg(rs.register_new_user(ud_good))) # New user
print(fmt_msg(rs.register_new_user(ud_good))) # Same username & email again
print(fmt_msg(rs.register_new_user(ud_bad ))) # Bad user
