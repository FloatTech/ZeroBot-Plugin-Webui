<template>
<div>
  <el-button style="width: 100%;background-color: darkgray" @click="fresh_status">刷&nbsp;&nbsp;新</el-button>
  <el-table :data="plugins" style="width: 100%">
<!--    <el-table-column label="插件id" prop="id"> </el-table-column>-->
    <el-table-column label="插件名" prop="name"> </el-table-column>
    <el-table-column label="群列表">
      <template #default="scope">
        <el-select v-model="scope.row.group_id" @change="group_selected_changed()" filterable >
          <el-option  v-for="item in scope.row.groups" :value="item.group_id" :label="item.group_name" :key="item">
            <span style="float: left">{{ item.group_name }}</span>
            <span
                style="float: right; color: var(--el-text-color-secondary); font-size: 13px"
            >{{ item.group_id }}</span
            >
          </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="是否启用">
      <template #default="scope">
        <el-switch v-model="scope.row.enable" @change="plugin_status(scope.row.name,scope.row.enable,scope.row.group_id)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
      plugins:[],
      groups:[],
      group_id:0
    }
  },
  setup() {

  },
  created() {
    axios.post(Api.baseAPi+Api.GetHandles.index).then((resp)=>{
      this.plugins = resp.data
    }).catch((err)=>{
      console.log(err)
    })
    axios.post(Api.baseAPi + Api.GetBots.index).then((resp) => {
      if (resp.data.length > 0) {
        axios.post(Api.baseAPi+Api.GroupList.index,{self_id:resp.data[0]},{}).then((resp)=>{
          for (let plugin of this.plugins) {
            plugin.groups = resp.data
            plugin.group_id = resp.data[0].group_id
          }
          axios.post(Api.baseAPi+Api.GetPluginsStatus.index,{"group_id":resp.data[0].group_id}).then((resp)=>{
            console.log(resp.data)
            for (let datum of resp.data) {
              for (let plugin of this.plugins) {
                if (plugin.name===datum.name){
                  plugin.enable = datum.enable
                }
              }
            }
          })
        })
      }
    })


  },
  methods:{
    group_selected_changed:function () {

    },
    fresh_status:function (){
      axios.post(Api.baseAPi+Api.GetHandles.index).then((resp)=>{
        this.plugins = resp.data
      }).catch((err)=>{
        console.log(err)
      })
      axios.post(Api.baseAPi + Api.GetBots.index).then((resp) => {
        if (resp.data.length > 0) {
          axios.post(Api.baseAPi+Api.GroupList.index,{self_id:resp.data[0]},{}).then((resp)=>{
            for (let plugin of this.plugins) {
              plugin.groups = resp.data
              plugin.group_id = resp.data[0].group_id
            }
            axios.post(Api.baseAPi+Api.GetPluginsStatus.index,{"group_id":resp.data[0].group_id}).then((resp)=>{
              console.log(resp.data)
              for (let datum of resp.data) {
                for (let plugin of this.plugins) {
                  if (plugin.name===datum.name){
                    plugin.enable = datum.enable
                  }
                }
              }
            })
          })
        }
      })
    },
    plugin_status:function (name,status,group_id) {
      console.log(name+"  "+status+"  "+group_id)
      axios.post(Api.baseAPi+Api.UpdatePluginStatus.index,{"name":name,"group_id":group_id,"enable":status}).then((resp)=>{
        console.log(resp.data)

      })
    }
  }
}
</script>

<style scoped>

</style>