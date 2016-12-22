<template>
    <div>
        <nv-head page-type="用户信息" :show-menu="showMenu"></nv-head>

        <section class="userinfo">
            <img class="u-img" :src="user.avatar_url" /><br/>
            <span class="u-name" v-text="user.loginname"></span>
            <div class="u-bottom">
                <span class="u-time" v-text="getTime(user.create_at, false)"></span>
                <span class="u-score">积分：{{ user.score }}</span>
            </div>
        </section>
        <section class="topics">
            <ul class="user-tabs">
                <li class="item br" :class="{'selected': selectItem === 1}" @click="changeTab(1)">最近回复</li>
                <li class="item" :class="{'selected': selectItem === 2}" @click="changeTab(2)">最新发布</li>
            </ul>
            <div class="message markdown-body" v-for="item in currentData">
                <section class="user">
                    <router-link class="head" 
                        :src="item.author.avatar_url" 
                        tag="img"
                        :to="'/user/' + item.author.loginname"></router-link>

                    <router-link class="info"
                        tag="div" 
                        :to="'/topic/' + item.id">
                        
                        <div class="t-title">{{ item.title }}</div>
                        <span class="cl">
                            <span class="name">{{ item.author.loginname }}</span>
                        </span>
                        <span class="cr">
                            <span class="name">{{ item.last_reply_at | getLastTimeStr(true) }}</span>
                        </span>
                    </router-link>
                </section>
            </div>
            <div class="no-data" v-show="currentData.length === 0">
                暂无数据!
            </div>
        </section>
        <loading :show-loading="showLD"></loading>
    </div>
</template>

<script>
    import utils from  '../libs/utils'
    import bus from '../libs/bus'

    export default  {
        components: {
            'nvHead': require('../components/header.vue'),
            'loading': require('components/loading')
        },
        data () {
            return {
                user: {},
                currentData: [],
                selectItem: 1,
                showMenu: false,
                showLD: true
            }
        },
        created () {
            bus.$on('open-menu-header', this.openMenu);
            bus.$on('hide-menu-header', this.hideMenu);
            this.getData();
        },
        beforeDestroy () {
            bus.$off('open-menu-header', this.openMenu);
            bus.$off('hide-menu-header', this.hideMenu);
        },
        methods: {
            getData () {
                let loginname = this.$route.params.loginname;

                this.$http.get(`user/${loginname}`).then(res => {
                    let data = res.data.data;
                    this.showLD = false;
                    this.user = data;

                    if(data.recent_replies.length > 0){
                        this.currentData = data.recent_replies;
                    }
                    else{
                        this.currentData = data.recent_topics;
                        this.selectItem = 2;
                    }
                });
            },
            openMenu () {
                this.showMenu = true;
            },
            hideMenu () {
                this.showMenu = false;
            },
            changeTab (idx) {
                this.selectItem = idx;
                this.currentData = idx ===1 ? this.user.recent_replies : this.user.recent_topics;
            },
            getTime (time, friendly) {
               if (friendly) {
                    return utils.MillisecondToDate(new Date() - new Date(time));
                } else {
                    return utils.fmtDate(new Date(time),'yyyy-MM-dd hh:mm');
                } 
            }
        }
    }
</script>

<style scoped>
    .no-data {
        margin-top: 30%;
        padding: 0;
    }
    .info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
