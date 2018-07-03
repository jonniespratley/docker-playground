FROM nginx
#FROM tutum/nginx
#FROM bitnami/nginx:latest


#RUN rm /etc/nginx/sites-enabled/default
RUN ls -la /etc/nginx

COPY static-html-directory /usr/share/nginx/html


#COPY nginx.conf /etc/nginx/nginx.conf
COPY . /etc/nginx
CMD [ "nginx-debug", "-g", "daemon off;"]]

