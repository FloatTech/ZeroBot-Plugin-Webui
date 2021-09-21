export default {
    baseAPi : "http://127.0.0.1:3000",
    wsUrl: "ws://127.0.0.1:3000",
    // 首页
    Config: {
        index: '/get_config'
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
    GetHandles:{
        index:"/get_plugins"
    }
}
