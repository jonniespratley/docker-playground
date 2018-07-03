FROM nginx

RUN ls -la /etc/nginx
RUN ls -la /etc/nginx/conf.d
#RUN ls -la /etc/nginx/sites-enabled
RUN rm /etc/nginx/conf.d/default.conf
#RUN rm /etc/nginx/conf.d/examplessl.conf
#RUN rm /etc/nginx/sites-enabled/default


#COPY static-html-directory /usr/share/nginx/html


COPY nginx /etc/nginx

COPY www /usr/share/nginx/html


#COPY conf /etc/nginx/conf.d


#VOLUME /usr/share/nginx/html
#VOLUME /etc/nginx

EXPOSE 80

CMD [ "nginx-debug", "-g", "daemon off;"]
