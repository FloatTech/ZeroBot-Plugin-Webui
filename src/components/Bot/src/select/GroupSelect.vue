<template>
  <div>
    <FormItem label="群聊">
      <Select
        v-model:value="groupId"
        style="width: 40%"
        placeholder="请选择群聊"
        @change="changeGroupId"
      >
        <SelectOption v-for="item in groupModelList" :value="item.group_id" :key="item.group_id">
          {{ item.group_name + ' (' + item.group_id + ')' }}
        </SelectOption>
      </Select>
    </FormItem>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { FormItem, Select, SelectOption } from 'ant-design-vue';
  import { GroupModel } from '/@/api/bot/model/gocq';
  import { getGroupList } from '/@/api/bot/bot';
  import { useUserStore } from '/@/store/modules/user';
  import { storeToRefs } from 'pinia';
  const groupId = ref<number>();
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);
  const groupModelList = ref<GroupModel[]>([]);
  const getGroupModel = async () => {
    groupModelList.value = await getGroupList({ selfId: qq.value });
  };
  const emits = defineEmits(['changeGroupId']);
  const changeGroupId = () => {
    emits('changeGroupId', groupId.value);
  };
  watchEffect(() => {
    getGroupModel();
  });
</script>

<style></style>
