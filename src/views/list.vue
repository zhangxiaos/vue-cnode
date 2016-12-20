<template>
    <div>
        <header-component :page-type="getTitleStr(params.tab)"
            :show-menu="showMenu"></header-component>
        
        <section id="page" ref="page">
            <ul class="posts-list">
                <router-link 
                    tag="li"
                    v-for="item in topics"
                    :to="'/topic/' + item.id">

                    <h3 v-text="item.title"
                        :class="getTabClassName(item.tab, item.good, item.top)"
                        :title="getTabStr(item.tab, item.good, item.top)"></h3>

                    <div class="content">
                        <img class="avatar" :src="item.author.avatar_url" />
                        <div class="info">
                            <p>
                                <span class="name">{{ item.author.loginname }}</span>
                                <span class="status" v-if="item.reply_count > 0">
                                    <b>{{ item.reply_count }}</b> / {{ item.visit_count }}
                                </span>
                            </p>
                            <p>
                                <time>{{ item.create_at | getLastTimeStr(true) }}</time>
                                <time>{{ item.last_reply_at | getLastTimeStr(true) }}</time>
                            </p>
                        </div>
                    </div>
                </router-link>
            </ul>
        </section>

        <go-back-component></go-back-component>
        <loading :show-loading="showLD"></loading>
    </div>
</template>

<script>
    import headerComponent from 'components/header'
    import goBackComponent from 'components/backtotop'
    import loading from 'components/loading'
    import bus from '../libs/bus'

    export default {
        components: {
            headerComponent,
            goBackComponent,
            loading
        },
        data () {
            return {
                showMenu: false,
                scroll: true,
                showLD: true,
                topics: [],
                params: {
                    page: 1,
                    limit: 20,
                    tab: 'all',
                    mdrender: true
                }
            }
        },
        watch: {
            '$route': 'getTopics'
          },
        created () {
            bus.$on('hide-menu-header', this.hideMenu);
            bus.$on('open-menu-header', this.openMenu);

            if (sessionStorage.topics && sessionStorage.params) {
                this.topics = JSON.parse(sessionStorage.topics);
                this.params = JSON.parse(sessionStorage.params);
                this.showLD = false;
            }
            else {
                this.getTopics();
            }
        },
        mounted () {
            this.$nextTick(() => {
                $(window).on('scroll', () => {
                    this.getScrollData();
                });
            });
        },
        beforeDestroy () {
            bus.$off('hide-menu-header', this.hideMenu);
            bus.$off('open-menu-header', this.openMenu);
            $('window').off('scroll');
        },
        beforeRouteLeave (to, from, next) {
            sessionStorage.removeItem('topics');
            sessionStorage.removeItem('params');

            if (to.name === 'topic') {
                sessionStorage.topics = JSON.stringify(this.topics);
                sessionStorage.params = JSON.stringify(this.params);
                next();
            }
        },
        methods: {
            openMenu () {
                this.showMenu = true;
            },
            hideMenu () {
                this.showMenu = false;
            },
            getTopics () { 
                this.params.tab = this.$route.query.tab || 'all';
                
                this.$http.get('topics', {params: this.params}).then(res => {
                    this.scroll = true;
                    this.showLD = false;
                    this.topics = res.data.data;
                });
            },
            getScrollData () {
                if (this.scroll) { 
                    let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());

                    if ($(document).height() <= totalheight + 200) {
                        this.scroll = false;
                        this.params.limit += 20;
                        this.getTopics();
                    }
                }
            },
            getTitleStr (tab) {
                let str = '';
                switch (tab) {
                    case 'share':
                        str = '分享';
                        break;
                    case 'ask':
                        str = '问答';
                        break;
                    case 'job':
                        str = '招聘';
                        break;
                    case 'good':
                        str = '精华';
                        break;
                    default:
                        str = '全部';
                        break;
                }
                return str;
            },
            getTabClassName (tab, good, top) {
                let className = '';

                if (top) {
                    className = 'top';
                } else if (good) {
                    className = 'good';
                } else {
                    switch (tab) {
                        case 'share':
                            className = 'share';
                            break;
                        case 'ask':
                            className = 'ask';
                            break;
                        case 'job':
                            className = 'job';
                            break;
                        default:
                            className = 'default';
                            break;
                    }
                }
                return className;
            },
            getTabStr (tab, good, top) {
                let str = '';
                if (top) {
                    str = '置顶';
                } else if (good) {
                    str = '精华';
                } else {
                    switch (tab) {
                        case 'share':
                            str = '分享';
                            break;
                        case 'ask':
                            str = '问答';
                            break;
                        case 'job':
                            str = '招聘';
                            break;
                        default:
                            str = '暂无';
                            break;
                    }
                }
                return str;
            }
        }
    }
</script>
