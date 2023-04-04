<template>
  <div>
    <FormItem label="好友">
      <Select
        v-model:value="userId"
        style="width: 40%"
        placeholder="请选择好友"
        @change="changeUserId"
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
  watchEffect(() => {
    getGroupModel();
  });
</script>

<style></style>
