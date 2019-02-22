from user.user.service_factory import RegistrationServiceFactory
from user.user.schema import initializeDatabase

import unittest

initializeDatabase()

class CanRegisterUserTest(unittest.TestCase):

    rs = RegistrationServiceFactory.get_registration_service()

    def test_register_a_single_user(self):
        ud = {"username": "u1", "password": "p1", "email": "email@domain.com"}
        res = self.__class__.rs.register_new_user(ud)
        assert res["error"] == 0
        assert res["errorMsg"] == ""
        assert res["user"]["username"] == ud["username"]
        assert res["user"]["email"] == ud["email"]
        assert "uuid" in res["user"]
        assert "password" in res["user"]

if __name__ == "__main__":
    unittest.main()
