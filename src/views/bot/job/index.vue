<template>
  <div>
    <Divider>任务</Divider>
    <AddJob />
    <Table :columns="columns" :data-source="jobTableData">
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
      <template #jobType="{ text }">
        <Tag color="green" v-if="text === 1">指令别名</Tag>
        <Tag color="green" v-else-if="text === 2">定时任务</Tag>
        <Tag color="green" v-else-if="text === 3">你问我答</Tag>
        <Tag color="red" v-else>未知类型</Tag>
      </template>
      <template #fullMatchType="{ record }">
        <span v-if="record.jobType !== 1">-</span>
        <Tag color="green" v-else-if="record.fullMatchType === 1">无状态消息</Tag>
        <Tag color="green" v-else-if="record.fullMatchType === 2">主人消息</Tag>
        <Tag color="red" v-else>未知类型</Tag>
      </template>
      <template #questionType="{ record }">
        <span v-if="record.jobType !== 3">-</span>
        <Tag color="green" v-else-if="record.questionType === 1">单群员问</Tag>
        <Tag color="green" v-else-if="record.questionType === 2">所有群员问</Tag>
        <Tag color="red" v-else>未知类型</Tag>
      </template>
      <template #answerType="{ record }">
        <span v-if="record.jobType !== 3">-</span>
        <Tag color="green" v-else-if="record.answerType === 1">文本消息</Tag>
        <Tag color="green" v-else-if="record.answerType === 2">注入消息</Tag>
        <Tag color="red" v-else>未知类型</Tag>
      </template>
      <template #groupId="{ record }">
        <span v-if="record.jobType === 1">-</span>
        <span v-else>{{ record.groupId }}</span>
      </template>
      <template #userId="{ record }">
        <span v-if="record.jobType === 1">-</span>
        <span v-else>{{ record.userId }}</span>
      </template>
      <template #action="{ record }">
        <span>
          <Button danger :class="`${prefixCls}__action`" @click="deleteJob([record.id])"
            >删除</Button
          >
        </span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
  import { Table, Divider, Tag, Input, Button } from 'ant-design-vue';
  import { SearchOutlined } from '@ant-design/icons-vue';
  import { ref, reactive, watchEffect } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { jobDelete, jobList } from '/@/api/bot/job';
  import { useDesign } from '/@/hooks/web/useDesign';
  import AddJob from './components/AddJob.vue';
  import { storeToRefs } from 'pinia';
  const { prefixCls } = useDesign('job');
  const searchInput = ref();
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'id',
      },
      onFilter: (value, record) => record.id.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '匹配器',
      dataIndex: 'matcher',
      key: 'matcher',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'matcher',
      },
      onFilter: (value, record) =>
        record.matcher.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '处理器',
      dataIndex: 'handler',
      key: 'handler',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'handler',
      },
      onFilter: (value, record) =>
        record.handler.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '任务类型',
      dataIndex: 'jobType',
      key: 'jobType',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'jobType',
      },
      onFilter: (value, record) =>
        record.handler.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '指令别名类型',
      dataIndex: 'fullMatchType',
      key: 'fullMatchType',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'fullMatchType',
      },
      onFilter: (value, record) =>
        record.fullMatchType.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '问题类型',
      dataIndex: 'questionType',
      key: 'questionType',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'questionType',
      },
      onFilter: (value, record) =>
        record.questionType.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '回答类型',
      dataIndex: 'answerType',
      key: 'answerType',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'answerType',
      },
      onFilter: (value, record) =>
        record.answerType.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '群聊id',
      dataIndex: 'groupId',
      key: 'groupId',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'groupId',
      },
      onFilter: (value, record) =>
        record.groupId.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '用户id',
      dataIndex: 'userId',
      key: 'userId',
      slots: {
        filterDropdown: 'filterDropdown',
        filterIcon: 'filterIcon',
        customRender: 'userId',
      },
      onFilter: (value, record) =>
        record.userId.toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            searchInput.value.focus();
          }, 100);
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ];
  type JobTableData = {
    key?: string;
    id?: number;
    selfId?: number;
    answerType: number;
    fullMatchType: number;
    handler: string;
    jobType: number;
    matcher: string;
    questionType: number;
    groupId: number;
    userId: number;
  };
  const jobTableData = ref<JobTableData[]>([]);
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
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);
  const getJobTableData = async () => {
    jobTableData.value = [];
    let rsp = await jobList();
    for (let j of rsp.jobList) {
      if (j.selfId === qq.value) {
        let o: JobTableData = j;
        o.key = j.id!.toString();
        jobTableData.value.push(o);
      }
    }
  };
  const deleteJob = async (idList: number[]) => {
    await jobDelete({
      selfId: qq.value,
      idList: idList,
    });
  };
  watchEffect(() => {
    getJobTableData();
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-job';

  .@{prefix-cls} {
    &__action {
      margin: 0 0 0 10px;
    }
  }
</style>
