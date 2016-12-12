<template>
    <nv-head page-type="用户信息" :show-menu="false"></nv-head>

    <section class="userinfo">
        <img class="u-img" :src="user.avatar_url" /><br/>
        <span class="u-name" v-text="user.loginname"></span>
        <div class="u-bottom">
            <span class="u-time" v-text="user.create_at | getLastTimeStr false"></span>
            <span class="u-score">积分：{{user.score}}</span>
        </div>
    </section>
    <section class="topics">
        <ul class="user-tabs">
            <li class="item br" :class='{"selected":selectItem === 1}' @click="changeTab(1)">最近回复</li>
            <li class="item" :class='{"selected":selectItem === 2}' @click="changeTab(2)">最新发布</li>
        </ul>
        <div class="message markdown-body" v-for="item in currentData">
            <section class="user">
                <img class="head" :src="item.author.avatar_url"
                    v-link="{name:'user',params:{loginname:item.author.loginname}}" />
                <div class="info" v-link="{name:'topic',params:{id:item.id}}">
                    <div class="t-title">{{item.title}}</div>
                    <span class="cl">
                        <span class="name">{{item.author.loginname}}</span>
                    </span>
                    <span class="cr">
                        <span class="name">{{item.last_reply_at | getLastTimeStr true}}</span>
                    </span>
                </div>
            </section>
        </div>
        <div class="no-data" v-show="currentData.length === 0">
            暂无数据!
        </div>
    </section>
</template>

<script>
    export default  {
        components: {
            'nvHead': require('../components/header.vue')
        },
        data () {
            return {
                user: {},
                currentData: [],
                selectItem: 1
            }
        },
        route: {
            data (transition){
                let loginname = transition.to.params.loginname;

                this.$http.get(`user/${loginname}`).then(res => {
                    let data = res.data.data;
                    this.user = data;

                    if(data.recent_replies.length > 0){
                        this.currentData = data.recent_replies;
                    }
                    else{
                        this.currentData = data.recent_topics;
                        this.selectItem = 2;
                    }
                });
            }
        },
        methods: {
            changeTab (idx) {
                this.selectItem = idx;
                this.currentData = idx ===1 ? this.user.recent_replies : this.user.recent_topics;
            }
        }
    }
</script>

<style scoped>
    .no-data {
        margin-top: 30%;
        padding: 0;
    }
</style>
