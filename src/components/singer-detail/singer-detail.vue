<template>
	<transition name="slide">
		<music-list class="singer-detail-router" :songs="songs" :title="title" :bgImage="bgImage"></music-list>
	</transition>
	
</template>

<script>
	import {mapGetters} from 'vuex'
	import {getSingerDetail,getSongVkey} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import {createSong} from 'common/js/song'
	import MusicList from 'components/music-list/music-list'
	export default {
		data(){
			return {
				songs:[]
			}
		},
		computed:{
			title(){
				return this.singer.name
			},
			bgImage(){
				return this.singer.avatar
			},
			...mapGetters([
				'singer'
			])
		},
		created() {
			this._getDetail()
		},
		methods:{
			_getDetail(){
				if(!this.singer.id){
					this.$router.push('/singer')
					return
				}
				getSingerDetail(this.singer.id).then((res)=>{
					if(res.code === ERR_OK) {
						this.songs = this._normalizeSongs(res.data.list)
						console.log(res.data.list)
					}
				})
			},
			_normalizeSongs(list){
				let ret = []
				list.forEach((item)=>{
					let {musicData} = item
					if(musicData.songid && musicData.albummid) {
						getSongVkey(musicData).then(res=>{
							let resdata = JSON.stringify(res)
							console.log(resdata)
						})
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		components:{
			MusicList
		}
	}
</script>

<style scoped lang="scss">
	.singer-detail-router {
		position: fixed;
		z-index: 100;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: #2C3E50;
	}
	.slide-enter-active,.slide-leave-active {
		transition: 0.3s;
	}
	.slide-leave-to,.slide-enter {
		transform: translate3d(100%,0,0);
	}
</style>