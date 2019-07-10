import os

from sanic import Sanic
from sanic.response import json
from sanic_cors import CORS, cross_origin

from authentication.jwt.jwtmanager import JWTManager
from authentication.user.user import UserManager, FakeUserManager
from authentication.config import config

app = Sanic(__name__)
CORS(app, automatic_options=True)

if os.environ.get("mode", "test") == "test":
    jwtm = JWTManager(userManager=FakeUserManager())
else:
    jwtm = JWTManager(userManager=UserManager(config['userNodeName'], config['port']))

@app.route('/generateAuthToken', methods=['POST', ])
async def generateAuthToken(request):
    reqData = request.json
    # TODO: Separate request validation code
    if ('username' not in reqData) or ('password' not in reqData):
        return json({'error': 1, 'errorMsg': 'The request parameters are invalid', 'token': None})
    try:
        newJWT = jwtm.createNewJWT(reqData['username'], reqData['password'])
    except ValueError:
        return json({'error': 1, 'errorMsg': 'Invalid credentials', 'token': None})
    except:
        return json({'error': 1, 'errorMsg': 'Something went wrong', 'token': None})
    else:
        return json({'error': 0, 'errorMsg': '','token': newJWT})

@app.route('/validateAuthToken', methods=['POST', ])
async def validateAuthToken(request):
    reqData = request.json
    if 'token' not in reqData:
        return json({'error': 1, 'errorMsg': 'The request parameters are invalid', 'payload': None})
    try:
        payload = jwtm.decodeJWT(reqData['token'])
    except ValueError:
        return json({'error': 1, 'errorMsg': 'Invalid token', 'payload': None})
    else:
        return json({'error':0, 'errorMsg': '', 'payload': payload})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
