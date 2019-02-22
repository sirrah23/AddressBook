class RegistrationService:
    """A service that can be used to register new users by adding them to the system.
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

