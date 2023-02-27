<template>
  <Table :columns="columns" :data-source="requestTableData">
    <template #requestType="{ record }">
      <span v-if="record.requestType === 'friend'"><Tag color="pink">好友添加</Tag></span>
      <span v-else-if="record.subType === 'add'"><Tag color="green">加群请求</Tag></span>
      <span v-else><Tag color="red">群邀请</Tag></span>
    </template>
    <template #groupName="{ record }">
      <span>{{ record.groupName + ' (' + record.groupId + ')' }}</span>
    </template>
    <template #nickname="{ record }">
      <span>{{ record.nickname + ' (' + record.userId + ')' }}</span>
    </template>
    <template #action="{ record }">
      <span>
        <Button
          type="primary"
          @click="clickHandleRequest(true, record.flag)"
          :class="`${prefixCls}__action`"
          >同意</Button
        >
        <Button
          danger
          @click="clickHandleRequest(false, record.flag)"
          :class="`${prefixCls}__action`"
          >拒绝</Button
        >
        <Modal v-model:visible="visible" title="拒绝理由" @ok="handleOk(record.flag)">
          <Input v-model:value="reason" placeholder="请输入拒绝理由" style="width: 400px" />
        </Modal>
      </span>
    </template>
  </Table>
</template>

<script setup lang="ts">
  import { Table, Button, Modal, Input, Tag } from 'ant-design-vue';
  import { ref, watchEffect, computed } from 'vue';
  import { getRequestList, handleRequest } from '/@/api/bot/bot';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();
  const { prefixCls } = useDesign('request');
  const columns = [
    {
      title: '事件类型',
      dataIndex: 'requestType',
      key: 'requestType',
      slots: { customRender: 'requestType' },
    },
    {
      title: '群名',
      dataIndex: 'groupName',
      key: 'groupName',
      slots: { customRender: 'groupName' },
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      slots: { customRender: 'nickname' },
    },
    {
      title: '验证消息',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ];
  type RequestTableData = {
    key: string;
    requestType: string;
    subType: string;
    groupId: number;
    groupName: string;
    userId: number;
    nickname: string;
    comment: string;
    flag: string;
  };
  const qq = computed(() => userStore.getQQ);
  const requestTableData = ref<RequestTableData[]>([]);
  const getRequestModel = async () => {
    requestTableData.value = [];
    let requestList = await getRequestList({ selfId: qq.value });
    console.log(requestList);
    for (let x of requestList) {
      requestTableData.value.push({
        key: x.flag,
        requestType: x.requestType,
        subType: x.subType,
        groupId: x.groupId,
        groupName: x.groupName,
        userId: x.userId,
        nickname: x.nickname,
        comment: x.comment,
        flag: x.flag,
      });
    }
  };
  const visible = ref<boolean>(false);
  const reason = ref<string>('');
  const clickHandleRequest = async (approve: boolean, flag: string) => {
    if (!approve) {
      visible.value = true;
    } else {
      await handleRequest({ flag: flag, approve: true, reason: '' });
      requestTableData.value = requestTableData.value.filter((item) => item.flag !== flag);
    }
  };
  const handleOk = async (flag: string) => {
    await handleRequest({ flag: flag, approve: false, reason: reason.value });
    requestTableData.value = requestTableData.value.filter((item) => item.flag !== flag);
    reason.value = '';
    visible.value = false;
  };
  watchEffect(() => {
    getRequestModel();
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-request';

  .@{prefix-cls} {
    &__action {
      margin: 0 0 0 10px;
    }
  }
</style>
