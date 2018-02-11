<template>
    <div v-if="isShow">
        <Modal
                :title="title"
                v-model="visible"
                :class-name="className"
                :loading="loading"
                :scrollable="scrollable"
                @on-cancel="onCancel"
        >
            <slot></slot>
            <div slot="footer">
               <slot name="footer"></slot>
                &nbsp;
                <!--重置-->
                <Button type="info" icon="refresh" @click="reset">{{ $t('global.reset') }}</Button>
                <!--提交-->
                <Button type="primary" icon="checkmark-circled" @click="submit">{{$t('global.submit')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script type="text/babel">
    import Vue from 'vue';
    export default  {
        name:'xfd-modal',
        props: {
            value: {
                type: Boolean,
                default: false
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            },
            loading:{
                type: Boolean,
                default: false
            },
            className: {
                type: String
            },
            onSubmit:{
                type:Function
            },
            onReset:{
                type:Function
            }
        },
        data(){
            return {
                isShow:false
            };
        },
        computed:{
            visible:{
                get: function () {
                    return this.value;
                },
                // setter
                set: function (val) {
                    this.$parent.visible=val;
                    this.isShow=val;
                }
            }
        },
        watch:{
            visible(val){
                this.isShow=val;
            }
        },
        methods:{
            reset(){
                this.onReset();
            },
            submit(){
                if(this.onSubmit!==undefined){
                   this.onSubmit();
                }else{
                    this.$parent.visible=false;
                }
            },
            onCancel(){
                this.$emit('on-cancel');
            }
        }
    }
</script>