"""An example of how the registration service would be initialized and used...just some scratch work.

TODO: Delete this file at some point
"""
from user.user.schema import initializeDatabase
from user.user.data import UserDataObject
from user.user.sql import UserSqlDataConn
from user.user.service import RegistrationService

initializeDatabase()
ud = {"username": "u1", "password": "p1", "email": "email@domain.com"}
rs = RegistrationService(UserSqlDataConn, UserDataObject)
res = rs.register_new_user(ud)
print (res)
