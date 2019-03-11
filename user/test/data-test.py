from user.user.data import UserDataObject

import unittest

class CreateUDOTest(unittest.TestCase):

    def test_create_udo_success(self):

        udo = UserDataObject("username", "email@domain.com", password="password")
        assert udo.username == "username"
        assert udo.password == "password"
        assert udo.email == "email@domain.com"
        assert len(udo.hashed_password) > 0
        assert len(udo.uuid) > 0

    def test_create_from_data_dict_success(self):
        data_dict = {"username": "username", "password": "password", "email":
                "email@domain.com", "uuid": "1234-5678-91011"}
        udo = UserDataObject.from_data_dict(data_dict)
        assert udo.uuid == data_dict["uuid"]
        assert udo.username == data_dict["username"]
        assert udo.password == data_dict["password"]
        assert udo.email == data_dict["email"]
        assert len(udo.hashed_password) > 0

    def test_create_udo_fail(self):
        with self.assertRaises(TypeError):
            udo = UserDataObject(1, 2, 3)

class UDODataDictDumpTest(unittest.TestCase):

    def test_data_dict_dump_udo(self):
        udo = UserDataObject("username", "password", "email@domain.com")
        dd = udo.to_data_dict()
        assert dd is not None
        assert "uuid" in dd
        assert "username" in dd
        assert "password" in dd
        assert "hashed_password" in dd
        assert "email" in dd

if __name__ == "__main__":
    unittest.main()
