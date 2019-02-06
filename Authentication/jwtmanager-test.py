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
        newToken = jwtm.createNewJWTToken('myUser', 'myPassword')
        assert isinstance(newToken, str)
        assert len(newToken) > 0
    
    def test_fails_to_create_new_JWT(self):
        """Test that the JWT creation process fails in the case where invalid credentials are provided.
        """
        with self.assertRaises(ValueError):
            jwtm = JWTManager(userManager=FakeUserManager(validCredFlag=False), secret='secret')
            newToken = jwtm.createNewJWTToken('myUser', 'myPassword')

    
if __name__ == '__main__':
    unittest.main()
    