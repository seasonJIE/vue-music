<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li v-for="item in result" class="suggest-item">
        <div class="name">
          <p class="text" v-html="_getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {filterSinger} from 'common/js/song'
const TYPE_SINGER = 'singer'
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return {
      page:1,
      result:{}
    }
  },
  methods: {
    search(){
      search(this.query,this.page,this.showSinger).then((res)=>{
        if(res.code === ERR_OK) {
          this.result = this._getResult(res.data)
        }
      })
    },
    _getResult(data) {
      let ret = []
      if(data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida,...{type:TYPE_SINGER}})
      }
      if(data.song) {
        ret = ret.concat(data.song.list)
      }
      return ret
    },
    _getDisplayName(item) {
      if(item.type === TYPE_SINGER) {
        return item.singername
      }else {
        return item.songname+','+filterSinger(item.singer)
      }
    }
  },
  watch: {
    query() {
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
.suggest {
  height: 100%;
  overflow: hidden;
  .suggest-list {
    padding: 0 30px;
    .suggest-item {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      .name {
        flex: 1;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.3);
        overflow: hidden;
        .text {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
    .no-result {
      text-align: center;
      .no-result-text {
        margin-top: 30px;
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.3);
      }
    }
  }
}
</style>
