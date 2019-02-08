from sanic import Sanic
from sanic.response import json

from authentication.jwt.jwtmanager import JWTManager
from authentication.user.user import FakeUserManager

app = Sanic(__name__)
jwtm = JWTManager(userManager=FakeUserManager(validCredFlag=True))

@app.route("/generateAuthToken", methods=['POST', ])
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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
