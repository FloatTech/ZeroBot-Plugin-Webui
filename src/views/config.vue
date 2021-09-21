<template>
<div>
  config
</div>
</template>

<script>
import axios from "axios";
import Api from "../http/api";

export default {

  name: "config",
  data(){
    return {
      data:{}
    }
  },
  created() {
    axios.post(Api.baseAPi+Api.AllConfig.index).then((resp)=>{
      console.log(resp.data)
      this.data = resp.data
    }).catch((err)=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>