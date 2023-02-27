<template>
  <div>
    <Divider>消息</Divider>
    <Table :columns="columns" :data-source="msgTableData">
      <template #nickname="{ record }">
        <span>{{ record.nickname + ' (' + record.user_id + ')' }} </span>
      </template>
      <template #group_name="{ record }">
        <span>{{ record.group_name + ' (' + record.group_id + ')' }} </span>
      </template>
      <template #message_type="{ text }">
        <span v-if="text === 'group'"><Tag color="green">群聊</Tag></span>
        <span v-else><Tag color="red">私聊</Tag></span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
  import Websocket from '/@/utils/socket/websocket';
  import { onUnmounted } from 'vue';
  import { Table, Divider, Tag } from 'ant-design-vue';
  import { Api, wsUrl } from '/@/api/bot/bot';
  import { ref } from 'vue';
  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '群名',
      dataIndex: 'group_name',
      key: 'group_name',
      slots: { customRender: 'group_name' },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      slots: { customRender: 'nickname' },
    },
    {
      title: '消息类型',
      dataIndex: 'message_type',
      key: 'message_type',
      slots: { customRender: 'message_type' },
    },
    {
      title: '消息内容',
      dataIndex: 'raw_message',
      key: 'raw_message',
    },
  ];
  type MsgTableData = {
    key: string;
    time: number;
    message_type: string;
    message_id: number;
    group_id: number;
    group_name: string;
    user_id: number;
    nickname: string;
    raw_message: string;
  };

  const msgTableData = ref<MsgTableData[]>([]);
  const ws = new Websocket(wsUrl + Api.data);
  ws.onOpen((event) => {
    console.log(event);
    console.log('msg ws连接已打开');
  });
  ws.onMessage((event) => {
    let myDate = new Date();
    console.log(event.data);
    let result = eval('(' + event.data + ')');
    result.time = myDate.toLocaleString();
    result.key = String(result.message_id);
    msgTableData.value.unshift(result);
    if (msgTableData.value.length > 1000) {
      msgTableData.value.shift();
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

<style></style>
