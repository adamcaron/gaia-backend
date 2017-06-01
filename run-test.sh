#!/bin/bash
export RUNNING_TESTS=true
source run.config.source
echo "Running container with tests:"
docker run \
  -d \
  -p $API_PORT:$API_PORT \
  -e API_PORT=$API_PORT \
  --name gaia-test \
  -v $("pwd")/src:/api/src \
  -v $("pwd")/test:/api/test \
  adamcaron/gaia-backend \
  ./bin/runMocha.js \

docker container logs -f gaia-test
echo "Removing container:"
docker container rm gaia-test