<template>
  <div>
    <el-table :data="requests" style="width: 100%">
      <el-table-column label="事件类型"
                       :filter-method="filter_handle"
                       :filters="[{text:'好友添加',value:'好友添加'}, {text:'加群请求',value:'加群请求'},{text:'群邀请',value:'群邀请'}]"
                       prop="type"> </el-table-column>
      <el-table-column label="群号" prop="group_id"></el-table-column>
      <el-table-column label="qq号" prop="user_id"></el-table-column>
      <el-table-column label="验证消息" prop="comment"></el-table-column>
      <el-table-column label="相关操作">
        <template #default="scope">
          <el-button type="success" @click="handle(true,scope.row.flag)">同意</el-button>
          <el-button type="danger" @click="handle(false,scope.row.flag)">拒绝</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import api from "@/http/api";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "requests",
  data(){
    return{
      requests:[
        {
          name:"邀请入群",
          group_id: 3343780376,
          user_id: 3343780376,
        }
      ],
      h :{}
    }
  },
  created() {
    axios.post(api.baseAPi+api.GetRequests.index).then((resp)=>{
      this.requests = resp.data
    }).catch((err)=>{
      console.log(err)
      console.log("请求事件获取失败")
    })

    this.h = setInterval(()=>{
      axios.post(api.baseAPi+api.GetRequests.index).then((resp)=>{
        this.requests = resp.data
      }).catch((err)=>{
        console.log(err)
        console.log("请求事件获取失败")
      })
    },5000)

  },
  beforeDestroy() {
    clearInterval(this.h)
  },
  methods:{
    filter_handle:function (value,row,column) {
      const property = column['property']
      return row[property] === value
    },
    handle :function (approve,flag) {

      if (!approve){
        ElMessageBox.prompt("请输入拒绝理由","提示",{confirmButtonText:"确认",cancelButtonText:"取消"}).then((value => {
          axios.post(api.baseAPi+api.HandleRequest.index,{"flag":flag,approve:approve,"reason":value}).then(()=>{
            ElMessage({message:"操作成功",type:"success"})
          }).catch(()=>{
            ElMessage({type:"error",message:"操作失败"})
          })
        }))
      }else {
        axios.post(api.baseAPi+api.HandleRequest.index,{"flag":flag,approve:approve,"reason":""}).then(()=>{
          ElMessage({message:"操作成功",type:"success"})
        }).catch(()=>{
          ElMessage({type:"error",message:"操作失败"})
        })
      }

    },

  }
}
</script>

<style scoped>

</style>