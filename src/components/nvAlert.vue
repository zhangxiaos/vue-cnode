<template>
    <div id="wxAlert" class="wx_loading" v-show="show">
        <div class="wx_alert_inner" id="wx_alert_inner" v-text="content"></div>
    </div>
</template>

<script>
    export default {
        props: ['content', 'show']
    }
</script>

<style>
.wx_loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    text-align: center;
    background-color: rgba(0, 0, 0, .5);
}
.wx_loading .wx_alert_inner {
    display: inline-block;
    margin: 80% auto 0;
    padding: 20px 25px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 5px;
    background-color: rgba(49, 49, 49, 0.8);
}
</style>