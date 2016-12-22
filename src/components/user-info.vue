<template>
    <div class="user-info">
        <!-- 未登录 -->
        <ul class="login-no" v-if="!loginname">
            <li class="login" @click="goLogin"><i class="iconfont icon-peoplefill"></i><a>登录</a></li>
        </ul>
        <!-- 已登录 -->
        <div class="login-yes" v-if="loginname">

            <div  class="avertar">
                <router-link v-if="avatar_url" :src="avatar_url" tag="img" :to="'/user/' + loginname"></router-link>
            </div>

            <div class="info">
                <p v-if="loginname">{{ loginname }}</p>
            </div>
            <router-link to="/login" class="iconfont icon-pullright"></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                loginname: localStorage.loginname || "",
                avatar_url: localStorage.avatar_url || ""
            }
        },
        methods: {
            goLogin () {
                var url = '/login?redirect=' + encodeURIComponent(this.$route.path);
                this.$router.push(url);
            }
        }
    }
</script>
