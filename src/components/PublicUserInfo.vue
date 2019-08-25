<template>
  <div class="public-user-info">
    <div class="join-us-content"  @click="$router.push('/mine')">
      <van-row type="flex" justify="space-around" >
        <van-col span="4">
        </van-col>
        <van-col span="20">
          <span>{{$route.meta.title}}</span>
        </van-col>
      </van-row>
    </div>
    <router-view></router-view>
    <keep-alive>
       <publicTabbar />
    </keep-alive>
    <!-- 加入我们 -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import publicTabbar from '@/components/PublicTabbar.vue' 
@Component({
  components: {
    publicTabbar
  }
})
export default class PublicUserInfo extends Vue {

}
</script>
<style lang="scss">
.public-user-info {
  .join-us-content {
    height: 3rem;
    background: url("../assets/login&register/顶部灰底图.png") no-repeat;
    background-size: 100% 100%;
    .van-row {
      height: 100%;
      .van-col:first-child {
        background: url("../assets/commonPic/左上角返回箭头.png") 50% center
          no-repeat;
        background-size: 20% 40%;
      }
      .van-col:last-child {
        span {
          display: inline-block;
          height: 3rem;
          width: 8rem;
          line-height: 3rem;
          position: absolute;
          text-align:center;
          left: calc(50% - 4rem);
          // font-family: none;
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>