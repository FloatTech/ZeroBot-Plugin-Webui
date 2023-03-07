<template>
  <div>
    <Divider>消息</Divider>
    <Table :columns="columns" :data-source="msgTableData">
      <template #filterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
        <div style="padding: 8px">
          <Input
            ref="searchInput"
            :placeholder="`搜索 ${column.title}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <Button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </Button>
          <Button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            Reset
          </Button>
        </div>
      </template>
      <template #filterIcon="filtered">
        <SearchOutlined :style="{ color: filtered ? '#108ee9' : undefined }" />
      </template>
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
      <template #raw_message="{ text }">
        <li v-for="(item, index) in segment.fromCqcode(text)" :key="index">
          <div v-if="item.type === 'text'">{{ item.text }}</div>
          <div v-else-if="item.type === 'image'"> <Image :width="200" :src="item.url" /></div>
          <div v-else-if="item.type === 'face'">
            <Image :width="50" :src="'https://blog.imashimaro.com/emoji/qq/' + item.id + '@2x.gif'"
          /></div>
          <div v-else>
            {{ item }}
          </div>
        </li>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
  import Websocket from '/@/utils/socket/websocket';
  import { onUnmounted } from 'vue';
  import { Table, Divider, Tag, Image, Input, Button } from 'ant-design-vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { Api, wsUrl } from '/@/api/bot/bot';
  import { ref, reactive } from 'vue';
  import { segment } from 'oicq/lib/message/elements';
  const searchInput = ref();
  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: '消息id',
      dataIndex: 'message_id',
      key: 'message_id',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
      },
      onFilter: (value, record) =>
        record.message_id.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '群名',
      dataIndex: 'group_name',
      key: 'group_name',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'group_name',
      },
      onFilter: (value, record) =>
        record.group_name.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'nickname',
      },
      onFilter: (value, record) =>
        record.nickname.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '消息类型',
      dataIndex: 'message_type',
      key: 'message_type',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'message_type',
      },
      onFilter: (value, record) =>
        record.message_type.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '消息内容',
      dataIndex: 'raw_message',
      key: 'raw_message',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'raw_message',
      },
      onFilter: (value, record) =>
        record.raw_message.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
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
  const state = reactive({
    searchText: '',
    searchedColumn: '',
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    state.searchText = selectedKeys[0];
    state.searchedColumn = dataIndex;
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    state.searchText = '';
  };
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
      msgTableData.value.pop();
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
