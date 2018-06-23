FROM node:latest


WORKDIR                   /usr/src/app

COPY                      ./      ./

#RUN apt-get update && apt-get install -y redis-server

RUN npm -v
RUN node -v
RUN npm install --production
EXPOSE 3000

CMD [ "npm", "start" ]