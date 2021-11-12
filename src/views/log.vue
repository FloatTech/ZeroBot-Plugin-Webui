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
    if (window.logs !== undefined){
      this.logs = window.logs
    }

    let ws = new Websocket(Api.wsUrl+"/get_log");
    ws.onOpen(function (event) {
      console.log(event);
      console.log("log连接已打开")
    })
    ws.onMessage((event)=>{

      let results = event.data.split(" ", -1)
      console.log(results)
      let level = results[0].replace("[","").replace("]","")
      let myDate = new Date();
      this.logs.unshift({"time":myDate.toLocaleString(),"level":level,"msg":event.data.replace(results[0],"")})
      if (this.logs >2000){
        this.logs.shift()
      }
    })
    ws.onClose(()=>{
      console.log("ws连接已关闭")
    })
    ws.onError((event)=>{
      console.log("ws出现错误"+event)
    })

  },
  beforeDestroy() {
    window.logs = this.logs
  },
  methods:{
    filter_handle:function (value,row,column) {
      const property = column['property']
      return row[property] === value
    }
  },

}
</script>

<style scoped>

</style>