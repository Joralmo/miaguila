FROM node:13-alpine

RUN mkdir -p /home/container
WORKDIR /home/container

COPY . /home/container
RUN npm i
RUN npm run build
COPY env /home/container/build

CMD ["node", "build/app.js"]