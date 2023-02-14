# Counters - Different counters in different places

A simple counter app utilizing different storage types to keep track of the current count.

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
### App running locally
#### Development Mode
- Frontend via npm start (development): localhost:3001
- Backend via npm run dev (development): localhost:3000
- api requests from frontend to backend proxy to localhost:3000 (see package.json)
#### Production Mode (local)
- Frontend build via npm run build (production)
- Frontend served thru backend (express.static)
- Backend via npm run prod: localhost:5000
### App running in containers
#### Development Mode
- Frontend via npm start (development): localhost:3001
- Backend via npm run dev (development): localhost:3000
- api requests from frontend to backend proxy to backend container at backend:3000 (see package.json)
#### Production Mode
- Frontend build via npm run build within container, source files being deleted, only leaving build folder
- Backend via npm run prod: localhost:8080 (as this is the internal port at fly.io, see fly.toml)

### Running remote via CI/CD pipeline
- set NODE_ENV to 'production' via pipeline variable
- set PORT_PROD to '5000' or whatever via pipeline variable
- use 'pm2 startOrReload' to run app

### Agent configuration (AZURE DevOps)
- VM made available to pipeline via azure-pipelines-agent (https://github.com/microsoft/azure-pipelines-agent/releases)
- pm2 configured for auto restart after boot (see 'pm2 startup')

### CI/CD Setups
#### Individual pipelines (AZURE DevOps)
- build-pipeline.yml -> install, build, lint, test, zip artifacts (drop)
- release-pipeline.yml -> download artifacts, run app
#### Deploy to fly.io (Github Actions)
- one release pipeline will test, deploy and tag releases
- main branch is protected, use PR to update release
- supported hashes in commit messages: #patch (default), #minor, #major, #skip

## Environment variables
To be set in dotenv-file ./counters-backend/.env

Production environment
PORT_PROD=...
REDIS_URL_PROD=...
MONGO_URL_PROD=...

Development environment
PORT_DEV=...
REDIS_URL_DEV=...
MONGO_URL_DEV=...