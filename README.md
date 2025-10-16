# Dynamic Profile Server

This is a simple RESTful API endpoint that returns a user basic profile information along with a dynamic cat fact fetched from an external API.


## Setup

- Clone the repo in your environment: `git clone repo-link`
- Navigate to the root folder of the cloned repo: `cd dynamic-profile-server`
- Install the dependencies: `npm install`
- Make a copy of `.env.example` and rename the copy to `.env`, set the port number in the `.env` file
- Run `npm start` to start the server 

The endpoint is accessible at: `GET /me`

A successful response structure looks like this:

```
{
    "status": "success",
    "user": {
        "email": "email",
        "name": "fullname",
        "stack": "stack"
    },
    "timestamp": "current UTC time in ISO format",
    "fact": "cat fact"
}
```


## Dependencies
The dependencies used in this project are: `axios`, `dotenv`, `express`, `express-rate-limit`,`express-slow-down`

### How to install the dependencies
All can be installed at once by running `npm install` in your terminal

You can also install individually:

```
npm install express
npm install axios
npm install dotenv
npm install express-rate-limit
npm install express-slow-down
```


## Deployment
This server application is deployed on Heroku. The endpoint is accessible here: `https://dynamic-profile-server-4bb72905de93.herokuapp.com/me`