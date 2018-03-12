<template>
	<div class="singer">
		<list-view @select="selectSinger" :data="singerlist" class="listview"></list-view>
		<router-view></router-view>
	</div>
</template>

<script>
	import { getSingerList } from 'api/singer'
	import { ERR_OK } from 'api/config'
	import ListView from 'base/listview/listview'
	import {mapMutations} from 'vuex'
	const HOT_NAME = '热门';
	const HOT_NUM = 10;
	export default {
		data() {
			return {
				singerlist: [],
			}
		},
		created() {
			this._getSingerList();
		},
		methods: {
			selectSinger(singer){
				this.$router.push({
					path:'/singer/'+singer.id
				})
				this.setSinger(singer)
			},
			_getSingerList() {
				getSingerList().then((res) => {
					if(res.code === ERR_OK) {
						this.singerlist = this.normalizeList(res.data.list)
					}
				})
				
			},
			normalizeList(list) {
				let map = {
					hot: {
						title: HOT_NAME,
						items: []
					}
				}
				list.forEach((item, index) => {
					if(index < HOT_NUM) {
						map.hot.items.push({
							id: item.Fsinger_mid,
							name: item.Fsinger_name,
							avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
						})
					}
					const key = item.Findex;
					if(!map[key]) {
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push({
						id: item.Fsinger_mid,
						name: item.Fsinger_name,
						avatar: 'https://y.gtimg.cn/music/photo_new/T001R300x300M000' + item.Fsinger_mid + '.jpg?max_age=2592000'
					})
				})
				//排序
				let hot = []
				let ret = []
				for(let key in map) {
					let val = map[key]
					if(val.title.match(/[a-zA-Z]/)){
						ret.push(val)
					}else if(val.title === HOT_NAME){
						hot.push(val)
					}
				}
				ret.sort((a,b)=>{
					return a.title.charCodeAt(0) - b.title.charCodeAt(0)
				})
				return hot.concat(ret)
			},
			...mapMutations({
				setSinger:'SET_SINGER'
			})
		},
		components:{
			ListView
		}
	}
</script>

<style lang="scss">
	.listview {
		height: 100%;
		width: 100%;
		text-align: left;
		img {
			width: 34px;
			height: 34px;
		}
	}
</style>