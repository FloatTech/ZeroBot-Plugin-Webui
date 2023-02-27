<template>
  <div>
    <Divider>日志</Divider>
    <Table :columns="columns" :data-source="logTableData" :class="`${prefixCls}__table`">
      <template #msg="{ text }">
        <span :class="`${prefixCls}__msg`">{{ text }}</span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Table, Divider } from 'ant-design-vue';
  import { onUnmounted } from 'vue';
  import Websocket from '/@/utils/socket/websocket';
  import { default as AnsiUp } from 'ansi_up';
  import { Api, wsUrl } from '/@/api/bot/bot';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { removeHtmlTab, escape2Html } from '/@/utils/html';
  const { prefixCls } = useDesign('logWebsocket');
  type LogTableData = {
    msg: string;
  };
  const logTableData = ref<LogTableData[]>([]);
  const columns = [
    {
      title: '内容',
      dataIndex: 'msg',
      key: 'msg',
      slots: { customRender: 'msg' },
    },
  ];
  const ws = new Websocket(wsUrl + Api.getLog);
  const ansi_up = new AnsiUp();
  ws.onOpen((event) => {
    console.log(event);
    console.log('log ws连接已打开');
  });
  ws.onMessage((event) => {
    let msg = ansi_up.ansi_to_html(event.data);
    logTableData.value.unshift({
      msg: escape2Html(removeHtmlTab(msg)),
    });
    if (logTableData.value.length > 1000) {
      logTableData.value.shift();
    }
  });

  ws.onClose(() => {
    console.log('ws连接已关闭');
  });
  ws.onError((event) => {
    console.log('ws出现错误' + event);
  });
  onUnmounted(() => {
    ws.socket.close();
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-logWebsocket';
  .@{prefix-cls} {
    &__msg > span {
      font-size: 20px;
    }
  }
</style>
