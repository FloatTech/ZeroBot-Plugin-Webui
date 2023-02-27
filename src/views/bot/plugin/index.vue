<template>
  <div>
    <Form layout="horizontal" v-bind="formItemLayout" :model="formState">
      <FormItem label="插件名">
        <Select
          v-model:value="formState.pluginNames"
          mode="multiple"
          style="width: 40%"
          placeholder="请选择插件名"
          :options="
            pluginModelList.map((_, i) => ({
              value: pluginModelList[i].name,
              label: pluginModelList[i].name + ' ( ' + pluginModelList[i].brief + ' )',
            }))
          "
          @change="pluginNamesChange"
        />
      </FormItem>
      <FormItem label="群聊 & 好友">
        <Select
          v-model:value="formState.groupIdList"
          mode="multiple"
          style="width: 40%"
          placeholder="请选择群聊 & 好友"
          @change="groupIdListChange"
        >
          <SelectOptGroup label="群聊">
            <SelectOption
              v-for="item in groupModelList"
              :value="item.group_id"
              :key="item.group_id"
            >
              {{ item.group_name + ' (' + item.group_id + ')' }}
            </SelectOption>
          </SelectOptGroup>
          <SelectOptGroup label="好友">
            <SelectOption
              v-for="item in friendModelList"
              :value="-item.user_id"
              :key="item.user_id"
            >
              {{ item.nickname + ' (' + item.user_id + ')' }}
            </SelectOption>
          </SelectOptGroup>
        </Select>
      </FormItem>
      <FormItem :wrapper-col="{ span: 14, offset: 4 }">
        <Button type="primary" @click="getPluginTableData">搜索</Button>
      </FormItem>
    </Form>
    <Table :dataSource="pluginTableData" :columns="columns">
      <template #name="{ record }">
        <a @click="getPluginDetail(record.gid, record.name)">{{ record.name }}</a>
        <Modal
          v-model:visible="modalPluginModelVisible"
          :title="modalPluginModel?.name"
          @ok="handleOk"
        >
          <span :class="`${prefixCls}__info`">
            <Image :src="modalPluginModel?.banner" :class="`${prefixCls}__banner`" />
            <p :class="`${prefixCls}__brief`">{{ modalPluginModel?.brief }}</p>
            <p :class="`${prefixCls}__usage`">{{ modalPluginModel?.usage }}</p>
          </span>
        </Modal>
      </template>
      <template #pluginStatus="{ text }">
        <span v-if="text"><Tag color="green">启用</Tag></span>
        <span v-else><Tag color="red">禁用</Tag></span>
      </template>
      <template #responseStatus="{ text }">
        <span v-if="text"><Tag color="green">响应</Tag></span>
        <span v-else><Tag color="red">沉默</Tag></span>
      </template>
      <template #action="{ record }">
        <span>
          <Button
            type="primary"
            @click="pluginStatusChange(record.gid, record.name, 1)"
            :class="`${prefixCls}__action`"
            >启用</Button
          >
          <Button
            danger
            @click="pluginStatusChange(record.gid, record.name, 0)"
            :class="`${prefixCls}__action`"
            >禁用</Button
          >
          <Button
            type="primary"
            @click="pluginStatusChange(record.gid, record.name, 2)"
            :class="`${prefixCls}__action`"
            >还原</Button
          >
          <Button
            type="primary"
            @click="responseStatusChange(record.gid, 1)"
            :class="`${prefixCls}__action`"
            >响应</Button
          >
          <Button
            danger
            @click="responseStatusChange(record.gid, 0)"
            :class="`${prefixCls}__action`"
            >沉默</Button
          >
        </span>
      </template>
    </Table>
  </div>
