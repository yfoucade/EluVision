FROM node:21

RUN apt update
RUN apt upgrade -y
RUN apt install -y nginx

COPY ./eluvision-app/ /src/eluvision-app/
COPY ./eluvision.nginx.conf /etc/nginx/sites-enabled/

WORKDIR /src/eluvision-app

RUN npm install vite
RUN npm run build

CMD npm run dev
# CMD nginx -g "daemon off;"
