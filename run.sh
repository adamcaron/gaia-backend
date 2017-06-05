#!/bin/bash
source run.config.source
docker run \
  -d \
  -p $API_PORT:$API_PORT \
  -e API_PORT=$API_PORT \
  -e NODE_ENV='production' \
  --name gaia \
  adamcaron/gaia-backend