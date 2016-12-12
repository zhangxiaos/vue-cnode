<template>
    <nv-head page-type="主题"></nv-head>

    <div id="page" v-if="topic.title">
        <h2 class="topic-title">{{ topic.title }}</h2>
        <section class="author-info">
            <img class="avatar" :src="topic.author.avatar_url" />
            <div class="col">
                <span>{{ topic.author.loginname }}</span>
                <time>
                    发布于: {{ topic.create_at | getLastTimeStr true }}
                </time>
            </div>
            <div>
                <span class="tag"
                      :class="topic.tab | getTabClassName topic.good topic.top">
                        {{ topic.tab | getTabStr topic.good topic.top }}</span>
                <span class="name">{{ topic.visit_count }}次浏览</span>
            </div>
        </section>

        <section class='markdown-body topic-content' v-html="topic.content">
        </section>

        <h3 class="topic-reply">
            <strong>{{ topic.reply_count }}</strong> 回复
        </h3>

        <section class="reply-list">
            <ul>
                <li v-for="item in topic.replies">
                    <section class="user">
                        <img class="head" 
                             :src="item.author.avatar_url"
                             v-link="{name:'user',params:{loginname:item.author.loginname}}"/>
                        <div class="info">
                            <span class="cl">
                                <span class="name">{{ item.author.loginname }}</span>
                                <span class="name mt10">
                                    发布于：{{ item.create_at | getLastTimeStr true }}</span>
                            </span>
                            <span class="cr">
                                <span class="iconfont icon-appreciatefill" @click="upReply(item)"></span>
                                {{ item.ups.length }}
                                <span class="iconfont icon-commentfill" @click="addReply(item.id)"></span>
                            </span>
                        </div>
                    </section>
                    <div class="reply_content" v-html="item.content"></div>
                    <nv-reply :topic.sync="topic"
                              :topic-id="topicId"
                              :reply-id="item.id"
                              :reply-to="item.author.loginname"
                              :show.sync="curReplyId"
                              v-if="userId && curReplyId === item.id"></nv-reply>
                </li>
            </ul>
        </section>
        
        <nv-top></nv-top>

        <nv-reply v-if="userId"
                  :topic.sync="topic"
                  :topic-id="topicId"
                  :reply-id="" >
        </nv-reply>

        <nv-alert :content="alert.txt" :show="alert.show"></nv-alert>
        
        <loading :show-loading="showLD"></loading>
    </div>
</template>

<script>
    export default {
        components:{
            'nv-head': require('components/header'),
            'nv-reply': require('components/reply'),
            'nv-alert': require('components/nvAlert'),
            'nv-top': require('components/backtotop'),
            'loading': require('components/loading')
        },
        data () {
            return {
                topic: {},           
                topicId: '',
                curReplyId: '',
                userId: localStorage.userId || '',
                alert: {
                    txt: '',
                    show: false,
                    hideFn: () => {
                        let timer;
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            this.alert.show = false;
                        }, 1000);
                    }
                }
            }
        },
        route: {
            data (transition) {
                this.topicId = transition.to.params.id;

                this.$http.get(`topic/${this.topicId}`).then(res => {
                    this.showLD = false;
                    this.$set('topic', res.data.data);
                });
            }
        },
        methods:{
            upReply (item) {
                if (!this.userId) {
                    this.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
                }
                else {
                    this.$http.post(`reply/${item.id}/ups`, {
                        accesstoken: localStorage.token
                    })
                    .then(res => {
                        res = res.data;

                        if (res.success) {
                            if (res.action === 'down') {
                                let index = $.inArray(this.userId, item.ups);
                                item.ups.splice(index, 1);
                            }
                            else {
                                item.ups.push(this.userId);
                            }
                        }
                    })
                    .catch(err => {
                        this.alert.txt = err.body.error_msg;
                        this.alert.show = true;
                        this.alert.hideFn();
                        return false;
                    });
                }
            },

            addReply (id) {
                this.curReplyId = id;

                if(!this.userId){
                    this.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
                }
            }
        }
    }
</script>
