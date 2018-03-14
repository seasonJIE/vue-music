<template>
	<div class="song-list">
		<ul>
			<li class="item" v-for="(song,index) in songs" @click="selectItem(song,index)">
				<div class="content">
					<h2 class="name" v-text="song.name"></h2>
					<p class="desc" v-text="getDesc(song)"></p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props:{
			songs:{
				type:Array,
				default:[]
			}
		},
		methods:{
			getDesc(song) {
				return song.singer + '-' + song.album
			},
			selectItem(item,index) {
				this.$emit('select',item,index)
			}
		}
	}
</script>

<style scoped lang="scss">
	.song-list {
		
		text-align: left;
		
		.item {
			padding: 10px;
			color: #ddd;
			font-size: 14px;
			.name {
				color: #fff;
				font-size: 16px;
			}
		}
	}
</style>