<template>
    <div>
        <header-component page-type="关于" fix-head="true" :need-add="true" ></header-component>
        
        <dl class="about-info">
            <dt>关于项目</dt>
            <dd>采用vue框架重写的cnode</dd>
            <dt>源码地址</dt>
            <dd>
                <a href="https://github.com/zhangxiaos/vue-cnode">https://github.com/zhangxiaos/vue-cnode</a>
            </dd>
            <dt>当前版本</dt>
            <dd>V1.0</dd>
        </dl>
    </div>
</template>

<script>
    import headerComponent from 'components/header'

    export default {
        components:{
            headerComponent
        }
    }
</script>