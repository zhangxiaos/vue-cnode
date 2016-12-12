<template>
	<div class="loading" v-show="showLoading">
		<div class="ball-wrap">
			<div class="ball"></div>
			<span class="text">loading...</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['showLoading']
	}
</script>

<style scoped>
	.loading {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 10001;
		width: 100%;
		height: 100%;
		background: #fff;
	}
	.ball-wrap {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 100px;
		height: 100px;
		text-align: center;
	}
	.ball {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 50px;
		height: 50px;
		margin: auto;
		border: 4px solid #f0f0f0;
		border-radius: 50%;
		-webkit-animation: ball .8s linear infinite;
		animation: ball .8s linear infinite;
	}
	.ball::before {
		content: '';
		position: absolute;
		right: -1px;
		top: -1px;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #ffd100;
	}
	.text {
		position: absolute;
		top: 83px;
		color: #979797;
		-webkit-transform: translate(-50%);
		transform: translate(-50%);
	}
	@keyframes ball {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
</style>
