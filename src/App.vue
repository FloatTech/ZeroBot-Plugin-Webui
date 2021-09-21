<template>
  <el-container :style="container_style">
    <el-aside :style="aside_width">
      <div
        style="height: 6%"
        class="label_style bor"
      >
        {{label}}
      </div>
      <el-menu
          router="router"
        class="el-menu-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="msg">
          消息处理
        </el-menu-item>
        <el-menu-item index="requests">
          请求事件
        </el-menu-item>
        <el-menu-item index="meta">
          元事件
        </el-menu-item>

      </el-menu>

    </el-aside>
    <el-container style="padding: 0">
      <el-header :style="header_height">
        <el-menu
            router="router"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="plugin">
            插件管理
          </el-menu-item>
          <el-menu-item index="log">
            日志中心
          </el-menu-item>
          <el-menu-item index="config">
            配置管理
          </el-menu-item>
          <el-menu-item index="suggest">
            <el-link type="info" v-bind:href="link">意见反馈</el-link>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer class="bor">
        <foot />
      </el-footer>
    </el-container>
  </el-container>
</template>



<script>

import Foot from "@/views/foot";
import axios from "axios";
import Api from "@/http/api";

  export default {

    components: {Foot},
    data(){
        return {
          label:"leafBot",
          container_style :{
            margin: "0 auto",
            height : "100%",
          },
          header_height:{
            padding: 0,
            backgroundColor: "#545c64",
            height: "6%"
          },
          aside_width:{
            backgroundColor: "#545c64",
            padding: 0,
            width: "12%"
          },
          link:""

        }
      },
      computed : {

      },
    created() {
        window.msgs = []
      axios.get(Api.baseAPi+Api.GetLabel.index).then((resp)=>{
        this.label = resp.data
        if (resp.data === "ZeroBot-Plugin"){
          this.link = "https://github.com/FloatTech/ZeroBot-Plugin/issues"
        }else {
          this.link = "https://github.com/huoxue1/leafBot/issues"
        }
      }).catch((err)=>{

        console.log("获取标签失败"+err)
      })

    }
  }

</script>


<style lang="scss">


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0 auto;

}

html,
body {
  margin: 0 auto;
  padding: 0;
  height: 100%;
}

.label_style {
  font-size: large;
  font-family: "Microsoft YaHei UI Light",serif;
  font-weight: bold;
  color: #42b983;
}

#content{

  width: 100%;
  height: 100%;
}

.bor{
  border: #42b983 1px solid;
}




</style>
