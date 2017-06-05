# Gaia Backend

An Express app exposing a single endpoint, which leverages the Gaia API and returns the longest preview media URL.

## Up and Running

Ensure Docker is running.

### With just the image

Run `docker run -d -p 8085:8085 --name gaia adamcaron/gaia-backend`

### With the source code

```
git clone git@github.com:adamcaron/gaia-backend.git
cd gaia-backend
```

Run `bash run.sh`

#### For development

Run `bash run-dev.sh`

Source code at `/src` is mounted into the container.

### To run tests

The following command runs the test suite locally in a container.

Test output renders in the console and the container is removed / deleted after tests are complete.

Run `bash run-test.sh`

Source code and test directories are mounted into the container.

## Endpoints

Navigate to [http://localhost:8085/v1/terms/26681/longest-preview-media-url](http://localhost:8085/v1/terms/26681/longest-preview-media-url) for JSON output including the longest preview's media url (`"bcHLS"`), the title's node id, the preview's node id, and the preview's duration.  Output depends on an initial term id of 26681 and additional resources being accessible from Gaia's API, and looks something like the following:
```
{
  "bcHLS": "https://hls.gaia.com/hls/41096/master.m3u8?expiration=1496718000&token=576bf444c25f9370445fd3376af4235b348b0d6127d07a15f9fb38998b3007db",
  "titleNid": "34871",
  "previewNid": "41096",
  "previewDuration": "314"
}
```

----

Shoutout to [voronianski/express-api-sample](https://github.com/voronianski/express-api-sample) for API design inspiration.  It seemed cleaner to build this app from scratch using parts from that template rather than fork the original and rip out large chunks of code, especially given differences in tooling and feature requirements, and syntax preferences.