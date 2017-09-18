FROM node:8.5-alpine

COPY . /personality-test
COPY server.cfg.json.docker /personality-test/server.cfg.json

RUN cd /personality-test && npm install && npm build

WORKDIR /personality-test

CMD ["node", "server.js"]
