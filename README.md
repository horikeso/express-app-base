## 必要

```
npm install pm2 -g
npm install express-generator -g
npm install mocha -g
```

## インストール

* all

```
npm install --no-bin-links
```

* production

```
npm install --no-bin-links --only=prod
```

## Nginx用の設定

/etc/nginx/nginx.conf

```
events {
    # nginx: [emerg] no "events" section in configuration
}


http {

#--------------------------------------------

    upstream express {
        server 127.0.0.1:3000;
        keepalive 64;
    }

    server {
        listen       80;
        server_name  localhost;
        root /home/public/app;

        # 413 Request Entity Too Large
        client_max_body_size 20M;

#--------------------------------------------

        location / {
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_max_temp_file_size 0;
            proxy_redirect off;
            proxy_read_timeout 240s;
            proxy_pass http://express/;
        }

#--------------------------------------------

    }

}
```

```
nginx -s reload
```

## テスト

```
npm test
```

## アプリケーション起動

* development

```
pm2 start processes.json --only dev
```

* production

```
pm2 start processes.json --only prod
```

### pm2コマンドとかlogとか

```
pm2 list

pm2 show dev

pm2 reload dev

pm2 stop dev

pm2 delete dev

pm2 logs dev
（/root/.pm2/logs/）

pm2 monit
```

* Global Logs

```
/root/.pm2/pm2.log
```
