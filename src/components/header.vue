<template>
    <header :class="['fix-header', {'show':showMenu}]" id="hd">
        <div class="nv-toolbar">
            <div class="toolbar-nav" @click="openMenu"></div>
            <span>{{ pageType }}</span>
        </div>
    </header>

    <!-- menu component -->
    <nv-menu :show-menu.sync="showMenu"></nv-menu>

    <!-- mask layer -->
    <div class="page-cover"
         v-if="showMenu"
         @click="closeMenu">
    </div>
</template>

<script>
    export default {
        props: ['pageType','showMenu'],
        methods: {
            openMenu () {
                $('html').addClass("scroll-hide");
                this.showMenu = true;
            },
            closeMenu () {
                $('html').removeClass("scroll-hide");
                this.showMenu = false;
            }
        },
        // events: {
        //     'close-menu': () => {
        //         this.showMenu = false;
        //     }        
        // },
        components: {
            'nv-menu': require('./menu.vue')
        }
    }
</script>
