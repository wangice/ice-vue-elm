<template>
  <van-swipe :autoplay="3000" class="swipe-hot">
    <van-swipe-item v-for="(image,index) in images" :key="index">
      <img :src="image">
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UnionAccount extends Vue {
  private images: string[] = [
    'https://img.yzcdn.cn/vant/apple-1.jpg',
    'https://img.yzcdn.cn/vant/apple-2.jpg'
  ]
}
</script>
<style lang="scss" scoped>
.swipe-hot {
  height: 26vh;
  border-style:solid;
  border-width: 1px;
  margin: 0 10px 0 10px;
  img {
    width: 100%;
    display: block;
  }
}
</style>