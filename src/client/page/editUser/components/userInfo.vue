<template>
    <div style="width:90%;margin:0 auto;">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110">
        <Row>
            <i-col span="12">
            <FormItem label="账号" prop="name">
                <Input v-model="formValidate.name" placeholder="账号"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
            <Input v-model="formValidate.password" placeholder="密码"></Input>
            </FormItem>
            <FormItem label="隶属组织" prop="organization">
                <Select v-model="formValidate.organization" placeholder="请选择....">
                    <Option value="0">组织0</Option>
                    <Option value="1">组织1</Option>
                    <Option value="2">组织2</Option>
                </Select>
            </FormItem>

            <FormItem label="E-mail" prop="mail">
            <Input v-model="formValidate.mail" placeholder="E-mail"></Input>
            </FormItem>
            <FormItem label="联系电话" prop="phoneNum">
            <Input v-model="formValidate.phoneNum" placeholder="联系电话"></Input>
            </FormItem>
            <FormItem label="用户类型" prop="userType">
            <RadioGroup v-model="formValidate.userType" @on-change="userType">
            <Radio label="0">总账户</Radio>
            <Radio label="1">子账户</Radio>
            </RadioGroup>
            </FormItem>
            <FormItem label="扣费方式" prop="deductionMethod" v-show="!isTotalAccount">
                <RadioGroup v-model="formValidate.deductionMethod">
                    <Radio label="0">扣除自身账户条数</Radio>
                    <Radio label="1">扣除总账户条数</Radio>
                </RadioGroup>
            </FormItem>
            </i-col>
            <i-col span="12">
            <FormItem label="权限" prop="power">
            <Select v-model="formValidate.power" placeholder="权限">
            <Option value="0">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            </Select>
            </FormItem>
            <FormItem label="昵称" prop="nick">
            <Input v-model="formValidate.nick" placeholder="昵称"></Input>
            </FormItem>
            <FormItem label="状态" prop="status">
            <Select v-model="formValidate.status">
            <Option value="0">未启用</Option>
            <Option value="1">启用</Option>
            </Select>
            </FormItem>
                <FormItem label="有效期">
                    <Date-picker  v-model="formValidate.data" :value="value2" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="选择日期"></Date-picker>
                </FormItem>
            <FormItem label="查询跨度" prop="querySpan">
            <Select v-model="formValidate.querySpan" placeholder="请选择....">
            <Option value="0">New York</Option>
            <Option value="1">London</Option>
            <Option value="2">Sydney</Option>
            </Select>
            </FormItem>
            <FormItem label="编辑" prop="isEdit">
                <CheckboxGroup v-model="formValidate.isEdit">
                    <Checkbox label="是否允许"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="审核" prop="review" v-show="!isTotalAccount">
                 <CheckboxGroup v-model="formValidate.review">
                     <Checkbox label="需由总账户先进行审核"></Checkbox>
                 </CheckboxGroup>
            </FormItem>
            </i-col>
        </Row>
        <FormItem label="备注" prop="remarks">
            <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 4,maxRows: 8}"
                   placeholder="备注..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
    export default {
        name: "user-info",
        data() {
            return {
                isTotalAccount:true,
                formValidate: {
                    name: "",
                    password:"",
                    isEdit:[],
                    mail:"",
                    phoneNum:"",
                    power:"",
                    nick:"",
                    status:"1",
                    querySpan:"",
                    organization:"0",
                    date:[],
                    remarks: "",
                    userType:"0",
                    deductionMethod:"0",   //扣费方式
                    review:[]    //审核
                },
                ruleValidate: {
                    name: [
                        {required: true, message: 'The name cannot be empty', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'The name cannot be empty', trigger: 'blur'}
                    ],
                    nick: [
                        {required: true, message: 'The name cannot be empty', trigger: 'blur'}
                    ],
                    mail: [
                        {required: false, message: 'Mailbox cannot be empty', trigger: 'blur'},
                        {type: 'email', message: 'Incorrect email format', trigger: 'blur'}
                    ],
                    power: [
                        {required: true, message: 'Please select the city', trigger: 'change'}
                    ],
                    status: [
                        {required: true, message: 'Please select gender', trigger: 'change'}
                    ],
                    organization: [
                        {required: true, message: 'Please select gender', trigger: 'change'}
                    ],
                    interest: [
                        {
                            required: true,
                            type: 'array',
                            min: 1,
                            message: 'Choose at least one hobby',
                            trigger: 'change'
                        },
                        {type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change'}
                    ],
                    date: [
                        {required: true, type: 'date', message: 'Please select the date', trigger: 'change'}
                    ],
                    time: [
                        {required: true, type: 'date', message: 'Please select time', trigger: 'change'}
                    ],
                    desc: [
                        {required: true, message: 'Please enter a personal introduction', trigger: 'blur'},
                        {type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur'}
                    ]
                }
            }
        },
        created(){ console.log(this.formValidate.userType);
            // let self = this;

        },
        methods: {
            userType(){
                let self = this;
                let type = this.formValidate.userType;
                if(self.formValidate.userType==0){    //"0":总账户   "1":子账户
                    self.isTotalAccount = true;
                }else{
                    self.isTotalAccount = false;
                }
            },
            handleSubmit(name) {
                console.log(this.formValidate);
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset(name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>