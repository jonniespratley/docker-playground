FROM node

RUN mkdir /src

ENV PORT  3000
ENV NODE_ENV  production

#RUN npm install nodemon -g

WORKDIR /src

ADD . ./
RUN yarn

EXPOSE 3000