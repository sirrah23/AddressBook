#!/bin/bash
# Run the user service via docker

docker run --rm -p 8001:8001 --net addb --name user_node -v $(pwd):/user user_node
