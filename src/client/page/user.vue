<template>
    <div>
        <Card>
            <Form v-model="userForm" :label-width="120" inline>
                <Row :gutter="16">
                    <i-col span="6">
                        <FormItem label="用户账号">
                            <Input v-model="userForm.userName"/>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="昵称">
                            <Input v-model="userForm.nickName"/>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem label="状态">
                            <Select v-model="userForm.status" style="width: 160px;">
                                <Option v-for="item in statusList" :key="item.value" :value="item.value">{{item.label}}</Option>
                            </Select>
                        </FormItem>
                    </i-col>
                    <i-col span="6">
                        <FormItem>
                            <Button type="primary" icon="search" @click="handleSubmit()" style="width: 80px;">查询</Button>
                            <Button type="info" icon="refresh" @click="handleReset()" style="width: 80px;">重置</Button>
                        </FormItem>
                    </i-col>
                </Row>
            </Form>
        </Card>
        <xfd-page-table ref="selection" :border="true" :columns="columns" :data="data" style="margin-top: 20px;" @on-row-dblclick="dbclickRow">
            <div slot="header" style="padding: 0 15px;">
                <span>查询列表</span>
                <div style="float: right;">
                    <Button type="primary" icon="person-add" @click="handleAdd()">新增</Button>
                    <Button type="error" icon="trash-a" @click="handleDelete()">删除</Button>
                </div>
            </div>
        </xfd-page-table>
    </div>
</template>

<script>
    import XfdPageTable from '../../components/pageTable/pageTable.vue'
    export default {
        data () {
            return {
                userForm: {
                    userName: "",
                    nickName: "",
                    status: "all"
                },
                statusList: [
                    {
                        value: "all",
                        label: "全部"
                    },
                    {
                        value: "1",
                        label: "启用"
                    },
                    {
                        value: "0",
                        label: "停用"
                    }
                ],
                columns: [
                    {
                        type: "selection",
                        width: '60'
                    },
                    {
                        title: "ID",
                        key: "id",
                        align: "center"
                    },
                    {
                        title: "账号",
                        key: "userName",
                        align: "center"
                    },
                    {
                        title: "昵称",
                        key: "nickName",
                        align: "center"
                    },
                    {
                        title: "账户余额",
                        key: "account",
                        align: "center"
                    },
                    {
                        title: "剩余短信",
                        key: "SMS",
                        align: "center"
                    },
                    {
                        title: "E-mail",
                        key: "email",
                        align: "center"
                    },
                    {
                        title: "发送审核",
                        key: "isAudit",
                        align: "center"
                    },
                    {
                        title: "是否总账户",
                        key: "isMaster",
                        align: "center"
                    },
                    {
                        title: "创建时间",
                        key: "createTime",
                        align: "center"
                    },
                    {
                        title: "创建人",
                        key: "creator",
                        align: "center"
                    },
                    {
                        title: "状态",
                        key: "status",
                        align: "center"
                    },
                    {
                        title: "备注",
                        key: "memo",
                        align: "center"
                    },
                    {
                        title: "所属组织",
                        key: "organization",
                        align: "center"
                    }
                ],
                data: [
                    {
                        id: "1",
                        userName: "123",
                        nickName: "123",
                        account: 122,
                        SMS: 1220,
                        email: "12@123.com",
                        isAudit: "否",
                        isMaster: "是",
                        createTime: "2018-01-31",
                        creator: "111",
                        status: "启用",
                        memo: "",
                        organization: "直客组"
                    },
                    {
                        id: "2",
                        userName: "233",
                        nickName: "233",
                        account: 2333,
                        SMS: 23330,
                        email: "2333@123.com",
                        isAudit: "是",
                        isMaster: "是",
                        createTime: "2018-02-02",
                        creator: "system",
                        status: "停用",
                        memo: "2333",
                        organization: "代理组"
                    }
                ]
            }
        },
        methods: {
            //查询
            handleSubmit () {
                this.$Message.success("query");
            },
            //重置
            handleReset () {
                this.userForm = {
                    userName: "",
                    nickName: "",
                    status: "all"
                };
            },
            //添加
            handleAdd () {
                this.$Message.success("add");
            },
            //批量删除
            handleDelete () {
                let data = [];
                let len = this.$refs['selection'].getSelection();
                if (len.length === 0) {
                    this.$Message.error("请选择要删除的用户");
                } else {
                     len.forEach((item)=>{
                         data.push(item.id);
                     });
                     console.log(data);
                }
            },
            //双击展示
            dbclickRow (params) {
                console.log(params);
            }
        },
        components: {
            XfdPageTable
        }
    }
</script>