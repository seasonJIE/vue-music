<template>
	<div id="app">
		<tab></tab>
		<keep-alive>    <!--内置缓存组件的组件-->
			<router-view class="router"></router-view>
		</keep-alive>
		<player></player>
	</div>
</template>

<script>
	import Tab from 'components/tab/tab'
	import Player from 'components/player/player'
	export default {
		name: 'App',
		components:{
			Tab,
			Player
		}
	}
</script>

<style>
	*,html,body {
		margin: 0;
		padding: 0;
	}
	#app {
		margin: 0;
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	a {
		text-decoration: none;
	}
	.router {
		overflow: hidden;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
	}
	.recommend,.singer,.search,.rank {
		top: 44px;
	}
</style>