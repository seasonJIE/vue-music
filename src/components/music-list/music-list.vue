<template>
	<div class="music-list">
		<div class="back" @click="back">
			<span>返回</span>
		</div>
		<h1 v-html="title"></h1>
		<div class="bg-image" :style="bgstyle" ref="bgImage">
			<div class="play-wrapper">
				<div class="play" v-show="songs.length>0" ref="play">
					<i>！</i>
					<span>随机播放</span>
				</div>
			</div>
			<div class="filter" ref="filter"></div>
		</div>
		<div class="bg-layer" ref="layer"></div>
		<scroll @scroll="scroll" :probeType="probeType" :listenScroll="listenScroll" :data="songs" class="list" ref="list">
			<div class="song-list-wrapper">
				<song-list :songs="songs" @select="selectItem"></song-list>
			</div>
			<div class="loading-container" v-if="!songs.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import SongList from 'base/song-list/song-list'
	import Loading from 'base/loading/loading'
	import {mapActions} from 'vuex'
	const TOPTITLE_HEIGHT = 44
	export default {
		props: {
			bgImage: {
				type: String,
				default: ''
			},
			songs: {
				type: Array,
				default: []
			},
			title: {
				type: String,
				default: ''
			}
		},
		data(){
			return {
				scrollY:0	
			}
		},
		created() {
			this.probeType = 3
			this.listenScroll = true
		},
		mounted(){
			this.imageHeight = this.$refs.bgImage.clientHeight
			this.minTranslateY = -this.imageHeight + TOPTITLE_HEIGHT;
			this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
		},
		computed: {
			bgstyle() {
				return 'background-image:url(' + this.bgImage+');'
			}
		},
		methods:{
			scroll(pos){
				this.scrollY = pos.y
			},
			back(){
				this.$router.back(-1)
			},
			selectItem(item,index){
				this.selectPlay({
					list:this.songs,
					index
				})
			},
			...mapActions([
				'selectPlay'
			])
		},
		watch:{
			scrollY(newY) {
				let layerY = Math.max(this.minTranslateY,newY)
				let zIndex = 0
				let scale = 1
				this.$refs.layer.style.transform = `translate3d(0,${layerY}px,0)`
				this.$refs.layer.style['webkit-tranforms'] = `translate3d(0,${layerY}px,0)`
				const percent = Math.abs(newY / this.imageHeight)
				if(newY >0) {
					scale = 1 + percent
					zIndex = 10
				}
				else {
					let blur = Math.min(20*percent , 20)
				}
				this.$refs.filter.style['backdrop-filter'] = 'blur('+blur+'px)'
				if(newY < this.minTranslateY) {
					zIndex = 10
					this.$refs.bgImage.style.height = TOPTITLE_HEIGHT+'px'
					this.$refs.bgImage.style.paddingTop = 0
					this.$refs.play.style.display = 'none'
				}else {
					this.$refs.bgImage.style.height = 0
					this.$refs.bgImage.style.paddingTop = '70%'
					this.$refs.play.style.display = ''
				}
				this.$refs.bgImage.style.zIndex = zIndex
				this.$refs.bgImage.style.transform = `scale(${scale})`
				this.$refs.bgImage.style['webkit-tranforms'] = `scale(${scale})`
				
			}
		},
		components:{
			Scroll,
			SongList,
			Loading
		}
	}
</script>

<style scoped lang="scss">
	.back {
		z-index: 40;
		position: absolute;
		top: 0;
		display: flex;
		align-items: center;
		height: 44px;
		text-align: left;
		span {
			font-size: 20px;
			color: #fff;
		}
	}
	.loading-container {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
	}
	h1 {
		position: absolute;
		top: 0;
		left: 10%;
		z-index: 40;
		width: 80%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
		line-height: 40px;
		font-size: 18px;
		color: #fff;
	}
	
	.bg-image {
		position: relative;
	    width: 100%;
	    height: 0;
	    padding-top: 70%;
	    transform-origin: top;
	    background-size:cover;
	    .play-wrapper {
	    	z-index: 11;
	    	position: absolute;
	    	bottom: 10%;
	    	left:50%;
	    	transform:translateX(-50%);
	    	.play {
	    		padding: 2px 15px;
	    		border: 2px solid #F0AD4E;
	    		border-radius: 20px;
	    		color: #F0AD4E;
	    	}
	    }
		.filter {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(7, 17, 27, .4);
		}
	}
	.list {
		position: absolute;
	    top: 0;
	    bottom: 0;
	    width: 100%;
	    background: #222;
	}
	.bg-layer {
	    position: relative;
	    height: 100%;
	    background: #222;
	}
</style>