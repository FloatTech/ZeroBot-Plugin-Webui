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
      <Avatar :src="curItem.pic" />
    </Popover>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Popover, Avatar, message } from 'ant-design-vue';
  import { getBotList } from '/@/api/bot/bot';
  import { useUserStore } from '/@/store/modules/user';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('botSwitch');
  interface DataItem {
    id: number;
    pic: string;
  }
  const curItem = ref<DataItem>({
    id: 1,
    pic: 'http://q4.qlogo.cn/g?b=qq&nk=' + 1 + '&s=640',
  });
  const userStore = useUserStore();
  const data = ref<DataItem[]>([]);
  const qq = computed(() => userStore.getQQ);
  const initList = async () => {
    data.value = [];
    let botList = await getBotList();
    if (!qq.value && botList.length > 0) {
      userStore.setQQ(botList[0]);
    }
    for (let x of botList) {
      data.value.push({
        id: x,
        pic: 'http://q4.qlogo.cn/g?b=qq&nk=' + x + '&s=640',
      });
    }
    curItem.value = {
      id: qq.value,
      pic: 'http://q4.qlogo.cn/g?b=qq&nk=' + qq.value + '&s=640',
    };
  };
  const selectId = (item: DataItem) => {
    userStore.setQQ(item.id);
    message.info('切换到QQ: ' + item.id);
    curItem.value = item;
    console.log(curItem);
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
