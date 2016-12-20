<template>
    <div>
        <header id="hd" :class="['fix-header', {'show': showMenu}]">
            <div class="nv-toolbar">
                <div class="toolbar-nav" @click="openMenu"></div>
                <span>{{ pageType }}</span>
            </div>
        </header>

        <menu-component :show-menu="showMenu"></menu-component>

        <div class="page-cover"
             v-if="showMenu"
             @click="hideMenu">
        </div>
    </div>
</template>

<script>
    import menuComponent from './menu'
    import bus from '../libs/bus'

    export default {
        props: ['pageType', 'showMenu'],
        components: {
            menuComponent
        },
        methods: {
            openMenu () {
                bus.$emit('open-menu-header');
            },
            hideMenu () {
                bus.$emit('hide-menu-header');
            }
        }
    }
</script>
