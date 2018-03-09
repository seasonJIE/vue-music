<template>
	<scroll class="listview" :data="data" :listenScroll="listenScroll" :probeType="probeType" ref="listview" @scroll="scroll">
		<ul>
			<li v-for="group in data" ref="listgroup">
				<h2 class="group-title" v-text="group.title"></h2>
				<ul>
					<li @click="selectitem(item)" v-for="item in group.items">
						<img v-lazy="item.avatar" />
						<span v-text="item.name"></span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li v-for="(item,index) in shortcutList" :data-index="index" :class="{'active':currentIndex===index}">{{item}}</li>
			</ul>
		</div>
		<div class="list-fixed" v-show="fixedtitle" ref="fixedtitle">
			<h2 class="group-title" v-text="fixedtitle"></h2>
		</div>
		<div class="loading-container" v-show="!data.length">
			<loading></loading>
		</div>
	</scroll>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import Loading from 'base/loading/loading'
	import { getData } from 'common/js/dom'

	const ANCHOR_HEIGHT = 20;
	const TITLE_HEIGHT = 30;
	export default {
		created() {
			this.touch = {};
			this.listenScroll = true;
			this.listHeight = [];
			this.probeType = 3;
		},
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				scrollY:-1,
				currentIndex:0,
				diff:0
			}
		},
		computed: {
			shortcutList() {
				return this.data.map((group) => {
					return group.title.substr(0, 1)
				})
			},
			fixedtitle(){
				if(this.scrollY>0){
					return
				}
				return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
			}
		},
		methods: {
			selectitem(item) {
				this.$emit('select',item)
			},
			onShortcutTouchStart(e) {
				let anchorIndex = getData(e.target, 'index');
				let firstTouch = e.touches[0]
				this.touch.y1 = firstTouch.pageY
				this.touch.anchorIndex = anchorIndex
				this._scrollTo(anchorIndex);
			},
			onShortcutTouchMove(e) {
				let firstTouch = e.touches[0]
				this.touch.y2 = firstTouch.pageY
				let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
				let anchorIndex = this.touch.anchorIndex - 0 + delta
				this._scrollTo(anchorIndex);
			},
			scroll(pos) {
				this.scrollY = pos.y
			},
			_scrollTo(index) {
				this.scrollY = -this.listHeight[index]
				this.$refs.listview.scrollToElement(this.$refs.listgroup[index], 0);
			},
			_calculateHeight() {
				this.listHeight = []
				const list = this.$refs.listgroup
				let height = 0
				this.listHeight.push(height)
				for(let i=0;i<list.length;i++) {
					let item = list[i]
					height += item.clientHeight
					this.listHeight.push(height)
				}
			}
		},
		watch:{
			data(){
				setTimeout(()=>{
					this._calculateHeight();
				},20)
			},
			scrollY(newY) {
				const listHeight = this.listHeight
				//				滚动到顶部
				if(newY > 0) {
					this.currentIndex = 0
					return
				}
				//滚动到中部
				for(let i = 0;i < listHeight.length - 1;i++){
					let height1 = listHeight[i]
					let height2 = listHeight[i+1]
					if(-newY >= height1 && -newY < height2){
						this.currentIndex = i
						this.diff = height2 + newY
						return
					}
				}
				//滚动到底部
				this.currentIndex = listHeight.length-2
			},
			diff(newVal){
				let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT)?newVal - TITLE_HEIGHT:0
				if(this.fixedTop === fixedTop){
					return
				}
				this.fixedTop = fixedTop
				this.$refs.fixedtitle.style.transform = 'translate3d(0,'+ fixedTop +'px,0)';
			}
		},
		components: {
			Scroll,
			Loading
		}
	}
</script>

<style scoped lang="scss">
	.list-shortcut {
		z-index: 1;
		position: absolute;
		right: 0px;
		top: 30px;
		width: 20px;
		background: #2C3E50;
		color: #fff;
		border-radius: 10px;
		text-align: center;
		font-size: 12px;
		li {
			height: 20px;
			list-style: none;
			&.active {
				color: #F0AD4E;
			}
		}
		
	}
	
	.loading-container {
		position: absolute;
		top: 50%;
		width: 100%;
		transform: translateY(-50%);
	}
	.list-fixed {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.group-title {
		background: #2C3E40;
		color: #fff;
		height: 30px;
		line-height: 30px;
		text-indent: 10px;
		font-size: 14px;
		font-weight: 500;
	}
</style>