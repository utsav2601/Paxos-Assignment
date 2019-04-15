FROM node:latest
MAINTAINER Utsav Popli (utsav_popli@hotmail.com)
WORKDIR /assignment
COPY package*.json .
COPY server*.js .
RUN npm install
CMD node server.js
