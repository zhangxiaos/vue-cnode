<template>
    <nv-head page-type="消息" fix-head="true" :show-menu.sync="showMenu"
            :message-count="" :need-add="true" ></nv-head>

    <div class="page" >
        <ul class="tabs">
            <li class="item br" :class='{"selected":selectItem === 2}' @click="changeTab(2)">已读消息</li>
            <li class="item" :class='{"selected":selectItem === 1}' @click="changeTab(1)">
                未读消息
                <i class="iconfont read" @click="markall" style="color: #b58d4b">&#xe60c;</i>
            </li>
        </ul>
        <div class="message markdown-body" v-for="item in currentData">
            <section class="user">
                <img class="head" :src="item.author.avatar_url" />
                <div class="info">
                    <span class="cl">
                        <span class="name">{{item.author.loginname}}</span>
                        <span class="name" v-if="item.type==='at'">在回复中@了您</span>
                        <span class="name" v-if="item.type==='reply'">回复了您的话题</span>
                    </span>
                    <span class="cr">
                        <span class="name">{{item.reply.create_at | getLastTimeStr true}}</span>
                    </span>
                </div>
            </section>
            <div class="reply_content" v-html="item.reply.content"></div>
            <div class="topic-title" v-link="{name:'topic',params:{id:item.topic.id}}">
                话题：{{item.topic.title}}
            </div>
        </div>
        <div class="no-data" v-show="noData">
            暂无数据!
        </div>
    </div>
</template>
<script>
    export default {
        components:{
            "nvHead":require('../components/header.vue')
        },
        data () {
            return {
                showMenu: false,
                selectItem: 2,
                message: {},
                noData: false,
                currentData: []
            }
        },
        route:{
            data (transition) {
                this.$http.get(`messages/?accesstoken=${localStorage.token}`).then(res => {

                    this.message = res.data.data;
                    
                    if (this.message.hasnot_read_messages.length > 0) {
                        this.$set('currentData', this.message.hasnot_read_messages);
                    }
                    else {
                        this.$set('currentData', this.message.has_read_messages);
                        this.selectItem = 2;
                    }

                    this.noData = this.currentData.length === 0 ? true : false;
                });
            }
        },
        methods:{
            changeTab (idx){
                this.selectItem = idx;
                this.currentData = idx ===1 ? this.message.hasnot_read_messages : this.message.has_read_messages;
                this.noData = this.currentData.length === 0 ? true : false;
            },
            markall (){
                console.log(1)
                this.$http.post('message/mark_all', {
                    accesstoken: localStorage.token
                }).then(res => {
                    if (res.success) {
                        window.location.reload();
                    }
                });
            }
        }
    }
</script>
