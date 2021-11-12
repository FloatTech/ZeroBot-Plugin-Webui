export default {
    baseAPi : "http://127.0.0.1:3000",
    wsUrl: "ws://127.0.0.1:3000",
    // 获取qq数组
    GetBots: {
        index: '/get_bots'
    },

    // 好友列表
    FriendList: {
        index: "/get_friend_list"
    },

    // 群列表
    GroupList: {
        index: "/get_group_list"
    },
    // 获取消息
    MsgData:{
        index: "/data"
    },
    AllConfig:{
        index: "/get_all_config"
    },
    // 获取插件列表
    GetHandles:{
        index:"/get_plugins"
    },
    GetLabel:{
        index:"/get_label"
    },
    // 发送信息
    SendMsg:{
        index:"/send_msg"
    },
    // 改变插件状态
    UpdatePluginStatus:{
        index:"/update_plugin_status"
    },
    // 获取所有插件状态
    GetPluginsStatus:{
        index:"/get_plugins_status"
    },
    // 获取某个插件状态
    GetPluginStatus:{
        index:"/get_plugin_status"
    },
    // 获取请求列表
    GetRequests:{
        index:"/get_requests"
    },
    // 处理请求
    HandleRequest:{
        index: "/handle_request"
    }

}
