# Gaia Backend

An Express app exposing a single endpoint, which leverages the Gaia API and returns the longest preview media URL.

## Up and Running

Ensure Docker is running.

### With just the image

`docker run -d -p 8085:8085 --name gaia adamcaron/gaia-backend`

### With the source code

```
git clone git@github.com:adamcaron/gaia-backend.git
cd gaia-backend
```

`bash run.sh`

#### For development

`bash run-dev.sh`

Source code at `/src` is mounted into the container.

### To run tests locally

`bash run-test.sh`

Source code and test directories are mounted into the container.

## Endpoints

The dummy endpoint can be found at [localhost:8085/v1/terms/test](http://localhost:8085/v1/terms/test)

----

Shoutout to [voronianski/express-api-sample](https://github.com/voronianski/express-api-sample) for API design inspiration.  It seemed cleaner to build this app from scratch using parts from that template rather than fork the original and rip out large chunks of code, especially given differences in tooling and feature requirements, and syntax preferences.