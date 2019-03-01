from sanic import Sanic
from sanic.response import json

from user.user.schema import initializeDatabase
from user.user.service_factory import RegistrationServiceFactory, ValidationServiceFactory

initializeDatabase()

app = Sanic(__name__)
registration_service = RegistrationServiceFactory.get_registration_service()
validation_service = ValidationServiceFactory.get_validation_service()


@app.route("/register", methods=["POST", ])
async def register(request):
    reqData = request.json
    if not registration_service.is_valid_register_params(reqData):
        return json({"error": 1, "errorMsg": "The request parameters are invalid", "user": None})
    registration_result = registration_service.register_new_user(reqData)
    registration_result = registration_service.clean_user_dict(registration_result)
    return json(registration_result)

@app.route("/validate", methods=["POST", ])
async def register(request):
    reqData = request.json
    if not validation_service.is_valid_params(reqData):
        return json({"error": 1, "errorMsg": "The request parameters are invalid", "user": None})
    validation_result = validation_service.validate_user(reqData)
    return json(validation_result)


if __name__ == "__main__":
    # TODO: Make the port # configurable...
    app.run(host="0.0.0.0", port=8001)