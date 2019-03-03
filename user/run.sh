#!/bin/bash
# Run the user service via docker

docker run -p 8001:8001 -v ${PWD}:/user user_serv
