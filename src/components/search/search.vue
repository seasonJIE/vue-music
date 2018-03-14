<template>
	<div class="search">
		<div class="search-box-wrapper">
			<search-box ref="searchBox" @query="onQueryChange"></search-box>
		</div>
		<div class="shortcut-wrapper" v-show="!query">
			<div class="shortcut">
				<div class="hot-key">
					<h1 class="title">热门搜索</h1>
					<ul>
						<li class="item" v-for="item in hotkey" @click="addQuery(item.k)">
							<span v-text="item.k"></span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		 <div class="search-result" v-show="query">
			<suggest :query="query"></suggest>
		</div>
		<!--<div class="confirm"></div> -->
	</div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import { getHotKey } from 'api/search.js'
import { ERR_OK } from 'api/config'
import Suggest from 'components/suggest/suggest';
export default {
	created() {
		this._getHotKey()
	},
	data() {
		return {
			hotkey:[],
			query:''
		}
	},
	methods: {
		addQuery(query){
			this.$refs.searchBox.setQuery(query)
		},
		onQueryChange(query) {
			this.query = query
		},
		_getHotKey() {
			getHotKey().then((res) => {
				if (res.code === ERR_OK) {
					this.hotkey = res.data.hotkey.slice(0,10)
				}
			})
		}
	},
	components: {
		SearchBox,
		Suggest
	}
}
</script>

<style lang="scss" scoped>
.search-box-wrapper {
  margin: 20px;
}
.shortcut-wrapper {
  position: fixed;
  top: 120px;
  bottom: 0;
  width: 100%;
	text-align: left;
  .shortcut {
    height: 100%;
    overflow: hidden;
    .hot-key {
      margin: 0 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.5);
      }
      .item {
        display: inline-block;
        padding: 5px 10px;
        margin: 0 20px 10px 0;
        border-radius: 6px;
        background: #333;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.3);
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.5);
        .text {
          flex: 1;
        }
        .clear {
          position: relative;
        }
      }
    }
  }
}
.search-result {
  position: fixed;
  width: 100%;
  top: 120px;
  bottom: 0;
  text-align: left;
}
.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.3);
  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    .confirm-content {
      width: 270px;
      border-radius: 13px;
      background: #333;
      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: 18px;
        color: hsla(0, 0%, 100%, 0.5);
      }
      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: 18px;
        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.3);
          color: hsla(0, 0%, 100%, 0.3);
        }
      }
    }
  }
}
</style>