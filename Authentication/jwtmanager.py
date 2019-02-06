"""This file contains all logic related to JSON Web Tokens.
"""

import jwt

class JWTManager:
    """This class will allow you to create, validate, and decommission JWTs.
    """

    def __init__(self, userManager, secret=None, algorithm='HS256'):
        """Initializes a JWT manager object.

        Args:
            userManager: An object that will get the data for a user given their username and password.
            secret: The key that will be used to sign JWTs.
            algorithm: The algorithm that will be used to generate JWTs.
        Returns:
            JWT Manager Object
        """
        self.userManager = userManager
        self.secret = secret or JWTManager._generateSecretKey()
        self.algorithm = algorithm

    @staticmethod
    def _generateSecretKey():
        """Generates a secret key automatically in case one is not provided by the caller.
        
        Args:
            N/A
        Returns:
            A key with the format secret.<timestamp>.
        """
        return f"secret.{str(datetime.now())}"

    def createNewJWT(self, username, password):
        """Given a (username, password) pair, if the credentials are valid then a JWT will be generated. 
        The JWT payload will contain user related information such as;
            * user_id
            * username

        Args:
            username: The user for whom we would like to generate a JWT.
            password: The password associated with the user.
        Returns:
            JWT
        Raises:
            ValueError: If the (username, password) pair is invalid.
        """
        userData = self.userManager.getIfValid(username, password)
        if not userData['found']:
            raise ValueError("The given set of credentials are not valid, cannot generate a JWT")
        payload = {}
        payload['user_id'] = userData['user_id']
        payload['username'] = userData['username']
        return jwt.encode(payload, self.secret, self.algorithm).decode("utf-8")  

    def decodeJWT(self, token):
        """Given a JWT, decode it (if possible) and return the payload.

        Args:
            JWT: A JWT that was generated by a JWTManager object
        Returns:
            Payload: The JWT payload (if valid)
        Raises:
            ValueError: If the given JWT is invalid
        """
        try:
            return jwt.decode(token, self.secret, algorithms=[self.algorithm])
        except jwt.exceptions.InvalidSignatureError:
            raise ValueError(f'The following JWT is invalid: {token}')