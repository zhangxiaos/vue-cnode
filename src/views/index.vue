<template>
	<div>
		<img class="home-logo" src="../assets/images/index.png">
	</div>
</template>

<script>
	import 'assets/scss/CV.scss'
    import 'assets/scss/github-markdown.css'

    export default {
    	ready () {
    		setTimeout(() => {
    			this.$route.router.go({path: '/list'});
    		}, 2000);
    	}
    }
</script>

<style>
	.home-logo {
        margin-top: 40%;
        width: 100%;
        background-color: #fff;
    }
</style>