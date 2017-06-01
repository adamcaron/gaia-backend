#!/bin/bash
source run.config.source
docker run \
  -d \
  -p $API_PORT:$API_PORT \
  -e API_PORT=$API_PORT \
  --name gaia-dev \
  -v $("pwd")/src:/api/src \
  --rm \
  --entrypoint node_modules/.bin/nodemon \
  adamcaron/gaia-backend