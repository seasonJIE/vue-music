<template>
  <div class="player" v-show="playlist.length>0">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i>返回</i>
          </div>
          <h1 class="title" v-text="currentSong.name"></h1>
          <h2 class="subtitle" v-text="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd play" :class="{pause:!playing}">
                <img :src="currentSong.image">
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">123</div>
            </div>
          </div>
          <div class="middle-r"></div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot active"></span>
            <span class="dot"></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l" v-text="format(currentTime)"></span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange" ></progress-bar>
            </div>
            <span class="time time-r" v-text="format(currentSong.duration)"></span>
          </div>
          <div class="operators">
            <div class="icon i-left">循环</div>
            <div @click="prev" class="icon i-left">
              <<</div>
                <div @click="togglePlaying" class="icon i-center" v-text="playIcon"></div>
                <div  @click="next" class="icon i-right">>></div>
                <div class="icon i-right">收藏</div>
            </div>
          </div>
        </div>
    </transition>
    <transition name="mini">
      <div class="min-player" v-show="!fullScreen" @click="open">
        <div class="icon">
          <div class="imgWrapper">
            <img class="play" :class="{pause:!playing}" width="40" height="40" :src="currentSong.image">
          </div>
        </div>
        <div class="text">
          <h2 class="name" v-text="currentSong.name"></h2>
          <p class="desc" v-text="currentSong.singer"></p>
        </div>
        <div @click.stop="togglePlaying" class="control" v-text="playIcon"></div>
        <div class="control">列表</div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import ProgressBar from 'base/progress-bar/progress-bar'
export default {
  data(){
    return {
      songReady:false,
      currentTime:0
    }
  },
  computed: {
    playIcon() {
      return this.playing ? 'stop' : 'go'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    ...mapGetters(['fullScreen', 'playlist', 'currentSong',
      'playing','currentIndex'
    ])
  },
  methods: {
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    enter(el, done) {
      const { x, y, scale } = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0 ) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }

      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 500,
          esing: 'liner'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cdWrapper.style.transition = 'all 0.5s'
      const { x, y, scale } = this._getPosAndScale()
      this.$refs.cdWrapper.style.transform = `translate3d(${x}px,${y}px,0 ) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave() {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style.transform = ''
    },
    togglePlaying() {
      // if(!this.songReady){
      //   return
      // }
      this.setPlayingState(!this.playing)
    },
    prev() {
      // if(!this.songReady){
      //   return
      // }
      let index = this.currentIndex - 1
      if(index == -1) {
        index = this.playlist.length - 1
      }
      this.setCurrentIndex(index)
      if(!this.playing){
        this.togglePlaying()
      }
      // this.songReady = false
    },
    next() {
      // if(!this.songReady){
      //   return
      // }
      let index = this.currentIndex + 1
      if(index == this.playlist.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      if(!this.playing){
        this.togglePlaying()
      }
      // this.songReady = false
    },
    ready() {
      this.songReady = true
    },
    error() {
      this.songReady = true
    },
    updateTime(e){
      this.currentTime = e.target.currentTime
    },
    format(interval) {
      interval = interval | 0
      const minute = this._pad(interval / 60 | 0)
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    onProgressBarChange(percent) {
      this.$refs.audio.currentTime = this.currentSong.duration * percent
      if(!this.playing){
        this.togglePlaying()
      }
    },
    _pad(num , n = 2) {
      let len = num.toString().length
      while(len<n) {
        num = '0' + num
        len ++
      }
      return num
    },
    _getPosAndScale() {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x, y, scale
      }
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex:'SET_CURRENT_INDEX'
    })
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.volume = 0.1
        this.$refs.audio.play()
      })
    },
    playing(newPlaying) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause()
      })

    }
  },
  components:{
    ProgressBar
  }
};
</script>

<style scoped lang="scss">
.player {
  .normal-player {
    z-index: 101;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #222;
    color: #fff;

    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(10px);
    }
    .top {
      position: relative;
      margin-bottom: 25px;
      .back {
        position: absolute;
        top: 10px;
        left: 6px;
        z-index: 50;
      }
      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
        color: #fff;
      }
      .subtitle {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          box-sizing: border-box;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 50%;
              border: 10px solid hsla(0, 0%, 100%, 0.1);
            }
          }
        }
        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0;
          overflow: hidden;
          text-align: center;
          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: hsla(0, 0%, 100%, 0.5);
          }
        }
      }
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: hsla(0, 0%, 100%, 0.5);
            font-size: 14px;
          }
          .pure-music {
            padding-top: 50%;
            line-height: 32px;
            color: hsla(0, 0%, 100%, 0.5);
            font-size: 14px;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: hsla(0, 0%, 100%, 0.5);
        }
      }
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 80%;
        margin: 0 auto;
        padding: 10px 0;
        .time {
          color: #fff;
          font-size: 12px;
          -ms-flex: 0 0 30px;
          flex: 0 0 30px;
          line-height: 30px;
          width: 30px;
          &.time-r {
            text-align: right;
          }
          &.time-l {
            text-align: left;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
          
        }
      }
      .operators {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: #ffcd32;
          height: 40px;
          width: 40px;
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.5s;
      .top,
      .bottom {
        transition: all 0.5s cubic-bezier(0.89, 0.4, 0.3, 1.3);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .min-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: #333;
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.5s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }
    .icon {
      flex: 0 0 40px;
      width: 40px;
      height: 40px;
      padding: 0 10px 0 20px;
      .imgWrapper {
        height: 100%;
        width: 100%;
        img {
          border-radius: 50%;
          &.play {
            animation: rotate 20s linear infinite;
          }
          &.pause {
            animation-play-state: paused;
          }
        }
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: left;
      flex: 1;
      line-height: 20px;
      overflow: hidden;
      .name {
        margin-bottom: 2px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 14px;
        color: #fff;
      }
      .desc {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 12px;
        color: hsla(0, 0%, 100%, 0.3);
      }
    }
    .control {
      flex: 0 0 30px;
      width: 30px;
      padding: 0 10px;
      color: rgba(255, 205, 49, 0.5);
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>