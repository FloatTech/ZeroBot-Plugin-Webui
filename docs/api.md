### /get_bots

> 获取bot列表

method: `POST`

参数:

| 参数名 | 类型 | 说明 |
| ------ | ---- | ---- |
| 无     |      |      |

**响应数据**

响应内容为bot的qq

```json
[12345678,12345678]
```

### /get_friend_list

> 获取好友列表

method: `POST`


参数:

| 参数名 | 类型 | 说明 |
| ------ | ---- | ---- |
| self_id  |  int64    |   bot账号   |

返回：同gocq的[get_friend_list](https://docs.go-cqhttp.org/api/#%E8%8E%B7%E5%8F%96%E5%A5%BD%E5%8F%8B%E5%88%97%E8%A1%A8)

**响应数据**

响应内容为 json 数组, 每个元素如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `user_id` | int64 | QQ 号 |
| `nickname` | string | 昵称 |
| `remark` | string | 备注名 |

### /get_group_list

> 获取好友列表

method: `POST`


参数:

| 参数名 | 类型 | 说明 |
| ------ | ---- | ---- |
| self_id  |  int64    |   bot账号   |

返回：同gocq的[get_group_list](https://docs.go-cqhttp.org/api/#%E8%8E%B7%E5%8F%96%E7%BE%A4%E5%88%97%E8%A1%A8)

**响应数据**

响应内容为 json 数组, 每个元素如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `group_id` | int64 | 群号 |
| `group_name` | string | 群名称 |
| `group_memo` | string | 群备注 |
| `group_create_time` | uint32 | 群创建时间 |
| `group_level` | uint32 | 群等级 |
| `member_count` | int32 | 成员数 |
| `max_member_count` | int32 | 最大成员数（群容量） |


### /data

> 获取好友列表

method: `ws`


参数:

无

该api为ws链接，应该在收到信息后不断向前端推送mmessge的[event]()

**响应数据**


| 字段名 | 数据类型 | 可能的值 | 说明 |
| ----- | ------- | ------- | ---- |
| `time` | int64 | - | 事件发生的时间戳 |
| `self_id` | int64 | - | 收到事件的机器人 QQ 号 |
| `post_type` | string | `message` | 上报类型 |
| `message_type` | string | `private` | 消息类型 |
| `sub_type` | string | `friend`、`group`、`group_self`、`other` | 消息子类型, 如果是好友则是 `friend`, 如果是群临时会话则是 `group`, 如果是在群中自身发送则是 `group_self` |
| `temp_source` | int | - | 临时会话来源 |
| `message_id` | int32 | - | 消息 ID |
| `user_id` | int64 | - | 发送者 QQ 号 |
| `message` | message | - | 消息内容 |
| `raw_message` | string | - | 原始消息内容 |
| `font` | int32 | - | 字体 |
| `sender` | object | - | 发送人信息 |

其中 `sender` 字段的内容如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `user_id` | int64 | 发送者 QQ 号 |
| `nickname` | string | 昵称 |
| `sex` | string | 性别, `male` 或 `female` 或 `unknown` |
| `age` | int32 | 年龄 |



### /get_plugins

> 获取插件列表

method: `POST`

参数:

无

**响应数据**

响应内容为 json 数组, 每个元素如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `id` | 任意类型，插件唯一标识 | 唯一标识 |
| `name` | string | 插件名 |


### /get_label

> 获取页面标签

method: `GET`

参数:

无

**响应数据**

响应内容为字符串, 为主页上显示的标签

### /send_msg

> 发送信息

method: `POST`

参数:

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `self_id` | int64 |bot QQ 号 |
| `message_type` | string | 消息类型（private,group） |
| `id` | int64 | qq账号或者群号 |
| `message` | string| 发送信息内容，支持cq码 |

**响应数据**

响应内容为 json 数组, 每个元素如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `message_id` | int64 | 消息id |

### /update_plugin_status

> 改变插件状态

method: `POST`

参数:

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `name` | 任意类型，插件唯一标识 |插件唯一标识 |
| `group_id` | int64 | 插件状态改变的id |
| `enable` | bool | 插件状态改变之后的状态|

**响应数据**

无

### /get_plugin_status

> 获取某个插件状态

method: `POST`

参数:

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `name` | 任意类型 |插件唯一标识 |
| `group` | int64 | 获取插件状态的群 |

**响应数据**

响应内容为 json 数组, 每个元素如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| `status` | bool | 插件状态 |

### /get_plugins_status

> 获取某个插件状态

method: `POST`

参数:

| 字段名 | 数据类型 | 说明 |
| ----- | ------ | ---- |
| `group` | int64 | 获取插件状态的群 |

**响应数据**

响应内容为 json 数组, 每个元素如下：

| 字段名 | 数据类型 | 说明 |
| ----- | ------- | --- |
| name | 任意类型 | 插件唯一标识 |
| `status` | bool | 插件状态 |






