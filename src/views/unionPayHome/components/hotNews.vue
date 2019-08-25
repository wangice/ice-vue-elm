<template>
  <van-panel :title="newTitle" class="news">
    <div class="news-img">
      <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2030621752,493134360&fm=26&gp=0.jpg">
    </div>
  </van-panel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HotNews extends Vue {
  private newTitle: string = '热门资讯'
}
</script>
<style lang="scss" scoped>
.news {
  height: 26vh;
  width: 100%;
  .news-img {
    border-style: solid;
    border-width: 1px;
    margin: 0 10px 0 10px;
    img{
        width: 100%;
        height: 20vh;
    }
  }
}
</style>
