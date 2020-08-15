FROM node:13

RUN mkdir -p /home/container
WORKDIR /home/container

COPY . /home/container
RUN npm i
RUN npm run build

CMD ["node", "build/app.js"]