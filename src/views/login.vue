<template>
    <div>
        <nv-head page-type="登录"></nv-head>
        <section class="page-body">
            <div class="label">
                <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
            </div>
            <div class="label mt50">
                <a class="button" @click="login">登录</a>
            </div>
        </section>
        <nv-alert :content="alert.txt" :show="alert.show"></nv-alert>
    </div>
</template>

<script>
    export default {
        components: {
            'nvHead': require('components/header.vue'),
            'nvAlert': require('components/nvAlert.vue')
        },
        data () {
            let self = this;
            return {
                token: '',
                alert: {
                    txt: '',
                    show: false,
                    hideFn: function(){
                        let timer;
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            self.alert.show = false;
                        }, 1000);
                    }
                }
            }
        },
        methods: {
            login () {
                if (this.token == '') {
                    let text = "令牌格式错误,应为36位UUID字符串";

                    this.alert.txt = text;
                    this.alert.show = true;
                    this.alert.hideFn();
                    return false;
                }

                this.$http.post('accesstoken', {
                    accesstoken: this.token
                })
                .then(res => {
                    res = res.data;

                    localStorage.loginname = res.loginname;
                    localStorage.avatar_url = res.avatar_url;
                    localStorage.userId = res.id;
                    localStorage.token = this.token;

                    let url = decodeURIComponent(this.$route.query.redirect || '/');
                    this.$router.push(url);
                })
                .catch(err => {
                    this.alert.txt = err.data.error_msg;
                    this.alert.show = true;
                    this.alert.hideFn();
                    return false;
                });
            }
        }
    }
</script>

<style>
    .page-body {
        padding: 50px 15px;
        text-align: center;
    }
    .page-body .label{
        display: inline-block;
        width: 100%;
        margin-top: 20px;
        position: relative;
        left: 0;
        top: 0;   
    }
    .page-body .label .txt{
        padding: 12px 0;
        border:none;
        border-bottom: 1px solid #4fc08d;
        background-color: transparent;
        width: 100%;
        font-size: 14px;
        color: #313131;
    }
    .page-body .label .button {
        display: inline-block;
        width: 48%;
        height: 42px;
        line-height: 42px;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        background-color: #4fc08d;
        border: none;
        border-bottom: 2px solid #3aa373;
        text-align: center;
        vertical-align: middle;
    }
    .page-body .label .button:first-child{
        margin-right: 2%;
    }
    .page-body .mt50 {
        margin-top: 50px;
    }
</style>