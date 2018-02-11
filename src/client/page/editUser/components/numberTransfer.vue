<template>
    <div style="width:70%;margin:0 auto;">
    <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="120">
        <FormItem  label="总账户">
            <Input readonly v-model="formItem.totalAccount"></Input>
        </FormItem>
        <FormItem  label="总账户可用条数">
            <Input readonly v-model="formItem.totalAccountNum"></Input>
        </FormItem>
        <FormItem label="划拨类型">
            <RadioGroup v-model="formItem.transferType">
                <Radio label="0">充值</Radio>
                <Radio label="1">扣费</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem  label="划拨条数">
            <Input v-model="formItem.transferNum"></Input>
        </FormItem>
        <FormItem  label="当前账户可用条数">
            <Input readonly v-model="formItem.nowAccountNum"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
            <!--<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>-->
        </FormItem>
    </Form>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    totalAccount: '上海兴企',
                    totalAccountNum: '4525455',
                    transferType: '0',
                    transferNum: "",
                    nowAccountNum: '1255',
                }
            }
        },
        methods: {
            handleSubmit (name) {
                let sendForm = {
                    transferType:this.formItem.transferType,
                    transferNum:this.formItem.transferNum
                };
                console.log(sendForm);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            // handleReset (name) {
            //     this.$refs[name].resetFields();
            //
            // }
        }
    }
</script>