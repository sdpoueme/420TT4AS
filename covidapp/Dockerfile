FROM bitnami/nginx

# Installation de npm vu que ce n'est pas  une image node. Voir la documentation sur https://hub.docker.com/r/bitnami/nginx et la section Customize this image
# on bascule vers le user root pour avoir les permissions, ceci est expliqué dans la documentation de l'image
USER 0
### Installation de 'npm' afin de pouvoir utiliser npm install
### l'installation des packages est expliqué sur https://hub.docker.com/r/bitnami/nginx 
RUN install_packages npm

# copier le code de l'application dans le conteneur
WORKDIR /tmp
RUN mkdir covid-app 
RUN mkdir covid-app/src
RUN mkdir covid-app/public

COPY ./src ./covid-app/src
COPY ./public/ ./covid-app/public
COPY package.json ./covid-app/package.json


# change de repertoire de travail
WORKDIR /tmp/covid-app

# je compile mon application react
RUN npm install
RUN npm run build

# je copie le build au bon endroit
COPY build/ /app/

#changement du port pour 8080
#option 1: modifier la configuration de NGINX pour pouvoir utiliser 8080
#COPY my_server_block.conf /opt/bitnami/nginx/conf/server_blocks/my_server_block.conf

#option 2: une autre facon de modifier la configuration est d'utiliser cette commande
ENV NGINX_HTTP_PORT_NUMBER=8080

EXPOSE 8080
