<template>
<div>
  <el-table :data="messages" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="消息id">
            <span>{{ props.row.message_id }}</span>
          </el-form-item>
          <el-form-item label="群昵称">
            <span>{{ props.row.sender.nick_name }}</span>
          </el-form-item>
          <el-form-item label="消息数组">
            <span>{{JSON.stringify(props.row.message)}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column label="时间" prop="time"> </el-table-column>
    <el-table-column label="消息类型" prop="message_type"> </el-table-column>
    <el-table-column label="群号" prop="group_id"> </el-table-column>
    <el-table-column label="账号" prop="user_id"> </el-table-column>
    <el-table-column label="消息内容" prop="raw_message"> </el-table-column>
  </el-table>
</div>
</template>

<script>

import Websocket from "../http/websocket1";
import Api from "../http/api";


export default {
  name: "msg",

  data(){
    return{
      ws : {},
      messages:[]
    }

  },

  created() {
    this.messages = window.msgs
    let ws = new Websocket(Api.wsUrl+Api.MsgData.index);
    this.ws = ws
    ws.onOpen(function (event) {
      console.log(event);
      console.log("ws连接已打开")
    })
    ws.onMessage((event)=>{
      let myDate = new Date();
      let result = eval('(' + event.data + ')')
      console.log(result)
      result.time = myDate.toLocaleString( )
      console.log(result);
      this.messages.unshift(result)
     // window.msgs.unshift(result)
    })
    ws.onClose(()=>{
      console.log("ws连接已关闭")
    })
    ws.onError((event)=>{
      console.log("ws出现错误"+event)
    })
  }


}
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>