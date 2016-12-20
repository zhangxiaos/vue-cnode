<template>
    <i class="iconfont icon-top" 
       v-show="show" 
       @click="goTop"></i>
</template>

<script>
    export default {
        data () {
            return {
                show: false,
            }
        },
        mounted () {
            this.$nextTick(() => {
                $(window).on('scroll', () => {
                    this.show = $(window).scrollTop() > 100 ? true : false; 
                });
            });
        },
        beforeDestory () {
            $(window).off('scroll');
        },
        methods: {
            goTop () {
                $(window).scrollTop(0);
                this.show = false;
            }
        }
    }
</script>

<style scoped>
    .icon-top {
        position: fixed;
        right: 15px;
        bottom: 60px;
        padding: 8px;
        font-size: 40px;
        z-index: 9999;
        color: #fff;
        border-radius: 50%;
        background: #42b983;
    }
</style>