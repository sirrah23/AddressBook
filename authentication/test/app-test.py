from authentication.app.app import app

import json
import unittest


class GenerateAuthTokenTest(unittest.TestCase):

    def test_generate_auth_token_successfully(self):
        request, response = app.test_client.post('/generateAuthToken', data=json.dumps({'username': 'u1', 'password': 'p1'}))
        assert response.status == 200
        print(response.json)
        assert response.json.get('error') == 0
        assert type(response.json.get('token')) == str
        assert len(response.json.get('token')) > 0

if __name__ == '__main__':
    unittest.main()
    