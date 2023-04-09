# 详细配置

## 1. 通知配置

当前我们的软件支持向钉钉，飞书，slack三个平台发送通知和预警，只需要配置好机器人的webhook即可。

```yaml
slack:
  webHookURL: "https://hooks.slack.com/services/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"
  Channel: "#bot-mirror-status"
  IconEmoji: ":ghost:"
  Username: "mirror"

feishu:
  webHookURL: "https://open.feishu.cn/open-apis/bot/v2/hook/d2efb069-b5fc-41b8-a29d-c28dfe5a9bc3"

dingding:
  webHookURL: "https://oapi.dingtalk.com/robot/send?access_token=f0e89d4bdb1033873793f7372c5cbde8ad87dbcf8644c91d21dbb582dfbe80ed"
```

## 2. 数据库配置

推荐使用postgresql进行处理，使用其他的数据库可能需要自行添加驱动库编译源码

```yaml
db:
  addr: postgres://hlug:hlug@db:5432/mirror?sslmode=disable
#  addr: postgres://hlug:hlug@127.0.0.1:5432/mirror?sslmode=disable
  driver: postgres
```


## 3. 缓存配置

为了减轻数据库的负担，我们选择使用redis进行缓存，用户需要配置的参数如下

```yaml
# redis缓存配置
redis:
  addr: "redis:6379"
  password: ""
  db: ""
  poolSize: ""
```

## 4. 安全性控制

为了保护管理相关api的安全性，我们选择使用两步安全验证，首先需要帐号密码，随后我们通过限制ip范围的方式限制访问请求。

```yaml
# 账户密码配置
auth:
  secret-key: "opensource"
  username: "admin"
  password: "admin"

# 请求ip范围配置
security:
  type: "ip"
  ipRange: "127.0.0.1/0"
```


