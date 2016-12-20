<template>
    <div>
        <nv-head page-type="消息" fix-head="true" :show-menu="showMenu"
                :message-count="1" :need-add="true"></nv-head>

        <div class="page" >
            <ul class="tabs">
                <li class="item br" :class='{"selected":selectItem === 2}' @click="changeTab(2)">已读消息</li>
                <li class="item" :class='{"selected":selectItem === 1}' @click="changeTab(1)">
                    未读消息
                    <i class="iconfont icon-attentionfill read" @click="markall" style="color: #b58d4b"></i>
                </li>
            </ul>
            <div class="message markdown-body" v-for="item in currentData">
                <section class="user">
                    <img class="head" :src="item.author.avatar_url" />
                    <div class="info">
                        <span class="cl">
                            <span class="name">{{ item.author.loginname }}</span>
                            <span class="name" v-if="item.type==='at'">在回复中@了您</span>
                            <span class="name" v-if="item.type==='reply'">回复了您的话题</span>
                        </span>
                        <span class="cr">
                            <span class="name">{{ item.reply.create_at | getLastTimeStr(true) }}</span>
                        </span>
                    </div>
                </section>
                <div class="reply_content" v-html="item.reply.content"></div>
                <router-link class="topic-title" 
                    tag="div"
                    to="{ path: 'topic', params: {id: item.topic.id} }">

                    话题：{{item.topic.title}}
                </router-link>
            </div>
            <div class="no-data" v-show="noData">
                暂无数据!
            </div>
        </div>
     </div>
</template>
<script>
    import bus from '../libs/bus'

    export default {
        components: {
            "nvHead": require('../components/header.vue')
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
        created () {
            bus.$on('open-menu-header', this.openMenu);
            bus.$on('hide-menu-header', this.hideMenu);

            this.$http.get(`messages/?accesstoken=${localStorage.token}`).then(res => {

                this.message = res.data.data;

                if (this.message.hasnot_read_messages.length > 0) {
                    this.currentData = this.message.hasnot_read_messages;
                }
                else {
                    this.currentData = this.message.has_read_messages;
                    this.selectItem = 2;
                }

                this.noData = this.currentData.length === 0 ? true : false;
            });
        },
        beforeDestroy () {
            bus.$off('open-menu-header', this.openMenu);
            bus.$off('hide-menu-header', this.hideMenu);
        },
        methods:{
            openMenu () {
                this.showMenu = true;
            },
            hideMenu () {
                this.showMenu = false;
            },
            changeTab (idx) {
                this.selectItem = idx;
                this.currentData = idx ===1 ? this.message.hasnot_read_messages : this.message.has_read_messages;
                this.noData = this.currentData.length === 0 ? true : false;
            },
            markall () {
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
