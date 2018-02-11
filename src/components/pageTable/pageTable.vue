<style>
    .ivu-table-row-highlight{
        color: #2d8cf0;
        font-weight: bold;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
<template>
    <div>
        <Table :border="border" ref="selection" :columns="columns" :data="showData" :height="height"
               :stripe="stripe" :show-header="showHeader" :loading="loading" :highlight-row="true" @on-row-dblclick="dbclickRow">
            <slot name="header" slot="header"></slot>
            <div slot="footer" style="padding: 0 15px">
                <div style="float: left;display: inline-block;">
                    <slot name="footer"></slot>
                </div>
                <Page :total="pageState.total" :current="pageState.current" :page-size-opts="pageSizeOpts" :page-size="pageSize"
                      placement="top"
                      @on-page-size-change="changePageSize" @on-change="changePage" style="float: right" :show-sizer="true" :show-total="true"></Page>
            </div>
            <div class="loader" slot="loading">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </div>
        </Table>
    </div>
</template>
<script type="text/babel">
    import Vue from 'vue';
    export default  {
        name:'xfd-page-table',
        props: {
            border: {//边框
                type: Boolean,
                default: false
            },
            columns: {//表头数组
                type: Array
            },
            data: {//数据数组
                type: Array
            },
            stripe:{//斑马纹
                type: Boolean,
                default: false
            },
            showHeader: {//是否显示头部
                type: Boolean,
                default: true
            },
            loading:{//是否加载数据中
                type: Boolean,
                default: false
            },
            pageSizeOpts:{//所有条数选择
                type: Array,
                default: function () {
                    return [10, 20, 30, 40]
                }
            },
            pageInfo:{
                type:Object,
                default: function () {
                    //pageSize:每页条数,current:当前页,total:总条数
                    return { pageSize: 10,current:1,total:0 }
                }
            },
            asyn:{//是否开启异步获取数据（异步的话传多少数据就显示多少数据）
                type: Boolean,
                default: false
            },
            height:{
                type: [Number, String]
            }
        },
        data(){
           return{
           }
        },
        computed:{
            showData:{
                get:function () {
                    if(this.asyn){
                        return this.data;
                    }else{
                        return this.getData(this.pageState);
                    }
                },
                set:function (val) {
                    if(this.asyn){
                        this.showData=this.data;
                    }else{
                        this.showData=this.getData(val);
                    }
                }
            },
            pageState:{
                get:function () {
                    return this.pageInfo;
                }
            }
        },
        methods:{
            getData(pageState){
                let data=[];
                this.data.forEach(function (item,index) {
                    if( index>=pageState.pageSize*(pageState.current-1) && index< pageState.pageSize*pageState.current){
                        data.push(item);
                    }
                });
                return data;
            },
            changePage(val){
                this.pageState.current=val;
                this.$emit('on-change',val);
            },
            changePageSize(val){
                this.pageState.pageSize=val;
                this.$emit('on-page-size-change',val);
            },
            getSelection(){
                return this.$refs.selection.getSelection();
            },
            dbclickRow(val) {
                this.$emit('on-row-dblclick', val);
            }
        },
        created(){
            if(!this.asyn){
                this.pageState.total=this.data.length;
            }

        }
    }
</script>