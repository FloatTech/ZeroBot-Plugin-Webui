<template>
  <GroupAndFriendSelect @change-gid-list="changeMsg" />
  <GroupMemberSelect @change-group-user-id="changeMsg2" />
  <GroupSelect @change-group-id="changeMsg2" />
  <FriendSelect @change-user-id="changeMsg2" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import {
    GroupAndFriendSelect,
    GroupMemberSelect,
    GroupSelect,
    FriendSelect,
  } from '/@/components/Bot';
  const list = ref<number[]>([]);
  const id = ref<number>();
  const changeMsg = (value: number[]) => {
    list.value = value;
    console.log(list.value);
  };
  const changeMsg2 = (value: number) => {
    id.value = value;
    console.log(id.value);
  };
</script>

<style></style>
