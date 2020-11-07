# Good Relay

A simple example node backend that demonstrates how to hit a 3rd party API without exposing your API key in your frontend code.

_Note_ the goodreads API returns XML which is tricky to work with. To see a more simple verison of this, checkout the `weather-json-example` branch. To use that branch you'll need a free API key from Open Weather Map. There is no front-end for it, so you need to interact with it via curl or Postman. The api url is `localhost:3000/onecall?lat={some latitidue}&lon={some longtitude}`.

## Usage

### Prerequisites

You need nodejs installed: https://nodejs.org/en/download/

### Initialise the App

To get started git clone this repo (choose one depending on whether you prefer https or ssh - pick the first one if you're not sure):

`git clone https://github.com/JacksonBates/example-goodreads-api-relay.git`

or

`git clone git@github.com:JacksonBates/example-goodreads-api-relay.git`

Then cd into the new directory:

`cd example-goodreads-api-relay`

Now install dependancies:

`npm i`

You need to create your own `.env` file for your key:

`cp .env.example .env`

Get your goodreads api keys from [Goodreads api](https://www.goodreads.com/api/keys)
Then open the new `.env` file and paste your keys in the correct spot.

Example:

```
GOODREADS_API_KEY=AABBCCDDEEFF00112233445566778899
```

Now run the server:

`node app.js`

In the browser, navigate to localhost:3000 to confirm the server is running. You should see a simple `Hello World!`

## What next?

Now read the `app.js` file thoroughly.

I've commented the code heavily to help you understand what is going on if you haven't seen node / express much before.

## Test the API relay

Use [Postman](https://www.getpostman.com/) to test the API.

Set Postman to send a Get request and paste this in the url: `localhost:3000/api/search?q=enders game`

Postman will show you the JSON response below.

## How do you use this in your front end?

This simple app is listening for get requests at `/api/search`, so interact with it in your front end app the way you have been previously with the original api.

This is only configured to handle search queries - if you want to use other Goodreads API endpoints / methods, you'll need to think about how you implement them yourself!

## Goodreads search

See more options for searching at [Goodreads docs](https://www.goodreads.com/api/index#search.books)

## Hosting

You can't deploy your frontend and still have this on localhost - obviously you need to deploy this, too.

I recommend [Heroku](https://devcenter.heroku.com/articles/deploying-nodejs).
