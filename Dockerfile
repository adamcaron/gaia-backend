FROM node:boron

WORKDIR /api

# install deps
COPY package.json .
RUN npm install

# copy source files
COPY . .

ENTRYPOINT [ "node" ]
CMD [ "bin/runServer.js" ]