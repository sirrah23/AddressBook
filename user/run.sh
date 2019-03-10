#!/bin/bash
# Run the user service via docker

docker run --rm -p 8001:8001 --net addb --name user_node -e mode="prod" -v $(pwd):/user -v /etc/AddressBook:/etc/AddressBook user_node 
