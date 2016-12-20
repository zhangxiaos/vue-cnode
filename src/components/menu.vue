<template>
    <section id="sideBar" class="nav-list" :class="{'show': showMenu}">
        <user-info></user-info>
        <ul class="list-ul" @click="hideMenu">
            <router-link class="icon-all iconfont" tag="li" to="list?tab=all">全部</router-link>
            <router-link class="icon-good iconfont" tag="li" to="list?tab=good">精华</router-link>
            <router-link class="icon-share iconfont" tag="li" to="list?tab=share">分享</router-link>
            <router-link class="icon-ask iconfont" tag="li" to="list?tab=ask">问答</router-link>
            <router-link class="icon-job iconfont" tag="li" to="list?tab=job">招聘</router-link>
            <router-link class="icon-message iconfont line" tag="li" to="message">消息</router-link>
            <router-link class="icon-about iconfont" tag="li" to="about">关于</router-link>
        </ul>
    </section>
</template>

<script>
    import bus from '../libs/bus'

    export default {
        props: ['showMenu'],
        components: {
            'userInfo': require('./user-info.vue')
        },
        methods: {
            hideMenu () {
                bus.$emit('hide-menu-header');
            }
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
    .nav-list.show {
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
    .list-ul li:before {
        margin-right: 25px;
        color: #2c3e50;
    }
    .list-ul .line {
        border-top: 1px solid #584848;
    }
</style>