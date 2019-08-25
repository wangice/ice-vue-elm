<template>
  <div class="hello">
    <van-tabbar v-model="active" safe-area-inset-bottom @change='(index) => {
        active = index
      }' active-color='black'>
    <van-tabbar-item @click='$router.push("/")'>
      <span>抢单</span>
      <img
        slot="icon"
        slot-scope="props"
        :src='"../assets/commonPic/抢单图标.png"'
      >
    </van-tabbar-item>
    <van-tabbar-item @click='$router.push("/mine")'>
      <span>我的</span>
      <img
        slot="icon"
        slot-scope="props"
        :src='"../assets/commonPic/我的.png"'
      >
    </van-tabbar-item>
    <!-- <van-tabbar-item icon="search">我的</van-tabbar-item> -->
  </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class PublicTabbar extends Vue {
  private active: number = 0;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
