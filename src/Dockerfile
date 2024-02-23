FROM node:21

RUN apt update
RUN apt upgrade -y
RUN apt install -y nginx

COPY ./eluvision-app/ /src/
COPY eluvision.nginx.conf /etc/gninx/sites-enabled/

WORKDIR /src/eluvision-app

RUN npm install vite
RUN npm run build

CMD nginx -s reload
