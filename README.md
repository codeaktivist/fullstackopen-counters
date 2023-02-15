# Counters - Different counters in different places

A simple counter app utilizing different storage types to keep track of the current count.

[![Deploy to fly.io](https://github.com/codeaktivist/fullstackopen-counters/actions/workflows/fly_deploy.yml/badge.svg)](https://github.com/codeaktivist/fullstackopen-counters/actions/workflows/fly_deploy.yml)

## Content
Following counters are included:
- Frontend (react)
- Backend (nodeJS)
- Cookie
- Redis
- MongoDB

## Scope
This app will be uses to
- setup differed CI/CD scenarios
- utilize containers for development and production

## Networking configuration
### Database connections
#### Development Mode
- redis is hosted via redis cloud
- mongodb is hosted via atlas (cloud)
#### Production Mode
- redis is running in a container named 'redis' on port 6379
- mongo is running in a container names 'mongo' on port 27017

## App running locally
### Development Mode
- Frontend via npm start (development): localhost:3001
- Backend via npm run dev (development): localhost:3000
- api requests from frontend to backend proxy to localhost:3000 (see package.json)
### Production Mode (local)
- Frontend build via npm run build (production)
- Frontend served thru backend (express.static)
- Backend via npm run prod: localhost:5000

## App running in containers
### Development Mode
- Frontend via npm start (development): localhost:3001
- Backend via npm run dev (development): localhost:3000
- api requests from frontend to backend proxy to backend container at backend:3000 (see package.json)
### Production Mode
- Frontend build via npm run build within container, source files being deleted, only leaving build folder
- Backend via npm run prod: localhost:8080 (as this is the internal port at fly.io, see fly.toml)

## Running remote via CI/CD pipeline
- set NODE_ENV to 'production' via pipeline variable
- set PORT_PROD to '5000' or whatever via pipeline variable
- use 'pm2 startOrReload' to run app
### Agent configuration (AZURE DevOps)
- VM made available to pipeline via azure-pipelines-agent (https://github.com/microsoft/azure-pipelines-agent/releases)
- pm2 configured for auto restart after boot (see 'pm2 startup')

## CI/CD Setups
### Individual pipelines (AZURE DevOps)
- build-pipeline.yml -> install, build, lint, test, zip artifacts (drop)
- release-pipeline.yml -> download artifacts, run app
- Azure DevOps version is in a different repository!
### Deploy to fly.io (Github Actions)
- one release pipeline will test, deploy and tag releases
- main branch is protected, use PR to update release
- supported hashes in commit messages: #none, #patch (default), #minor, #major, #skip

## Container setup
### Production container
This Compose will start the app in production environemnt:
```docker-compose.yml```
- Frontend is served via backend, both on port 8080
- MongoDB is using live data from Atlas (Cloud)
- Redis is using live data from Redis Cloud
### Development containers
This Compose file will run the app in develompent environemnt: ```dev.docker-compose.yml```
- Frontend is served on port 3001, auto-reload via create-react-app
- Backend is served on port 3000, might also serve an existing frontend build, auto-reload via nodemon
- MongoDB is using a docker container
- Redis is using a docker container

## Environment variables
To be set in dotenv-file ./counters-backend/.env
```javascript
# Production environment
PORT_PROD=...
REDIS_URL_PROD=...
MONGO_URL_PROD=...

# Development environment
PORT_DEV=...
REDIS_URL_DEV=...
MONGO_URL_DEV=...
```
Environemnt variables from here will only be used when running the app locally. In production they need to be set via pipeline variables or doclker-compose environment. In containers they need to be set via docker-compose environment 

## ToDo / issues
1. In container dev mode, mongo takes too long to initialize. The backend container _depends on_ the mongo container but times out when connecting. -> Implement a health check for containers redis and mongo, so that the backend waits for it being healthy - meaning operational.
2. To visualize what build is currently live, I passed the commit SHA down the pipeline to the build. The SHA is piped to the file _release.js_ and exported as variable ... is there a better way? ENV to ARG? A fly.io interface?