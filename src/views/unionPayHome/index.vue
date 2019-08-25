<template>
  <div class="union-home">

    <!--头部按钮-->
    <header-btn class="union-home-header"></header-btn>

    <!--账号-->
    <div class="union-home-account">
      <union-account></union-account>
    </div>
    <!--图片轮播-->
    <div class="union-home-swipe">
      <swipe-hot></swipe-hot>
    </div>

    <div class="union-home-news">
        <hot-news></hot-news>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeaderBtn from './components/headerBtn.vue'
import UnionAccount from './components/unionAccount.vue'
import SwipeHot from './components/swipeHot.vue'
import HotNews from './components/hotNews.vue'

@Component({
  components: {
    HeaderBtn,
    UnionAccount,
    SwipeHot,
    HotNews
  }
})
export default class UnionPayHome extends Vue {}
</script>
<style lang="scss" scoped>
.union-home {
  .union-home-header {
    height: 14vh;
  }
  .union-home-account {
    height: 10vh;
  }
  .union-home-news{
      height: 10vh;
  }
}
</style>