import json
import logging
import os

logging.basicConfig(format='%(asctime)s - %(message)s', level=logging.INFO)

configFileLocation = os.path.dirname(os.path.abspath(__file__)) + "/config.json"

try:
    config = json.load(open(configFileLocation))
except:
    logging.error(f"Make sure your config file exists: {configFileLocation}")
    raise

keys = ('userNodeName', 'port')
if not all(key in config for key in keys):
    logging.error(f"Your config file should contain the following keys: {','.join(keys)}")
    raise
