<template>
  <div>
    <FormItem has-feedback label="好友" name="userId">
      <Select
        v-model:value="userId"
        show-search
        placeholder="请选择好友"
        @change="changeUserId"
        @filterOption="filterOption"
        :class="`${prefixCls}__friendSelect`"
      >
        <SelectOption v-for="item in friendModelList" :value="item.user_id" :key="item.user_id">
          {{ item.nickname + ' (' + item.user_id + ')' }}
        </SelectOption>
      </Select>
    </FormItem>
  </div>
</template>

<script setup lang="ts">
  import { ref, watchEffect } from 'vue';
  import { FormItem, Select, SelectOption } from 'ant-design-vue';
  import { FriendModel } from '/@/api/bot/model/gocq';
  import { getFriendList } from '/@/api/bot/bot';
  import { useUserStore } from '/@/store/modules/user';
  import { storeToRefs } from 'pinia';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('friendSelect');
  const userId = ref<number>();
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);
  const friendModelList = ref<FriendModel[]>([]);
  const getGroupModel = async () => {
    friendModelList.value = await getFriendList({ selfId: qq.value });
  };
  const emits = defineEmits(['changeUserId']);
  const changeUserId = () => {
    emits('changeUserId', userId.value);
  };
  const filterOption = (input: string, option: any) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  watchEffect(() => {
    getGroupModel();
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-friendSelect';
  .@{prefix-cls} {
    &__select {
      width: 80%;
    }
  }
</style>
