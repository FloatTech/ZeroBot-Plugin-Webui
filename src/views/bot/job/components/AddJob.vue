<template>
  <div>
    <Button type="primary" @click="showAddJobModal">添加任务</Button>
    <Modal title="Title" v-model:visible="visible" :confirm-loading="confirmLoading" @ok="handleOk">
      <p>{{ modalText }}</p>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { Modal, Button } from 'ant-design-vue';
  const modalText = ref<string>('Content of the modal');
  const visible = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);

  const showAddJobModal = () => {
    visible.value = true;
  };

  const handleOk = () => {
    modalText.value = 'The modal will be closed after two seconds';
    confirmLoading.value = true;
    setTimeout(() => {
      visible.value = false;
      confirmLoading.value = false;
    }, 2000);
  };
</script>
