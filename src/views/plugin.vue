<template>
<div>
  <el-table :data="plugins" style="width: 100%">
    <el-table-column label="插件id" prop="ID"> </el-table-column>
    <el-table-column label="插件名" prop="Name"> </el-table-column>
    <el-table-column label="插件类型" prop="HandleType"> </el-table-column>
    <el-table-column label="是否启用">
      <template #default="scope">
        <el-switch disabled v-model="scope.row.Enable" @change="plugin_status(scope.row.Name,scope.row.Enable)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </template>
    </el-table-column>

  </el-table>
</div>
</template>

<script>
import axios from "axios";
import Api from "@/http/api";

export default {
  name: "plugin",
  data(){
    return {
      plugins:[]
    }
  },
  created() {
    axios.post(Api.baseAPi+Api.GetHandles.index).then((resp)=>{
      console.log(resp.data)
      this.plugins = resp.data
    }).catch((err)=>{
      console.log(err)
    })
  },
  methods:{
    plugin_status:function (name,status) {
        console.log(name,status)
    }
  }
}
</script>

<style scoped>

</style>