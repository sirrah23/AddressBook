from authentication.app.app import app

import json
import unittest


class GenerateAuthTokenTest(unittest.TestCase):

    def test_generate_auth_token_successfully(self):
        request, response = app.test_client.post('/generateAuthToken', data=json.dumps({'username': 'u1', 'password': 'p1'}))
        assert response.status == 200
        assert response.json.get('error') == 0
        assert response.json.get('errorMsg') == ''
        assert type(response.json.get('token')) == str
        assert len(response.json.get('token')) > 0

class ValidateAuthTokenTest(unittest.TestCase):

    def test_generate_auth_token_successfully(self):
        request, response = app.test_client.post('/generateAuthToken', data=json.dumps({'username': 'u1', 'password': 'p1'}))
        
        request, response = app.test_client.post('/validateAuthToken', data=json.dumps({'token': response.json.get('token')}))
        assert response.status == 200
        assert response.json.get('error') == 0
        assert response.json.get('errorMsg') == ''
        assert response.json.get('payload')['username'] == 'u1'
        assert 'user_id' in response.json.get('payload')

if __name__ == '__main__':
    unittest.main()
    