</template>
<script setup lang="ts">
  import { ref, computed, UnwrapRef, reactive, watchEffect } from 'vue';
  import {
    Form,
    FormItem,
    Select,
    Button,
    Table,
    Modal,
    Image,
    SelectOptGroup,
    SelectOption,
    Tag,
  } from 'ant-design-vue';
  import {
    getFriendList,
    getGroupList,
    getAllPlugin,
    updatePluginStatus,
    getPlugin,
    updateResponseStatus,
  } from '/@/api/bot/bot';
  import { PluginModel, GroupModel, FriendModel } from '/@/api/bot/model/gocq';
  import { useUserStore } from '/@/store/modules/user';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('plugin');
  console.log('prefixCls', prefixCls);
  interface FormState {
    pluginNames: string[];
    groupIdList: number[];
  }
  const formState: UnwrapRef<FormState> = reactive({
    pluginNames: [],
    groupIdList: [0],
    friendIdList: [],
  });
  const formItemLayout = computed(() => {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  });
  const pluginModelList = ref<PluginModel[]>([]);
  const groupModelList = ref<GroupModel[]>([]);
  const friendModelList = ref<FriendModel[]>([]);
  const userStore = useUserStore();
  type PluginTableData = {
    key: string;
    name: string;
    friend_name: string;
    group_name: string;
    gid: number;
    pluginStatus: boolean;
    responseStatus: boolean;
  };
  const pluginTableData = ref<PluginTableData[]>([]);
  const columns = [
    {
      title: '插件名',
      dataIndex: 'name',
      key: 'name',
      slots: { customRender: 'name' },
    },
    {
      title: '群名',
      dataIndex: 'group_name',
      key: 'group_name',
    },
    {
      title: '好友名',
      dataIndex: 'friend_name',
      key: 'friend_name',
    },
    {
      title: '插件状态',
      dataIndex: 'pluginStatus',
      key: 'pluginStatus',
      slots: { customRender: 'pluginStatus' },
    },
    {
      title: '响应状态',
      dataIndex: 'responseStatus',
      key: 'responseStatus',
      slots: { customRender: 'responseStatus' },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      slots: { customRender: 'action' },
    },
  ];
  const modalPluginModelVisible = ref<boolean>(false);
  const modalPluginModel = ref<PluginModel>();
  const getPluginDetail = async (gid, name) => {
    modalPluginModel.value = await getPlugin({ groupId: gid, name: name });
    modalPluginModelVisible.value = true;
  };

  const handleOk = (e: MouseEvent) => {
    console.log(e);
    modalPluginModelVisible.value = false;
  };
  const getPluginModel = async (group_id) => {
    pluginModelList.value = await getAllPlugin({ groupId: group_id });
  };
  const qq = computed(() => userStore.getQQ);
  const getGroupModel = async () => {
    groupModelList.value = await getGroupList({ selfId: qq.value });
    groupModelList.value.unshift({
      group_id: 0,
      group_name: '全部群聊',
      group_create_time: 0,
      group_level: 0,
      max_member_count: 0,
      member_count: 0,
    });
  };
  const getFriendModel = async () => {
    friendModelList.value = await getFriendList({ selfId: qq.value });
  };
  const pluginStatusChange = async (group_id, name, status) => {
    await updatePluginStatus({ groupId: group_id, name: name, status: status });
    pluginTableData.value
      .filter((x) => x.gid === group_id && x.name === name)
      .forEach((x) => {
        x.pluginStatus = status;
      });
  };
  const responseStatusChange = async (group_id, status) => {
    await updateResponseStatus({ groupId: group_id, status: status });
    pluginTableData.value
      .filter((x) => x.gid === group_id)
      .forEach((x) => {
        x.responseStatus = status;
      });
  };
  const pluginNamesChange = (pluginNames: string[]) => {
    console.log(`selected ${pluginNames}`);
  };
  const groupIdListChange = (groupIdList: string) => {
    console.log(`selected ${groupIdList}`);
  };
  const getPluginTableData = async () => {
    pluginTableData.value = [];
    const groupIds = formState.groupIdList.filter((x) => x >= 0);
    const friendIds = formState.groupIdList.filter((x) => x < 0).map((x) => -x);
    // 过滤群聊
    let filterGroups = groupModelList.value.filter((x) => groupIds.includes(x.group_id));
    for (let g of filterGroups) {
      let pluginList = await getAllPlugin({ groupId: g.group_id });
      let filterPlugins = pluginList.filter((x) => formState.pluginNames.includes(x.name));
      for (let p of filterPlugins) {
        pluginTableData.value.push({
          key: g.group_name + p.name,
          name: p.name,
          friend_name: '',
          group_name: g.group_name,
          gid: g.group_id,
          pluginStatus: p.pluginStatus,
          responseStatus: p.responseStatus,
        });
      }
    }

    // 过滤好友
    let filterFriends = friendModelList.value.filter((x) => friendIds.includes(x.user_id));
    for (let f of filterFriends) {
      let pluginList = await getAllPlugin({ groupId: -f.user_id });
      let filterPlugins = pluginList.filter((x) => formState.pluginNames.includes(x.name));
      for (let p of filterPlugins) {
        pluginTableData.value.push({
          key: f.nickname + p.name,
          name: p.name,
          friend_name: f.nickname,
          group_name: '',
          gid: -f.user_id,
          pluginStatus: p.pluginStatus,
          responseStatus: p.responseStatus,
        });
      }
    }
  };
  getPluginModel(0);
  watchEffect(() => {
    getGroupModel();
    getFriendModel();
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-plugin';

  .@{prefix-cls} {
    &__info {
      font-size: 20px;
      font-family: '微软雅黑', Arial;
    }
    &__banner {
      margin-right: 12px;
    }
    &__brief {
      padding: 0 0 0 10px;
      font-size: 20px;
    }
    &__usage {
      padding: 0 0 0 10px;
      font-size: 20px;
      font-weight: bold;
      white-space: pre-wrap;
    }
    &__action {
      margin: 0 0 0 10px;
    }
  }
</style>
