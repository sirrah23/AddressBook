from user.user.service_factory import RegistrationServiceFactory
from user.user.schema import initializeDatabase

import unittest

# TODO: Need to implement a dropDatabase() function too...
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


class CanValidateRequestParametersTest(unittest.TestCase):

    rs = RegistrationServiceFactory.get_registration_service()

    def test_is_valid_request(self):
        ud = {"username": "u2", "password": "p1", "email": "email@domain.com"}
        assert self.__class__.rs.is_valid_register_params(ud) == True

    def test_is_invalid_missing_param(self):
        ud = {"password": "p1", "email": "email@domain.com"}
        assert self.__class__.rs.is_valid_register_params(ud) == False

class CanCleanUserDataDictionaryTest(unittest.TestCase):

    rs = RegistrationServiceFactory.get_registration_service()

    def test_password_removed_from_user(self):
        ud = {"username": "u3", "password": "p1", "email": "email@domain.com"}
        res = self.__class__.rs.register_new_user(ud)
        res = self.__class__.rs.clean_user_dict(res)
        assert "password" not in res["user"]

    def test_password_not_removed_when_failed_register(self):
        ud = {"username": "u4", "password": "p1", "email": "email@domain.com"}
        self.__class__.rs.register_new_user(ud)
        res = self.__class__.rs.register_new_user(ud)
        res = self.__class__.rs.register_new_user(ud)
        res = self.__class__.rs.clean_user_dict(res)
        assert res["error"] == 1
        assert len(res["errorMsg"]) > 0
        assert res["user"] == None


if __name__ == "__main__":
    unittest.main()
