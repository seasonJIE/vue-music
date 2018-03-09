<template>
	<div class="loading">
		<img src="./loading.png" />
		<p>{{title}}</p>
	</div>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'正在加载...'
			}
		}
	}
</script>

<style scoped lang="scss">
	.loading {
		width: 100%;
		text-align: center;
		
		img {
			height: 34px;
			width: 34px;
			animation:rotate 500ms linear infinite;
		}
	}
	@keyframes rotate{
		to{
			transform: rotate(360deg);
		}
	}
</style>