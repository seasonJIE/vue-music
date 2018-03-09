<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		props: {
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			data: {
				type: Array,
				default: null
			},
			listenScroll:{
				type:Boolean,
				default:false
			}
		},
		mounted() {
			this.$nextTick(() => {
				this._initScroll();
			})
		},
		methods: {
			_initScroll() {
				if(!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					click: this.click,
					probeType: this.probeType
				})
				
				if(this.listenScroll) {
					let _this = this
					this.scroll.on('scroll',(pos)=>{
						_this.$emit('scroll',pos)
					})
				}
			},
			enable() {
				this.scroll && this.scroll.enable();
			},
			disable() {
				this.scroll && this.scroll.disable();
			},
			refresh() {
				this.scroll && this.scroll.refresh();
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			}
		},
		watch:{
			data(){
				this.$nextTick(()=>{
					this.refresh();
				})
			}
		}

	}
</script>

<style>

</style>