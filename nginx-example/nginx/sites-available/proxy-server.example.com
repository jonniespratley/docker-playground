proxy_cache_path tmp levels=1:2 keys_zone=my_zone:10m inactive=60m;
proxy_cache_key "$scheme$request_method$host$request_uri";

map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

# List of application servers
upstream app_servers {
    server 127.0.0.1:49161;
    server 127.0.0.1:3030;
}

# Configuration for the server
server {
    listen 80;
    listen 8181 default_server;
    proxy_cache my_zone;
    server_name proxy-server.example;
    index index.html index.htm;
#root                    /usr/share/nginx/html;
#limit_req_zone          $binary_remote_addr zone=one:10m rate=1r/s;
    
    #### Proxying the connections connections
    location / {
        proxy_http_version 1.1;
        proxy_set_header Upgrade             $http_upgrade;
        proxy_set_header Connection          $connection_upgrade;
        proxy_set_header Host                $host;
        proxy_set_header X-Real-IP           $remote_addr;
        proxy_set_header X-Forwarded-For     $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto   $scheme;
        add_header X-Proxy-Cache       $upstream_cache_status;
        add_header X-Cache-Status      $upstream_cache_status;
        proxy_ignore_headers Cache-Control;
        proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
        proxy_cache_methods GET HEAD POST;
        proxy_cache_valid 200 302 10m;
        proxy_cache_min_uses 2;
        proxy_cache_revalidate on;
        proxy_cache_valid any 30m;
        proxy_cache_background_update on;
        proxy_cache_lock on;
        proxy_pass http://$app_servers;
    }
}
