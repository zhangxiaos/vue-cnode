<template>
    <header-component :page-type="params.tab | getTitleStr"
        :show-menu.sync="showMenu"></header-component>
    
    <section id="page">
        <ul class="posts-list">
            <li v-for="item in topics"
                v-link="{path: '/topic/' + item.id}">

                <h3 v-text="item.title"
                    :class="item.tab | getTabClassName item.good item.top"
                    :title="item.tab | getTabStr item.good item.top"></h3>

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
                            <time>{{ item.create_at | getLastTimeStr true }}</time>
                            <time>{{ item.last_reply_at | getLastTimeStr true }}</time>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </section>

    <go-back-component></go-back-component>
    <loading :show-loading="showLD"></loading>
</template>

<script>
    import headerComponent from 'components/header'
    import goBackComponent from 'components/backtotop'
    import loading from 'components/loading'

    export default {
        components: {
            headerComponent,
            goBackComponent,
            loading
        },
        data () {
            return {
                showMenu: true,
                scroll: true,
                topics: [],
                params: {
                    page: 1,
                    limit: 20,
                    tab: 'all',
                    mdrender: true
                }
            }
        },
        route: {
            data (transition) {
                let tab   = transition.to.query || 'all';

                if (sessionStorage.params && transition.from.name === "topic" && sessionStorage.tab == tab) {
                    this.topics = JSON.parse(sessionStorage.topics);
                    this.params = JSON.parse(sessionStorage.params);
                    this.$nextTick(() => $(window).scrollTop(sessionStorage.scrollTop));
                }
                else {
                    this.params.tab = tab;
                    this.getTopics();
                }

                this.showMenu = false;

                $(window).on('scroll', () => {
                    this.getScrollData();
                });

            },
            deactivate (transition) {
                $(window).off('scroll');

                if (transition.to.name === 'topic') {
                    sessionStorage.scrollTop = $(window).scrollTop();
                    sessionStorage.topics = JSON.stringify(this.topics);
                    sessionStorage.params = JSON.stringify(this.params);
                    sessionStorage.tab = transition.from.query.tab || 'all';
                }
                else {
                    sessionStorage.removeItem('topics');
                    sessionStorage.removeItem('params');
                    sessionStorage.removeItem('tab');
                }

                transition.next();
            }
        },
        methods:{
            getTopics () {                
                this.$http.get('topics', {params: this.params}).then(res => {
                    this.scroll = true;
                    this.showLD = false;
                    
                    this.$set('topics', res.data.data);
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
            }
        }
    }
</script>
