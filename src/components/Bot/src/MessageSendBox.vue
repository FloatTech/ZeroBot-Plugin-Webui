<template>
  <div :class="`${prefixCls}__sendbox`">
    <Divider>发送消息</Divider>
    <Form layout="horizontal" v-bind="formItemLayout" :model="formState">
      <MessageSendSelect @change-group-id-list="groupIdListChange" />
      <FormItem label="示例CQ码">
        <Select
          v-model:value="formState.cqInput"
          show-search
          placeholder="请选择一个示例CQ码"
          style="width: 200px"
          :options="formState.cqOptions"
          @change="addCQ"
        />
      </FormItem>
      <FormItem label="消息">
        <Input.TextArea
          v-model:value="formState.msg"
          placeholder="请输入消息"
          style="width: 400px"
          :rows="4"
        />
      </FormItem>
      <FormItem :wrapper-col="{ span: 14, offset: 4 }">
        <Button type="primary" @click="sendMessage" :class="`${prefixCls}__action`">发送</Button>
        <Button type="primary" @click="reset" :class="`${prefixCls}__action`">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
  import { computed, reactive, UnwrapRef } from 'vue';
  import { Form, FormItem, Button, Divider, Input, Select } from 'ant-design-vue';
  import { sendMsg } from '/@/api/bot/bot';
  import { useUserStore } from '/@/store/modules/user';
  import { MessageSendSelect } from '/@/components/Bot';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { segment } from 'oicq/lib/message/elements';
  import { genCqcode } from '/@/utils/cq/message';
  import { storeToRefs } from 'pinia';
  const { prefixCls } = useDesign('messageSendBox');
  interface FormState {
    gidList: number[];
    msg: string;
    cqInput: string;
    cqOptions: any[];
  }
  const formState: UnwrapRef<FormState> = reactive({
    gidList: [],
    msg: '',
    cqInput: '',
    cqOptions: [],
  });
  const formItemLayout = computed(() => {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  });
  const initCqOption = () => {
    formState.cqOptions = [];
    formState.cqOptions.push({
      value: genCqcode([segment.face(0)]),
      label: 'face QQ表情(id=0~324)',
      key: 'face',
    });
    formState.cqOptions.push({
      value: genCqcode([segment.rps(1)]),
      label: 'rps 猜拳魔法表情(id=1~3)',
      key: 'rps',
    });
    formState.cqOptions.push({
      value: genCqcode([segment.at('all', '参数1')]),
      label: 'at @某人',
      key: 'at',
    });
    formState.cqOptions.push({
      value: genCqcode([segment.image('http://q4.qlogo.cn/g?b=qq&nk=1&s=640', false)]),
      label: 'image 图片',
      key: 'image',
    });
    formState.cqOptions.push({
      value: genCqcode([segment.record('https://mm.cqu.cc/share/zhifubaodaozhang/mp3/1.mp3')]),
      label: 'record 语音',
      key: 'record',
    });
    formState.cqOptions.push({
      value: genCqcode([segment.video('http://q4.qlogo.cn/g?b=qq&nk=1&s=640')]),
      label: 'video 短视频',
      key: 'video',
    });
    formState.cqOptions.push({
      value: genCqcode([segment.poke(123456)]),
      label: 'poke 戳一戳',
      key: 'poke',
    });
    formState.cqOptions.push({
      value: genCqcode([segment.share('http://q4.qlogo.cn/g?b=qq&nk=1&s=640', '标题')]),
      label: 'share 链接分享',
      key: 'share',
    });
    formState.cqOptions.push({
      value:
        '[CQ:cardimage,file=https://i.pixiv.re/img-master/img/2020/03/25/00/00/08/80334602_p0_master1200.jpg]',
      label: 'cardimage 装逼大图',
      key: 'cardimage',
    });
    formState.cqOptions.push({
      value: '[CQ:tts,text=这是一条测试消息]',
      label: 'tts 文本转语音',
      key: 'tts',
    });
    formState.cqOptions.push({
      value: '[CQ:reply,id=123456]',
      label: 'reply 回复',
      key: 'reply',
    });
    formState.cqOptions.push({
      value: '[CQ:music,type=163,id=28949129]',
      label: 'music 音乐分享',
      key: 'music',
    });
    formState.cqOptions.push({
      value: '[CQ:forward,id=123456]',
      label: 'forward 合并转发',
      key: 'forward',
    });
  };
  const addCQ = () => {
    formState.msg += formState.cqInput;
  };
  const groupIdListChange = (value: number[]) => {
    formState.gidList = value;
  };
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);

  const sendMessage = async () => {
    await sendMsg({
      selfId: qq.value,
      gidList: formState.gidList,
      message: formState.msg,
    });
  };
  const reset = () => {
    formState.msg = '';
  };
  initCqOption();
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-messageSendBox';
  .@{prefix-cls} {
    &__sendbox {
      left: 0;
      right: 0;
    }
    &__action {
      margin: 0 0 0 10px;
    }
  }
</style>
