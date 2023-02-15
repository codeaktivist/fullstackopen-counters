# This Dockerfile will run the app in production environemnt

FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node counters-backend/package*.json .

RUN npm ci --only=production

COPY --chown=node:node counters-backend/ .

COPY --chown=node:node counters-frontend/ frontend-temp

RUN cd frontend-temp && npm ci --only=production && npm run build && mv build ../build && cd .. && rm -rf frontend-temp

USER node

CMD [ "npm", "run", "prod" ]