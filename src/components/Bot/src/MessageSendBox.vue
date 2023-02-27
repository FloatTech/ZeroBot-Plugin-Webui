<template>
  <div :class="`${prefixCls}__sendbox`">
    <Divider>发送消息</Divider>
    <Form layout="horizontal" v-bind="formItemLayout" :model="formState">
      <MessageSendSelect @change-group-id-list="groupIdListChange" />
      <FormItem label="消息">
        <Input.TextArea
          v-model:value="formState.msg"
          placeholder="请输入消息"
          style="width: 400px"
          :rows="4"
        />
      </FormItem>
      <FormItem :wrapper-col="{ span: 14, offset: 4 }">
        <Button type="primary" @click="sendMessage">发送</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, UnwrapRef } from 'vue';
  import { Form, FormItem, Button, Divider, Input } from 'ant-design-vue';
  import { sendMsg } from '/@/api/bot/bot';
  import { useUserStore } from '/@/store/modules/user';
  import { MessageSendSelect } from '/@/components/Bot';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('messageSendBox');
  interface FormState {
    gidList: number[];
    msg: string;
  }
  const formState: UnwrapRef<FormState> = reactive({
    gidList: [],
    msg: '',
  });
  const formItemLayout = computed(() => {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  });
  const groupIdListChange = (value: number[]) => {
    formState.gidList = value;
  };
  const userStore = useUserStore();
  const qq = computed(() => userStore.getQQ);

  const sendMessage = async () => {
    await sendMsg({
      selfId: qq.value,
      gidList: formState.gidList,
      message: formState.msg,
    });
  };
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-messageSendBox';
  .@{prefix-cls} {
    &__sendbox {
      left: 0;
      right: 0;
    }
  }
</style>
