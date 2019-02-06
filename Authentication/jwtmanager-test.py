"""Tests for any JWT related logic.
"""

from jwtmanager import JWTManager
from user import FakeUserManager

import unittest


class CreateJWTTest(unittest.TestCase):

    def test_creates_a_new_JWT(self):
        """Test that a JWT is created successfully in the case where valid credentials are provided.
        """
        jwtm = JWTManager(userManager=FakeUserManager(validCredFlag=True), secret='secret')
        newToken = jwtm.createNewJWT('myUser', 'myPassword')
        assert isinstance(newToken, str)
        assert len(newToken) > 0
    
    def test_fails_to_create_new_JWT(self):
        """Test that the JWT creation process fails in the case where invalid credentials are provided.
        """
        with self.assertRaises(ValueError):
            jwtm = JWTManager(userManager=FakeUserManager(validCredFlag=False), secret='secret')
            newToken = jwtm.createNewJWT('myUser', 'myPassword')


class DecodeJWTTest(unittest.TestCase):

    def test_decode_an_existing_JWT(self):
        """Test that a JWT can be decoded successfully.
        """
        jwtm = JWTManager(userManager=FakeUserManager(validCredFlag=True), secret='secret')
        newToken = jwtm.createNewJWT('myUser', 'myPassword')
        payload = jwtm.decodeJWT(newToken)
        assert 'user_id' in payload
        assert payload['username'] == 'myUser'
    
    def test_decode_an_exisiting_JWT_Incorrectly(self):
        """Test that a JWT cannot be decoded when you, say, use the wrong secret key.
        """
        with self.assertRaises(ValueError):
            jwtmOne = JWTManager(userManager=FakeUserManager(validCredFlag=True), secret='secret1')
            jwtmTwo = JWTManager(userManager=FakeUserManager(validCredFlag=True), secret='secret2')
            newToken = jwtmOne.createNewJWT('myUser', 'myPassword')
            payload = jwtmTwo.decodeJWT(newToken)
        


if __name__ == '__main__':
    unittest.main()
    