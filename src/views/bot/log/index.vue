<template>
  <div>
    <MessageSendBox />
    <MessageWebsocket />
    <LogWebsocket />
  </div>
</template>

<script setup lang="ts" name="Log">
  import { MessageSendBox, LogWebsocket, MessageWebsocket } from '/@/components/Bot';
</script>

<style></style>
