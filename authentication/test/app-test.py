from authentication.app.app import app

import unittest


class HelloWorldUnitTest(unittest.TestCase):

    def test_hello_world_returns_the_good_stuff(self):
        request, response = app.test_client.get('/')
        assert response.status == 200
        assert response.json.get('hello') == 'world'

if __name__ == '__main__':
    unittest.main()
    