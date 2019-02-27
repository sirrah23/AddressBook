from user.app.app import app

import json
import unittest


class RegisterUserTest(unittest.TestCase):

    test_user = {"username": "u1", "password": "p1", "email": "john.doe@hotmail.com"}

    def test_register_a_user_successfully(self):
        request, response = app.test_client.post("/register", data=json.dumps(self.__class__.test_user))
        assert response.status == 200
        assert response.json.get("error") == 0
        assert response.json.get("errorMsg") == ""
        assert response.json.get("user").get("username") == "u1"
        assert response.json.get("user").get("email") == "john.doe@hotmail.com"
        assert "password" not in response.json.get("user")

    def test_register_a_user_twice_fail(self):
        app.test_client.post("/register", data=json.dumps(self.__class__.test_user))
        request, response = app.test_client.post("/register", data=json.dumps(self.__class__.test_user))
        assert response.status == 200
        assert response.json.get("error") == 1
        assert response.json.get("errorMsg") == "u1 already exists in the database"
        assert response.json.get("user") == None


if __name__ == "__main__":
    unittest.main()
