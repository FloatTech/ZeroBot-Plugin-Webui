<template>
  <div style="width: 100%;height: 100%;padding-top: 10px">
    <el-row>
      <el-col :span="5">
        <div>
          <el-select v-model="selfId" placeholder="请选择bot" @change="data_changed">
            <el-option v-for="item in selfIdOptions" :value="item" :key="item" :label="item">

            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div>
          <el-select v-model="msgType" placeholder="请选择消息类型" @change="data_changed">
            <el-option v-for="item in msgTypes" :value="item.value" :key="item.key" :label="item.key">

            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="5">
        <div>
          <el-select v-model="id" placeholder="请选择发送对象" filterable>
            <el-option v-for="item in list" :value="item.id" :key="item.name" :label="item.name">
              <span style="float: left">{{ item.nick_name }}</span>
              <span
                  style="float: right; color: var(--el-text-color-secondary); font-size: 13px"
              >{{ item.id }}</span
              >
            </el-option>
          </el-select>
        </div>

      </el-col>
      <el-col :span="7">
        <div>
          <el-input v-model="msg"/>
        </div>
      </el-col>
      <el-col :span="2">
        <div>
          <el-button @click="send_msg" type="success">发送</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import Api from "../http/api";
import Http from "../http/http";
import axios from "axios";

export default {
  name: "Foot",
  data() {
    return {
      msgTypes: [
        {
          value: "private",
          key: "私聊"
        }, {
          value: "group",
          key: "群聊"
        }
      ],
      list:[],
      selfIdOptions: [],
      selfId: '',
      msgType: "group",
      id:0,
      msg:''
    }
  },
  beforeCreate() {

  },
  created() {
    Http.post(Api.baseAPi + Api.GetBots.index).then((resp) => {
      this.selfIdOptions.push(...resp.data)
      if (resp.data.length>0){
        this.selfId = resp.data[0]

        axios.post(Api.baseAPi+Api.GroupList.index,{self_id:this.selfId},{}).then((resp)=>{
          for (let data of resp.data) {
            console.log(data);
            this.list.push({"id":data.group_id,"name":data.group_name,"nick_name":data.group_name})
          }
          this.id = resp.data[0].group_id
        })
        window.groups = this.list
      }
    }).catch((err)=>{
      console.log("请求api错误"+err)
    })

  },
  methods:{
    data_changed: function () {
      this.list = []
        if (this.selfId === ""){
          return
        }
        if (this.msgType === "group"){
          axios.post(Api.baseAPi+Api.GroupList.index,{self_id:this.selfId},{}).then((resp)=>{
            for (let data of resp.data) {
              console.log(data);
              this.list.push({"id":data.group_id,"name":data.group_name,"nick_name":data.group_name})
            }
            this.id = resp.data[0].group_id
          })
        }else if (this.msgType === "private"){
        Http.post(Api.baseAPi+Api.FriendList.index,{self_id:this.selfId}).then((resp)=>{
          for (let data of resp.data) {
            console.log(data);
            this.list.push({"id":data.user_id,"name":data.nick_name,"nick_name":data.remark})
          }
          this.id = resp.data[0].user_id
        })
      }
    },
    send_msg:function () {
        if (this.id===0 || this.msg === ""){
          return
        }
       let  data = {"self_id":this.selfId,"message_type":this.msgType,"id":this.id,"message":this.msg}
        axios.post(Api.baseAPi+Api.SendMsg.index,data).
        then((resp)=>{
          if (resp.status === 200){
            console.log("发送成功")
          }
        }).catch((err)=>{
          console.log(err)
        })
    }
  }

}
</script>

<style scoped>

</style>