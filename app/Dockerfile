FROM node

RUN mkdir /src

ENV PORT  8080
ENV NODE_ENV  production

#RUN npm install nodemon -g

WORKDIR /src

ADD . ./
RUN yarn

EXPOSE 8080