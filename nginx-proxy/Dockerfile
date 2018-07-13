FROM nginx:latest 
 
# Configuration 
COPY default.conf /etc/nginx/conf.d/ 
 
# SSL Certificates and DH Key 
#COPY dockerdemo.crt /etc/ssl/dockerdemo.crt 
COPY private.key /etc/ssl/private.key 
COPY public.pem /etc/ssl/public.pem 
 
# Symlink the logs to stdout and stderr 
RUN ln -sf /dev/stdout /var/log/nginx/access.log 
RUN ln -sf /dev/stderr /var/log/nginx/error.log 
 
# Expose port 443 (HTTPS) 
EXPOSE 80 443 
 
CMD ["nginx", "-g", "daemon off;"] 
