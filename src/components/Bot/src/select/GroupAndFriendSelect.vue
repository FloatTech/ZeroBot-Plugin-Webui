<template>
  <div>
    <FormItem label="群聊 & 好友">
      <Select
        v-model:value="gidList"
        mode="multiple"
        style="width: 40%"
        placeholder="请选择群聊 & 好友"
        @change="changeGidList"
      >
        <SelectOptGroup label="群聊">
          <SelectOption v-for="item in groupModelList" :value="item.group_id" :key="item.group_id">
            {{ item.group_name + ' (' + item.group_id + ')' }}
          </SelectOption>
        </SelectOptGroup>
        <SelectOptGroup label="好友">
          <SelectOption v-for="item in friendModelList" :value="-item.user_id" :key="item.user_id">
            {{ item.nickname + ' (' + item.user_id + ')' }}
          </SelectOption>
        </SelectOptGroup>
      </Select>
    </FormItem>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { FormItem, Select, SelectOptGroup, SelectOption } from 'ant-design-vue';
  import { GroupModel, FriendModel } from '/@/api/bot/model/gocq';
  import { getFriendList, getGroupList } from '/@/api/bot/bot';
  import { useUserStore } from '/@/store/modules/user';
  import { storeToRefs } from 'pinia';
  const gidList = ref<number[]>([]);
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);
  const groupModelList = ref<GroupModel[]>([]);
  const friendModelList = ref<FriendModel[]>([]);
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
  const emits = defineEmits(['changeGidList']);
  const changeGidList = () => {
    emits('changeGidList', gidList.value);
  };
  watchEffect(() => {
    getGroupModel();
    getFriendModel();
  });
</script>

<style></style>
