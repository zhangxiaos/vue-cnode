<template>
    <section id="sideBar" class="nav-list" :class="{'show':showMenu}">
        <user-info></user-info>
        <ul class="list-ul" @click="hideMenu">
            <li class="icon-all iconfont" v-link="{'name':'list',query:{tab:'all'}}">全部</li>
            <li class="icon-good iconfont" v-link="{name:'list',query:{tab:'good'}}">精华</li>
            <li class="icon-share iconfont" v-link="{name:'list',query:{tab:'share'}}">分享</li>
            <li class="icon-ask iconfont" v-link="{name:'list',query:{tab:'ask'}}">问答</li>
            <li class="icon-job iconfont" v-link="{name:'list',query:{tab:'job'}}">招聘</li>
            <li class="icon-message iconfont line" v-link="{name:'message'}" class="line">消息</li>
            <li class="icon-about iconfont" v-link="{name:'about'}">关于</li>
        </ul>
    </section>
</template>

<script>
    export default {
        props: ['showMenu'],
        methods: {
            hideMenu () {
                // this.$dispatch('close-menu');
                this.showMenu = false;
            }
        },
        components: {
            'userInfo': require('./user-info.vue')
        }
    }
</script>

<style scoped>
    .nav-list {
        position: fixed;
        top: 0;
        bottom: 0;
        left: -200px;
        z-index: 99;
        width: 200px;
        color: #313131;
        transition: all .3s ease;
        background-color: #2b2b2b;
    }
    .nav-list .iconfont:before {
        color: #42b983;
        font-weight: bold;
    }
    .nav-list.show{
        transform: translateX(200px);
    }
    .list-ul {
        overflow: hidden;
        margin: 0 24px;
        border-top: 1px solid #584848;
    }
    .list-ul li {
        padding: 9% 0;
        text-indent: 1px;
        color: #7f8c8d;
    }
    .list-ul li:before{
        margin-right: 25px;
        color: #2c3e50;
    }
    .list-ul .line{
        border-top: 1px solid #584848;
    }
</style>