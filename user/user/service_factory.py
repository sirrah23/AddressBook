"""A file that contains factories which can be used to easily initialize service objects.
"""
from user.user.data import UserDataObject
from user.user.sql import UserSqlDataConn
from user.user.service import RegistrationService, ValidationService


class RegistrationServiceFactory:
    """Generates a registration service object which can be used to create new users.
    """

    @classmethod
    def get_registration_service(self):
        return RegistrationService(UserSqlDataConn, UserDataObject)


class ValidationServiceFactory:
    """Generates a validation service object which can be use to validate parameters.
    """

    @classmethod
    def get_validation_service(self):
        return ValidationService(UserSqlDataConn, UserDataObject)
        