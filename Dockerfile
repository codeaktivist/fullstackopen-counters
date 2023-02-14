# This Dockerfile will run the app in production environemnt:
# - Frontend is served via backend
# - MongoDB is using live data from Atlas (Cloud)
# - Redis is using live data from Redis Cloud

FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node counters-backend/package*.json .

RUN npm ci

COPY --chown=node:node counters-backend/ .

COPY --chown=node:node counters-frontend/ frontend-temp

RUN cd frontend-temp && npm ci && npm run build && mv build ../build && cd .. && rm -rf frontend-temp

ENV PORT_PROD=8080

# USER node // Resulted in 'permission denied' when run on local machine!

CMD [ "npm", "run", "prod" ]