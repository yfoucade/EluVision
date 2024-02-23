FROM node:21

RUN apt update
RUN apt upgrade -y

COPY . /src

WORKDIR /src/eluvision-app

RUN npm run build
CMD npm run preview
