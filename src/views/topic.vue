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
                                    发布于:{{ item.create_at | getLastTimeStr true }}</span>
                            </span>
                            <span class="cr">
                                <span class="iconfont icon"
                                    @click="upReply(item)">&#xe608;</span>
                                {{ item.ups.length }}
                                <span class="iconfont icon" @click="addReply(item.id)">&#xe609;</span>
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

    </div>
</template>

<script>
    export default {
        data (){
            let _self = this;
            return {
                topic: {},           
                topicId: '',
                curReplyId: '',
                userId: localStorage.userId || '',
                /*弱提示*/
                alert: {
                    txt: '',
                    show: false,
                    hideFn: () => {
                        let timer;
                        clearTimeout(timer);
                        timer = setTimeout(() => {
                            _self.alert.show = false;
                        }, 1000);
                    }
                }
            }
        },
        route: {
            data (transition) {
                let _self = this;
                _self.topicId = transition.to.params.id;

                $.get(`https://cnodejs.org/api/v1/topic/${_self.topicId}`, d => {
                    if (d && d.data) {
                        _self.topic = d.data;
                    }
                });
            }
        },
        methods:{
            isUps (ups) {
                let _self = this;
                return $.inArray(_self.userId,ups) >= 0;
            },
            addReply (id) {
                this.curReplyId = id;
                let _self = this;
                if(!_self.userId){
                    _self.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
                }
            },
            upReply (item) {
                let _self = this;
                if (!_self.userId) {
                    _self.$route.router.go('/login?redirect='+encodeURIComponent(this.$route.path));
                }
                else {
                    $.ajax({
                        type: 'POST',
                        url: 'https://cnodejs.org/api/v1/reply/'+item.id+'/ups',
                        data:{accesstoken: localStorage.token},
                        dataType: 'json',
                        success: res => {
                            if (res.success) {
                                if (res.action == "down") {
                                    let index = $.inArray(_self.userId, item.ups);
                                    item.ups.splice(index,1);
                                }
                                else{
                                    item.ups.push(_self.userId);
                                }
                            }
                        },
                        error: res => {
                            let error = JSON.parse(res.responseText);
                            _self.alert.txt = error.error_msg;
                            _self.alert.show = true;
                            _self.alert.hideFn();
                            return false;
                        }
                    });
                }
            }
        },
        components:{
            "nv-head":require('../components/header.vue'),
            "nv-alert":require('../components/nvAlert.vue'),
            "nv-reply":require('../components/reply.vue'),
            "nv-top":require('../components/backtotop.vue')
        }
    }
</script>
