from user.app.app import app

import json
import unittest


class RegisterUserTest(unittest.TestCase):

    test_user = {"username": "u1_app", "password": "p1", "email": "john.doe@hotmail.com"}

    def test_register_a_user_successfully(self):
        request, response = app.test_client.post("/register", data=json.dumps(self.__class__.test_user))
        assert response.status == 200
        assert response.json.get("error") == 0
        assert response.json.get("errorMsg") == ""
        assert response.json.get("user").get("username") == "u1_app"
        assert response.json.get("user").get("email") == "john.doe@hotmail.com"
        assert "password" not in response.json.get("user")

    def test_register_a_user_twice_fail(self):
        app.test_client.post("/register", data=json.dumps(self.__class__.test_user))
        request, response = app.test_client.post("/register", data=json.dumps(self.__class__.test_user))
        assert response.status == 200
        assert response.json.get("error") == 1
        assert response.json.get("errorMsg") == "u1_app already exists in the database"
        assert response.json.get("user") == None


class ValidateUserTest(unittest.TestCase):

    test_user = {"username": "u2_app", "password": "p1", "email": "john.smith@yahoo.com"}

    def test_validate_a_user_successfully(self):
        y, x = app.test_client.post("/register", data=json.dumps(self.__class__.test_user))
        request, response = app.test_client.post("/validate", data=json.dumps(self.__class__.test_user))
        assert response.status == 200
        assert response.json.get("found") == True
        assert response.json.get("username") == self.__class__.test_user["username"]
        assert response.json.get("user_id") != None


    def test_validate_a_user_bad_pw(self):
        request, response = app.test_client.post("/validate", data=json.dumps({"username": self.__class__.test_user["username"], "password": "badpass"}))
        assert response.status == 200
        assert response.json.get("found") == False
        assert response.json.get("username") is None
        assert response.json.get("user_id") is None

    def test_validate_a_user_not_exist(self):
        request, response = app.test_client.post("/validate", data=json.dumps({"username": "whodis", "password": "badpass"}))
        assert response.status == 200
        assert response.json.get("found") == False
        assert response.json.get("username") is None
        assert response.json.get("user_id") is None


if __name__ == "__main__":
    unittest.main()
