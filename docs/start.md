#  上手yogurt

## 1. 后端部署

在后端部署中，需要部署postgres数据库，redis缓存等服务，当这些服务启动后再部署主体镜像。

同时需要保证几个镜像处于一个容器网络中，实现通过容器名进行访问。

```yaml
version: "3"

services:
  redis:
    image: redis
    container_name: "cache"
    ports:
      - "6379:6379"
    volumes:
      - "./data:/data"
    networks:
      - hust-mirror
    environment:
      TZ: Asia/Shanghai
  db:
    image: postgres:12-alpine
    container_name: "db"
    restart: on-failure
    environment:
      POSTGRES_USER: hlug
      POSTGRES_PASSWORD: hlug
      TZ: Asia/Shanghai
    ports:
      - "5432:5432"
    volumes:
      - "./data/db:/var/lib/postgresql/data"
      - "./scripts/init.sql:/docker-entrypoint-initdb.d/create_tables.sql"
    networks:
      - hust-mirror

  mirror:
    image: walawalawala/hust-mirror:latest
    container_name: mirror
    restart: on-failure
    ports:
      - "8080:8080"
    networks:
      - hust-mirror
    volumes:
      - "./source:/source"
    depends_on:
      - db
      - redis
    environment:
      TZ: Asia/Shanghai

networks:
  hust-mirror:

```

## 2. 前端部署

如果您使用我们提供的前端，推荐将前端和后端置于一个容器网络中

::: info
如何您想要设计自己的前端，可以参考我们后端提供的[api文档](https://www.apifox.cn/apidoc/shared-39911975-6b06-4d83-98af-8147d3de1f53)
:::
```yaml
version: "3"

services:
  frontend:
    restart: always
    image: hust-sync-frontend:latest
    container_name: hust-sync-frontend
    ports:
      - "30080:80"
      - "30443:443"
    volumes:
      - ./caddy/ssl:/ssl
      #- ./caddy/dist:/dist
      - ./log/frontend:/log
      - ../source:/mirror
      - ./caddy/Caddyfile:/etc/caddy/Caddyfile
    environment:
      DOC_URL: https://doc.hlug.cn/
    networks:
      - hust-mirror
```


## 3. 配置rysncd服务

```yaml
version: "3"

services:
  rsyncd:
    restart: always
    image: toendeavour/rsyncd-alpine
    container_name: rsyncd
    ports:
      - "873:873"
    volumes:
      - ./rsyncd:/config
      - ./log/rsyncd:/log
      - ../source:/data/mirror
```

## 4. 文档部署

在管理员插入镜像信息的时候，插入的`user_url`即为传递给用户的文档链接，用户可以接入自己的文档系统也可以选择我们基于gastby的文档系统

```