<template>
  <div>
    <FormItem has-feedback label="群聊" name="groupId">
      <Select
        v-model:value="groupId"
        show-search
        placeholder="请选择群聊"
        @change="changeGroupId"
        @filterOption="filterOption"
        :class="`${prefixCls}__groupSelect`"
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
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('groupSelect');
  const groupId = ref<number>();
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);
  const groupModelList = ref<GroupModel[]>([]);
  const getGroupModel = async () => {
    groupModelList.value = await getGroupList({ selfId: qq.value });
    if (groupModelList.value !== null) {
      groupModelList.value.unshift({
        group_id: 0,
        group_name: '私聊',
        group_create_time: 0,
        group_level: 0,
        max_member_count: 0,
        member_count: 0,
      });
    }
  };
  const emits = defineEmits(['changeGroupId']);
  const changeGroupId = () => {
    emits('changeGroupId', groupId.value);
  };
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  watchEffect(() => {
    getGroupModel();
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-groupSelect';
  .@{prefix-cls} {
    &__select {
      width: 80%;
    }
  }
</style>
