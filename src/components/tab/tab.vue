<template>
	<div class="tab">
		<router-link to="/recommend">推荐</router-link>
		<router-link to="/singer">歌手</router-link>
		<router-link to="/rank">排行</router-link>
		<router-link to="/search">查询</router-link>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style scoped lang="scss">
	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 44px;
		background: #2C3E50;
		a {
			margin: 0 3%;
			display: block;
			width: 22%;
			text-align: center;
			color: #fff;
		}
	}
</style>