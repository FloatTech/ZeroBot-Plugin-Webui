<template>
  <div>
    <Divider>任务</Divider>
    <AddJob @refreshJob="getJobTableData" :class="`${prefixCls}__add`" />
    <Button @click="clearFilters2" :class="`${prefixCls}__clear`">清除筛选</Button>
    <Button @click="clearAll" :class="`${prefixCls}__clear`">清除筛选和排序</Button>
    <Table :columns="columns" :data-source="jobTableData" @change="handleChange">
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
      <template #customRender="{ text, column }">
        <span v-if="state.searchText && state.searchedColumn === column.dataIndex">
          <template
            v-for="(fragment, i) in text
              .toString()
              .split(new RegExp(`(?<=${state.searchText})|(?=${state.searchText})`, 'i'))"
          >
            <mark
              v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
              class="highlight"
              :key="i"
            >
              {{ fragment }}
            </mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>
          {{ text }}
        </template>
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
  import { ref, reactive, watch, computed } from 'vue';
  import { useUserStore } from '/@/store/modules/user';
  import { jobDelete, jobList } from '/@/api/bot/job';
  import { useDesign } from '/@/hooks/web/useDesign';
  import AddJob from './components/AddJob.vue';
  import { storeToRefs } from 'pinia';
  import { TableState, TableStateFilters } from 'ant-design-vue/es/table/interface';
  type Pagination = TableState['pagination'];
  const { prefixCls } = useDesign('job');
  const state = reactive({
    searchText: '',
    searchedColumn: '',
  });
  const searchInput = ref();
  const filteredInfo = ref();
  const sortedInfo = ref();
  const columns = computed(() => {
    const sorted = sortedInfo.value || {};
    return [
      {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) =>
          record.id.toString().toLowerCase().includes(value.toLowerCase()),
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
          customRender: 'customRender',
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
          customRender: 'customRender',
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
          customRender: 'jobType',
        },
        filters: [
          { text: '指令别名', value: '1' },
          { text: '定时任务', value: '2' },
          { text: '你问我答', value: '3' },
        ],
        onFilter: (value: string, record: JobTableData) => record.jobType.toString() === value,
        sorter: (a: JobTableData, b: JobTableData) => a.jobType - b.jobType,
        sortOrder: sorted.columnKey === 'jobType' && sorted.order,
        ellipsis: true,
      },
      {
        title: '指令别名类型',
        dataIndex: 'fullMatchType',
        key: 'fullMatchType',
        slots: {
          customRender: 'fullMatchType',
        },
        filters: [
          { text: '空', value: '0' },
          { text: '无状态消息', value: '1' },
          { text: '主人消息', value: '2' },
        ],
        onFilter: (value: string, record: JobTableData) =>
          record.fullMatchType.toString() === value,
        sorter: (a: JobTableData, b: JobTableData) => a.fullMatchType - b.fullMatchType,
        sortOrder: sorted.columnKey === 'fullMatchType' && sorted.order,
        ellipsis: true,
      },
      {
        title: '问题类型',
        dataIndex: 'questionType',
        key: 'questionType',
        slots: {
          customRender: 'questionType',
        },
        filters: [
          { text: '空', value: '0' },
          { text: '单群员问', value: '1' },
          { text: '所有群员问', value: '2' },
        ],
        onFilter: (value: string, record: JobTableData) => record.questionType.toString() === value,
        sorter: (a: JobTableData, b: JobTableData) => a.questionType - b.questionType,
        sortOrder: sorted.columnKey === 'questionType' && sorted.order,
        ellipsis: true,
      },
      {
        title: '回答类型',
        dataIndex: 'answerType',
        key: 'answerType',
        slots: {
          customRender: 'answerType',
        },
        filters: [
          { text: '空', value: '0' },
          { text: '文本消息', value: '1' },
          { text: '注入消息', value: '2' },
        ],
        onFilter: (value: string, record: JobTableData) => record.answerType.toString() === value,
        sorter: (a: JobTableData, b: JobTableData) => a.answerType - b.answerType,
        sortOrder: sorted.columnKey === 'answerType' && sorted.order,
        ellipsis: true,
      },
      {
        title: '群聊id',
        dataIndex: 'groupId',
        key: 'groupId',
        slots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
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
          customRender: 'customRender',
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
  });
  type JobTableData = {
    key?: string;
    id?: string;
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
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    state.searchText = selectedKeys[0];
    state.searchedColumn = dataIndex;
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    state.searchText = '';
  };
  const handleChange = (pagination: Pagination, filters: TableStateFilters, sorter: any) => {
    console.log('Various parameters', pagination, filters, sorter);
    filteredInfo.value = filters;
    sortedInfo.value = sorter;
  };
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);
  const getJobTableData = async () => {
    jobTableData.value = [];
    let rsp = await jobList();
    for (let j of rsp) {
      if (j.selfId === qq.value) {
        let o: JobTableData = j;
        o.key = j.id!.toString();
        jobTableData.value.push(o);
      }
    }
  };
  const clearFilters2 = () => {
    filteredInfo.value = null;
  };
  const clearAll = () => {
    filteredInfo.value = null;
    sortedInfo.value = null;
  };
  const deleteJob = async (idList: string[]) => {
    await jobDelete({
      selfId: qq.value,
      idList: idList,
    });
    jobTableData.value = jobTableData.value.filter((x) => !idList.includes(x.id!));
  };
  getJobTableData();
  watch(qq, () => {
    getJobTableData();
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-job';

  .@{prefix-cls} {
    &__action {
      margin: 0 0 0 10px;
    }
    &__add {
      margin: 10px 0 0px 10px;
    }
    &__clear {
      margin: 10px 0 10px 10px;
    }
  }
</style>
