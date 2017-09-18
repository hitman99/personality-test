FROM node:8.5-alpine

COPY . /personality-test

RUN cd /personality-test && cp server.cfg.json.docker server.cfg.json && npm install && npm build

WORKDIR /personality-test

CMD ["node", "server.js"]
