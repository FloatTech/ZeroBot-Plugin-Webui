<template>
<div>
  <el-table  :data="logs" style="width: 100%">
    <el-table-column label="时间" prop="time"> </el-table-column>
    <el-table-column
        :filter-method="filter_handle"
        :filters="[{text:'Panic',value:'panic'}, {text:'Fatal',value:'fatal'},{text:'Error',value:'error'},{text:'Warn',value:'warn'},{text:'Info',value:'info'},{text:'Debug',value:'debug'},{text:'Trace',value:'trace'},]" label='日志等级' prop='level'> </el-table-column>
    <el-table-column label="内容" prop="msg"> </el-table-column>
  </el-table>
</div>
</template>

<script>
import Websocket from "@/http/websocket1";
import Api from "@/http/api";

export default {
  name: "show_log",
  data(){
    return{
      filters:{},
      logs:[],
      ws:{}
    }
  },
  created() {
    this.logs = window.logs
    let ws = new Websocket(Api.wsUrl+"/get_log");
    this.ws = ws
    ws.onOpen(function (event) {
      console.log(event);
      console.log("log连接已打开")
    })
    ws.onMessage((event)=>{
      let msg = event.data.substr(event.data.indexOf("msg=")+5)
      let results = event.data.split(" ", 2)
      let level = results[1].split("=")[1]
      let myDate = new Date();
      this.logs.unshift({"time":myDate.toLocaleString(),"level":level,"msg":msg})
    })
    ws.onClose(()=>{
      console.log("ws连接已关闭")
    })
    ws.onError((event)=>{
      console.log("ws出现错误"+event)
    })
  },
  methods:{
    filter_handle:function (value,row,column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style scoped>

</style>