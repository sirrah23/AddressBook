import bcrypt

# TODO: Services could inherit from a BaseService class

class RegistrationService:
    """A service that can be used to register new users by adding them to the
    system.
    """

    def __init__(self, user_sql, user_data_obj):
        self.user_sql = user_sql()
        self.user_data_obj = user_data_obj

    def register_new_user(self, user_dict):
        """Given a dictionary containing user information, store the user in the data store.
        """
        try:
            udo = self.user_data_obj.from_data_dict(user_dict)
        except (TypeError, ValueError) as e:    
            return {"error": 1, "errorMsg": "Could not store the user, bad input", 
                    "user": None}

        try:
            self.user_sql.store_user(udo)
        except ValueError as e:
            return {"error": 1, "errorMsg": str(e), "user": None}
        
        return {"error": 0, "errorMsg": "", "user": udo.to_data_dict()}
    
    # TODO: Change name of this function to be consistent with the ValidationService
    def is_valid_register_params(self, rp):
        needed_parameters = ["username", "password", "email"]
        return all(p in rp for p in needed_parameters)
    
    def clean_user_dict(self, ud):
        res = ud
        if res["user"]:
            res["user"].pop("password", None)
        return res


class ValidationService:
    """A service that can be used to validate a given set of credentials e.g.
    (username, password)
    """

    def __init__(self, user_sql, user_data_obj):
        self.user_sql = user_sql()
        self.user_data_obj = user_data_obj

    def is_valid_params(self, rp):
        needed_parameters = ["username", "password"]
        return all(p in rp for p in needed_parameters)

    def validate_user(self, rp):
        res = {"found": False, "user_id": None, "username": None}
        user = self.user_sql.fetch_by_username(rp["username"])
        if not user:
            return res
        found = bcrypt.checkpw(rp["password"].encode("utf8"), user.password)
        res["found"] = found
        res["user_id"] = user.uuid
        res["username"] = user.username
        return res

