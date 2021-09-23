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