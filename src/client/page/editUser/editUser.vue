<template>
    <!--<Button type="primary" @click="modal1 = true">Display dialog box</Button>-->
    <Modal
            v-model="modal1"
            title="编辑关联"
            width="70%"
            >
        <Tabs value="name1">
            <TabPane label="基本信息" name="name1">
                <user-info></user-info>
            </TabPane>
            <TabPane label="选择发送账号" name="name2">
                <select-account></select-account>
            </TabPane>
            <TabPane label="分配签名" name="name3">
                <sign></sign>
            </TabPane>
            <TabPane label="条数划拨" name="name4">
                <number-transfer></number-transfer>
            </TabPane>
        </Tabs>
    </Modal>
</template>
<script>
    import Vue from 'vue';
    import userInfo from './components/userInfo.vue';
    import selectAccount from './components/selectAccount';
    import sign from './components/sign';
    import numberTransfer from './components/numberTransfer';
    export default {
        components:{
            userInfo,selectAccount,sign,numberTransfer
        },
        data() {
            return {
                modal1: true
            }
        },
        methods: {
            // ok() {
            //     this.$Message.info('Clicked ok');
            // },
            // cancel() {
            //     this.$Message.info('Clicked cancel');
            // }
        }
    }
</script>
<!--<style lang=”less” scoped>-->
<style>
    .ivu-modal {
        margin: 0;
        top: 0;
        height: 100%;
        position: absolute;
        right: 0;
        overflow:hidden;
    }
    .ivu-modal-content {
        height: 100%;
        border-radius:0;
    }
    .ivu-modal-body {
        overflow: auto;
        height: 93%;
    }
    .ivu-modal-footer{
        display:none;
    }
</style>