#!/bin/bash
# Run the auth service via docker

docker run --rm -p 8000:8000 --net addb --name auth_node -v $(pwd):/authentication auth_node
