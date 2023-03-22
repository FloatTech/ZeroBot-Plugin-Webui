<template>
  <div>
    <Button type="primary" @click="showAddJobModal">新建任务</Button>
    <Modal
      title="新建任务"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <Form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
        <FormItem label="任务类型" name="任务类型">
          <Select
            v-model:value="formState.jobType"
            placeholder="请选择你的任务类型"
            @change="handleJobTypeChange"
          >
            <SelectOption value="1">指令别名</SelectOption>
            <SelectOption value="2">定时任务</SelectOption>
            <SelectOption value="3">你问我答</SelectOption>
          </Select>
        </FormItem>
        <FormItem label="匹配器" name="匹配器">
          <Input.TextArea
            v-model:value="formState.matcher"
            placeholder="请输入匹配器"
            style="width: 400px"
            :rows="4"
          />
        </FormItem>
        <FormItem label="处理器" name="处理器">
          <Input.TextArea
            v-model:value="formState.handler"
            placeholder="请输入处理器"
            style="width: 400px"
            :rows="4"
          />
        </FormItem>
        <FormItem
          label="指令别名类型"
          name="指令别名类型"
          v-show="formState.jobType.toString() === '1'"
        >
          <RadioGroup v-model:value="formState.fullMatchType">
            <Radio value="1">无状态消息</Radio>
            <Radio value="2">主人消息</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="问题类型" name="问题类型" v-show="formState.jobType.toString() === '3'">
          <RadioGroup v-model:value="formState.questionType">
            <Radio value="1">单群员问</Radio>
            <Radio value="2">所有群员问</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="回答类型" name="回答类型" v-show="formState.jobType.toString() === '3'">
          <RadioGroup v-model:value="formState.answerType">
            <Radio value="1">文本消息</Radio>
            <Radio value="2">注入消息</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="群聊id"
          name="群聊id"
          v-show="formState.jobType.toString() === '2' || formState.jobType.toString() === '3'"
        >
          <Input v-model:value="formState.groupId" />
        </FormItem>
        <FormItem
          label="用户id"
          name="用户id"
          v-show="formState.jobType.toString() === '2' || formState.jobType.toString() === '3'"
        >
          <Input v-model:value="formState.userId" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script lang="ts" setup>
  import { ref, reactive, UnwrapRef } from 'vue';
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
  } from 'ant-design-vue';
  import { jobAdd } from '/@/api/bot/job';
  import { Job } from '/@/api/bot/model/job';
  import { useUserStore } from '/@/store/modules/user';
  import { storeToRefs } from 'pinia';
  const visible = ref<boolean>(false);
  const confirmLoading = ref<boolean>(false);
  const userStore = useUserStore();
  const { qq } = storeToRefs(userStore);

  const showAddJobModal = () => {
    visible.value = true;
  };

  const handleOk = () => {
    confirmLoading.value = true;
    let j: Job = formState;
    console.log(qq.value);
    j.selfId = qq.value;
    jobAdd(j);
    visible.value = false;
    confirmLoading.value = false;
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
    jobType: number;
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
  }
  const formState: UnwrapRef<FormState> = reactive({
    matcher: '',
    handler: '',
    jobType: 0,
    fullMatchType: 2,
    questionType: 2,
    answerType: 1,
    userId: 0,
    groupId: 0,
  });
  const handleJobTypeChange = () => {
    console.log(formState.jobType);
    console.log(typeof formState.jobType);
  };
  const labelCol = { span: 4 };
  const wrapperCol = { span: 14 };
</script>
