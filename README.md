# Shotstack Video Transcription Demo

This demo application uses the Shotstack Ingest API to [transcribe a video to VTT
subtitles](https://shotstack.io/demo/transcribe-video/) format.

The Ingest API is a [video transformation API](https://shotstack.io/product/ingest-api/) that lets you upload, store,
and convert videos and images into different formats, sizes, frame rates, speeds, and more. It also has a feature that
transcribes a video and generates subtitles in SRT and VTT formats.

The demo has a web form that allows users to upload a video or enter a URL of a video online. When the form is
submitted, the video is sent to the Ingest API and a VTT file is generated. The VTT file can be played in the browser or
downloaded. A resized version of the video is also generated to be played back in the browser, just in case the source
file is very large or not supported by the browser.

View the live demo at: https://shotstack.io/demo/transcribe-video/

The demo is made with Node.js and works with the Express Framework or as a serverless project using AWS Lambda and API
Gateway.

### Requirements

- Node 16+
- Shotstack API key: https://dashboard.shotstack.io/keys

### Project Structure

The project is divided in to a two components:

#### Backend API

The backend API has two endpoints, one to receive the video file and another to check the status of the transcription.
The Node.js application prepares the API [JSON request](https://shotstack.io/docs/api/#tocs_source) and POSTs the data
to the Shotstack Ingest API. The status endpoint polls the Ingest API to check the status of the transcription and
returns the URL of the VTT file when ready.

The backend API source code is in the **api** directory.

#### Frontend Web Form & Player

The front end is intentionally kept simple and use Bootstrap and jQuery. A simple form allows the user to upload a video
file or enter a URL. The form is submitted to the backend API and the status is polled until the video transformation
and VTT transcription is ready. The video player will play the video using teh VTT file so that the subtitles are
overlaid on to the video.

The front end API source code is in the **web** directory.

### Installation

Install node module dependencies:

```bash
cd api
npm install
```

### Configuration

Copy the .env.dist file and rename it .env:

```
cp .env.dist .env
```

Replace the environment variables below with your Shotstack API key (stage key) and a writable S3 bucket name:

```bash
SHOTSTACK_API_KEY=replace_with_your_shotstack_key
SHOTSTACK_HOST=https://api.shotstack.io/ingest/stage/
AWS_S3_UPLOADS_BUCKET=replace_with_an_s3_bucket_name
```

### Run Locally

To start the API and serve the front end form (from the **api** directory):

```bash
npm run start
```

Then visit [http://localhost:3000](http://localhost:3000)


### Deploy Serverless Application (optional)

The project has been built as a serverless application using the Serverless Framework and AWS Lambda. To understand more
about the Serverless Framework and how to set everything up consult the documentation:
https://serverless.com/framework/docs/providers/aws/

To deploy to AWS Lambda (from the **api** directory):

```bash
npm run deploy
```

Once the API is deployed set the `var apiEndpoint` variable in **web/app.js** to the returned API Gateway URL.

Run the **web/index.html** file locally or use AWS S3 static hosting to serve the web page.
