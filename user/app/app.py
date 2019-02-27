from sanic import Sanic
from sanic.response import json

from user.user.schema import initializeDatabase
from user.user.service_factory import RegistrationServiceFactory

initializeDatabase()

app = Sanic(__name__)
registration_service = RegistrationServiceFactory.get_registration_service()


@app.route("/register", methods=["POST", ])
async def register(request):
    reqData = request.json
    if not registration_service.is_valid_register_params(reqData):
        return json({"error": 1, "errorMsg": "The request parameters are invalid", "user": None})
    registration_result = registration_service.register_new_user(reqData)
    registration_result = registration_service.clean_user_dict(registration_result)
    return json(registration_result)


if __name__ == "__main__":
    # TODO: Make the port # configurable...
    app.run(host="0.0.0.0", port=8001)