<template>
  <div class="public-header">
    <van-nav-bar @click-left="clickLeft" @click-right="clickRight">
      <van-icon name="arrow-left" slot="left" v-if="$route.meta.left || false"></van-icon>
      <span slot="title">{{$route.meta.title || ''}}</span>
      <van-icon name="ellipsis" slot="right" v-if="$route.meta.right || false"></van-icon>
    </van-nav-bar>
    <!-- <van-row type="flex" justify="space-around">
      <van-col span="24">
        <span>{{$route.meta.title || ''}}</span>
      </van-col>
    </van-row> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'

@Component
export default class PublicHeader extends Vue {
  @Prop() private title?: string = ''

  clickLeft() {
    if (this.$route.meta.left) {
      let head = this.$route.meta.type
      if (head == 'receipt-code') {
        this.$router.push('/')
      }
    }
  }

  clickRight() {
    if (this.$route.meta.right) {
      let head = this.$route.meta.type
      if (head == 'receipt-code') {
        AppModule.setSheetShow(true)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.public-header {
  height: 3rem;
  background: url('../assets/login&register/顶部灰底图.png') no-repeat;
  background-size: 100% 100%;
  .van-row {
    height: 3rem;
    .van-col:last-child {
      span {
        display: inline-block;
        height: 3rem;
        width: 12rem;
        text-align: center;
        line-height: 3rem;
        position: absolute;
        left: calc(50% - 6rem);
        font-size: 1.1rem;
      }
    }
  }
}
</style>
