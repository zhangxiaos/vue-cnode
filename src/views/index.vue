<template>
	<div class="home-logo">
		<img src="../assets/images/logo.png">
	</div>
</template>

<script>
	export default {
		mounted () {
            this.$nextTick(() => {
            	window.setTimeout(() => {
            		this.$router.push('/list');
            	}, 1000);
            });
        }
	}
</script>

<style>
	.home-logo {
        text-align: center;
    }
    .home-logo img {
        margin-top: 50%;
    }
</style>