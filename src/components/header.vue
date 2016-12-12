<template>
    <div>
        <header id="hd" :class="['fix-header', {'show':showMenu}]">
            <div class="nv-toolbar">
                <div class="toolbar-nav" @click="showMenu = true"></div>
                <span>{{ pageType }}</span>
            </div>
        </header>

        <menu-component :show-menu.sync="showMenu"></menu-component>

        <div class="page-cover"
             v-if="showMenu"
             @click="showMenu = false">
        </div>
    </div>
</template>

<script>
    import menuComponent from './menu'

    export default {
        props: ['pageType', 'showMenu'],
        components: {
            menuComponent
        }
    }
</script>
