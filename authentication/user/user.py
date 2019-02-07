"""Contains all code related to user logic.
"""

class FakeUserManager:
    """A fake user manager object which will indicate that a given 
    pair of credentials is either valid or invalid, no matter the input, 
    depending on how it is initalized.
    """

    def __init__(self, validCredFlag=True):
        """Initialize a fake user manager

        Args:
            validCredFlag: If true then the object will always return that a given user was found
                                else the object will always indicate that a given user was not found.
        Returns:
            FakeUserManager object
        """
        self.validCredFlag = validCredFlag

    def getIfValid(self, username, password):
        """Get the data for a user if the given (username, password) pair "is valid", 
        else indicate that no data could be fetched.
        
        Args:
            username: The username for the user
            password: The password associated with the given username for the user
        Returns:
            Dictionary with the following keys:
                found: True or False -- inidicates whether or not a user was found for the given credentials.
                user_id: The id associated with the user, if a user was found.
                username: The usernamea associated with the user, if a user was found.
        """
        if self.validCredFlag:
            return {
                'found': True,
                'user_id': 1,
                'username': username
                }
        else:
            return {
                'found': False,
                'user_id': None,
                'username': None
            }