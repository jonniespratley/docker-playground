FROM node:latest

ENV PORT                    9000
ENV NODE_ENV                production
WORKDIR                   /usr/src/app

COPY                      ./      ./

#RUN apt-get update && apt-get install -y redis-server

RUN npm -v
RUN node -v
RUN yarn --prod

EXPOSE 9000

CMD [ "npm", "start" ]