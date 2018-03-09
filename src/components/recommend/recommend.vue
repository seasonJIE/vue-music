<template>
	<div class="recommend">
		<scroll class="recommend-content" :data="piclist">
			<div>
				<h3>标题这是</h3>
				<ul>
					<li v-for="item in piclist">
						<img class="s_img" v-lazy="item.picUrl" />
						<span v-text="item.id"></span>
					</li>
					<li v-for="item in piclist">
						<img class="s_img" v-lazy="item.picUrl" />
						<span v-text="item.id"></span>
					</li>
				</ul>
			</div>
			<div class="loading-container" v-show="!piclist.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script>
	import { getRecommend, getDiscList } from 'api/recommend'
	import { ERR_OK } from 'api/config'
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	export default {
		mounted() {
			this._getRecommend();
			this._getDiscList();
		},
		data() {
			return {
				piclist: []
			}
		},
		methods: {
			_getRecommend() {
				getRecommend().then((res) => {
					if(res.code === ERR_OK) {
						this.piclist = res.data.slider
					}
				})
			},
			_getDiscList() {
				getDiscList().then((res) => {
					if(res.code === ERR_OK) {
						console.log(res.data.list)
					}
				})
			}
		},
		components:{
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="scss">
	li {
		padding: 10px 20px;
		height: 50px;
		list-style: none;
		text-align: left;
		border-bottom: 1px solid #ddd;
		.s_img {
			height: 50px;
			width: 50px;
		}
	}
	.recommend-content {
		height: 100%;
		width: 100%;
	}
	.loading-container {
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}
</style>