<template>
  <div>
    <Button type="primary" @click="showAddJobModal">新建任务</Button>
    <Modal
      title="新建任务"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <Form
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :rules="rules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
        ref="formRef"
      >
        <FormItem has-feedback label="任务类型" name="jobType">
          <Select v-model:value="formState.jobType" placeholder="请选择你的任务类型">
            <SelectOption value="1">指令别名</SelectOption>
            <SelectOption value="2">定时任务</SelectOption>
            <SelectOption value="3">你问我答</SelectOption>
          </Select>
        </FormItem>
        <Tooltip :title="formState.matcherTip" :class="`${prefixCls}__tip`">
          <FormItem has-feedback label="匹配器" name="matcher">
            <Input.TextArea
              v-model:value="formState.matcher"
              placeholder="请输入匹配器"
              style="width: 400px"
              :rows="4"
              @change="changeMatcher"
            />
          </FormItem>
        </Tooltip>
        <FormItem has-feedback label="处理器" name="handler">
          <Input.TextArea
            v-model:value="formState.handler"
            placeholder="请输入处理器"
            style="width: 400px"
            :rows="4"
          />
        </FormItem>
        <FormItem
          has-feedback
          label="指令别名类型"
          name="fullMatchType"
          v-show="formState.jobType.toString() === '1'"
        >
          <RadioGroup v-model:value="formState.fullMatchType">
            <Radio value="1">无状态消息</Radio>
            <Radio value="2">主人消息</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          has-feedback
          label="问题类型"
          name="questionType"
          v-show="formState.jobType.toString() === '3'"
        >
          <RadioGroup v-model:value="formState.questionType">
            <Radio value="1">单群员问</Radio>
            <Radio value="2">所有群员问</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          has-feedback
          label="回答类型"
          name="answerType"
          v-show="formState.jobType.toString() === '3'"
        >
          <RadioGroup v-model:value="formState.answerType">
            <Radio value="1">文本消息</Radio>
            <Radio value="2">注入消息</Radio>
          </RadioGroup>
        </FormItem>
        <GroupSelect
          v-show="formState.jobType.toString() === '2' || formState.jobType.toString() === '3'"
          @change-group-id="changeGroupId"
        />
        <GroupMemberSelect
          v-show="
            (formState.jobType.toString() === '2' || formState.jobType.toString() === '3') &&
            formState.groupId.toString() !== '0'
          "
          @change-group-user-id="changeGroupUserId"
          :group-id="formState.groupId"
        />
        <FriendSelect
          v-show="
            (formState.jobType.toString() === '2' || formState.jobType.toString() === '3') &&
            formState.groupId.toString() === '0'
          "
          @change-user-id="changeUserId"
        />
      </Form>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, UnwrapRef, toRaw } from 'vue';
  import {
    Modal,
    Button,
    Form,
    FormItem,
    Input,
    Select,
    SelectOption,
    RadioGroup,
    Radio,
    Tooltip,
  } from 'ant-design-vue';
  import { jobAdd } from '/@/api/bot/job';
  import { useUserStore } from '/@/store/modules/user';
  import { storeToRefs } from 'pinia';
  import { GroupSelect, GroupMemberSelect, FriendSelect } from '/@/components/Bot';
  import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
  import { parseExpression } from 'cron-parser';
  import { useDesign } from '/@/hooks/web/useDesign';
  const { prefixCls } = useDesign('addjob');
  const formRef = ref();
  const visible = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);
  const showAddJobModal = () => {
    visible.value = true;
  };

  const emits = defineEmits(['refreshJob']);
  const handleOk = async () => {
    formRef.value
      .validate()
      .then(() => {
        console.log('values', formState, toRaw(formState));
      })
      .catch((error: ValidateErrorEntity<FormState>) => {
        console.log('error', error);
        return;
      });
    confirmLoading.value = true;
    try {
      await jobAdd({
        answerType: parseInt(formState.answerType),
        questionType: parseInt(formState.questionType),
        groupId: parseInt(formState.groupId),
        userId: parseInt(formState.userId),
        jobType: parseInt(formState.jobType),
        fullMatchType: parseInt(formState.fullMatchType),
        handler: formState.handler,
        matcher: formState.matcher,
        selfId: qq.value,
      });
    } catch (e) {
      console.log(e);
      confirmLoading.value = false;
      return;
    }
    setTimeout(() => {
      visible.value = false;
      confirmLoading.value = false;
      emits('refreshJob');
    }, 1000);
  };
  const changeGroupId = (value: number) => {
    formState.groupId = value;
  };
  const changeGroupUserId = (value: number) => {
    formState.userId = value;
  };
  const changeUserId = (value: number) => {
    formState.userId = value;
  };
  interface FormState {
    /**
     * 回答类型, jobType=3使用的参数, 1=文本消息, 2=注入消息
     */
    answerType: number;
    /**
     * 指令别名类型, jobType=1使用的参数, 1=无状态消息, 2=主人消息
     */
    fullMatchType: number;
    /**
     * 群聊id, jobType=2,3使用的参数, jobType=2且私聊, group_id=0
     */
    groupId: number;
    /**
     * 执行内容
     */
    handler: string;
    /**
     * 任务类型,1-指令别名,2-定时任务,3-你问我答
     */
    jobType: number | string;
    /**
     * 当jobType=1时 为指令别名,当jobType=2时 为cron表达式,当jobType=3时 为正则表达式
     */
    matcher: string;
    /**
     * 问题类型, jobType=3使用的参数, 1=单独问, 2=所有人问
     */
    questionType: number;
    /**
     * 用户id, jobType=2,3使用的参数, 当jobType=3, QuestionType=2,userId=0
     */
    userId: number;

    matcherTip: string;
  }
  const formState: UnwrapRef<FormState> = reactive({
    matcher: '',
    handler: '',
    jobType: '',
    fullMatchType: 2,
    questionType: 2,
    answerType: 1,
    userId: 0,
    groupId: 0,
    matcherTip: '',
  });
  let validateFullMatchType = async (rule: RuleObject, value: string) => {
    if (value === '' && formState.jobType.toString() === '1') {
      return Promise.reject('请输入指令别名类型');
    }
    return Promise.resolve();
  };
  let validateAnswerType = async (rule: RuleObject, value: string) => {
    if (value === '' && formState.jobType.toString() === '3') {
      return Promise.reject('请输入回答类型');
    }
    return Promise.resolve();
  };
  let validateQuestionType = async (rule: RuleObject, value: string) => {
    if (value === '' && formState.jobType.toString() === '3') {
      return Promise.reject('请输入问题类型');
    }
    return Promise.resolve();
  };
  let validateUserId = async (rule: RuleObject, value: string) => {
    if (
      value === '' &&
      (formState.jobType.toString() === '2' || formState.jobType.toString() === '3')
    ) {
      return Promise.reject('请选择用户');
    } else if (value.toString() === '0' && formState.jobType.toString() === '2') {
      return Promise.reject('用户不能为0');
    }
    return Promise.resolve();
  };
  let validateGroupId = async (rule: RuleObject, value: string) => {
    console.log(value, formState.jobType);
    if (
      value === '' &&
      (formState.jobType.toString() === '2' || formState.jobType.toString() === '3')
    ) {
      return Promise.reject('请选择群聊');
    } else if (value.toString() === '0' && formState.jobType.toString() === '3') {
      return Promise.reject('群聊不能为0');
    }
    return Promise.resolve();
  };
  const rules = {
    jobType: [{ required: true, trigger: 'change' }],
    handler: [{ required: true, trigger: 'change' }],
    matcher: [{ required: true, trigger: 'change' }],
    fullMatchType: [{ validator: validateFullMatchType, trigger: 'change' }],
    answerType: [{ validator: validateAnswerType, trigger: 'change' }],
    questionType: [{ validator: validateQuestionType, trigger: 'change' }],
    userId: [{ validator: validateUserId, trigger: 'change' }],
    groupId: [{ validator: validateGroupId, trigger: 'change' }],
  };
  const handleFinish = (values: FormState) => {
    console.log(values, formState);
  };
  const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
    console.log(errors);
  };
  const changeMatcher = () => {
    if (formState.jobType.toString() === '2') {
      // 解析cron表达式
      const interval = parseExpression(formState.matcher);
      let text = '';
      // 打印接下来5次任务执行的时间
      for (let i = 0; i < 5; i++) {
        const nextTime = interval.next();
        text += `任务将在 ${nextTime.toString()} 执行。\n`;
      }
      formState.matcherTip = text;
    }
  };
  const labelCol = { span: 4 };
  const wrapperCol = { span: 14 };
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-addjob';

  .@{prefix-cls} {
    &__tip {
      white-space: pre-wrap; /* 允许自动换行，保留空格和换行符 */
    }
  }
</style>
