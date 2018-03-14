<template>
  <div class="search-box">
    <input class="box" :placeholder="placeholder" v-model="query">
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods:{
    setQuery(query) {
      this.query = query
    }
  },
  created() {
    this.$watch('query', (newQuery) => {
      this.$emit('query', newQuery)
    })
  }
}
</script>

<style scoped lang="scss">
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background: #333;
  border-radius: 6px;
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: #333;
    color: #fff;
    font-size: 14px;
    outline: 0;
    border: 0;
  }
}
</style>

