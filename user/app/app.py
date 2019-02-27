from sanic import Sanic
from sanic.response import json

from user.user.schema import initializeDatabase
from user.user.service_factory import RegistrationServiceFactory

initializeDatabase()

app = Sanic(__name__)
registration_service = RegistrationServiceFactory.get_registration_service()


@app.route("/register", methods=["POST", ])
async def register(request):
    # TODO: Too much random logic floating around, let's shove some of it into the registration service object
    reqData = request.json
    if ("username" not in reqData) or ("password" not in reqData) or ("email" not in reqData):
        return json({"error": 1, "errorMsg": "The request parameters are invalid"})
    registration_result = registration_service.register_new_user(reqData)
    if registration_result["error"] == 0:
        registration_result["user"].pop("password", None)
    return json(registration_result)


if __name__ == "__main__":
    # TODO: Make the port # configurable...
    app.run(host="0.0.0.0", port=8001)