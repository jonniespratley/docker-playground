FROM nginx


ENV SITE_ENABLED proxy-server.example.com

COPY ./nginx /etc/nginx
COPY www /usr/share/nginx/html

RUN ls -la /etc/nginx
RUN ls -la /etc/nginx/conf.d
RUN ls -la /etc/nginx/sites-enabled

RUN rm /etc/nginx/conf.d/default.conf





RUN cd /etc/nginx/sites-enabled && \
  ln -s ../sites-available/${SITE_ENABLED} .



VOLUME /etc/nginx
VOLUME /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx-debug", "-g", "daemon off;"]
