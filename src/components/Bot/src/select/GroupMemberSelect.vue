<template>
  <div>
    <FormItem has-feedback label="群成员" name="userId">
      <Select
        v-model:value="userId"
        show-search
        placeholder="请选择群成员"
        @change="changeGroupUserId"
        @filterOption="filterOption"
        :class="`${prefixCls}__groupMemberSelect`"
      >
        <SelectOption
          v-for="item in groupMemberModelList"
          :value="item.user_id"
          :key="item.user_id"
        >
          {{ item.nickname + ' (' + item.user_id + ')' }}
        </SelectOption>
      </Select>
    </FormItem>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect, toRefs } from 'vue';
  import { FormItem, Select, SelectOption } from 'ant-design-vue';
  import { GroupMemberModel } from '/@/api/bot/model/gocq';
  import { getGroupMemberList } from '/@/api/bot/bot';
  import { useUserStore } from '/@/store/modules/user';
  import { storeToRefs } from 'pinia';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('groupMemberSelect');
  const props = defineProps({
    groupId: Number,
  });
  //使用父组件传递过来的值
  const { groupId } = toRefs(props);

  const userId = ref<number>();
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);
  const groupMemberModelList = ref<GroupMemberModel[]>([]);
  const getGroupMemberModel = async () => {
    groupMemberModelList.value = await getGroupMemberList({
      selfId: qq.value,
      groupId: groupId?.value,
    });
    if (groupMemberModelList.value !== null) {
      groupMemberModelList.value.unshift({
        age: 0,
        area: '',
        card: '',
        card_changeable: false,
        group_id: 0,
        join_time: 0,
        last_sent_time: 0,
        level: '',
        nickname: '所有群员',
        role: '',
        sex: '',
        shut_up_timestamp: 0,
        title: '',
        title_expire_time: 0,
        unfriendly: false,
        user_id: 0,
      });
    }
  };
  const emits = defineEmits(['changeGroupUserId']);
  const changeGroupUserId = () => {
    emits('changeGroupUserId', userId.value);
  };
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  watchEffect(() => {
    getGroupMemberModel();
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-groupMemberSelect';
  .@{prefix-cls} {
    &__select {
      width: 80%;
    }
  }
</style>
