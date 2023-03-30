<template>
  <div>
    <Popover title="点击下列头像, 切换QQ号" trigger="click">
      <template #content>
        <Avatar
          v-for="item in data"
          :key="item.id"
          :src="item.pic"
          @click="selectId(item)"
          :class="`${prefixCls}__avatar`"
        />
      </template>
      <Avatar :src="'http://q4.qlogo.cn/g?b=qq&nk=' + qq + '&s=640'" />
    </Popover>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { Popover, Avatar, message } from 'ant-design-vue';
  import { getBotList } from '/@/api/bot/bot';
  import { useUserStore } from '/@/store/modules/user';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { storeToRefs } from 'pinia';
  const { prefixCls } = useDesign('botSwitch');
  interface DataItem {
    id: number;
    pic: string;
  }
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);
  const data = ref<DataItem[]>([]);
  const initList = async () => {
    data.value = [];
    let botList = await getBotList();
    for (let x of botList) {
      data.value.push({
        id: x,
        pic: 'http://q4.qlogo.cn/g?b=qq&nk=' + x + '&s=640',
      });
    }
    if (qq.value === 0 && botList.length > 0) {
      userStore.setQQ(botList[0]);
    }
  };

  const selectId = (item: DataItem) => {
    userStore.setQQ(item.id);
    message.info('切换到QQ: ' + qq.value);
  };
  initList();
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-botSwitch';
  .@{prefix-cls} {
    &__avatar {
      margin: 0 0 0 10px;
    }
  }
</style>
