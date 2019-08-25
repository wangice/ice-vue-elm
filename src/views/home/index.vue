<template>
    <div class="city">
        <van-nav-bar left-text="ele.me" right-text="登录|注册" @click-right='$router.push("/login")' />

        <nav class="city-nav">
            <div class="city-msg">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>

            <div class="city-location" @click='guessLocation'>
                <span>{{guessCity}}</span>
                <van-icon name="arrow" size="24"></van-icon>
            </div>
        </nav>

        <div class="hot_city_container">
            <h4 class="city_title">热门城市</h4>
            <ul class="hot_city_list">
                <router-link tag="li" v-for="(item,index) in hotcity" :key="index" :to="{path:'/city',query:{id:item.id}}">
                    {{item.name}}
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class City extends Vue {
    private guessCityId:number=0
    private guessCity:string=""

    private hotcity:string[]=[];

    //跳入city界面
    private guessLocation(){
        this.$router.push({ path: '/city', query: { id: this.guessCityId+"",city:this.guessCity}})
    }

    private mounted(){
        this.getHotcity();
    }

    //获取热门城市
    private getHotcity(){
        this.$post('/v1/cities',{type:"hot"}).then((res: any) => {
            this.hotcity = res.data.data
        });
    }
    //获取当前城市
    private getCurrentCity(){
         this.$post('/v1/cities',{type:"guess"}).then((res: any) => {
           console.log(res.data)
        });
    }

    //获取所有城市列表
    private getGroupCity(){
         this.$post('/v1/cities',{type:"group"}).then((res: any) => {
           console.log(res.data)
        });
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';

.city {
  .van-nav-bar {
    background-color: #3b95e9;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
    .van-nav-bar__text{
        @include sc(1rem, white);
    }
    
  }
  .city-nav {
    border-top: 1px solid $bc;
    margin-top: 2.35rem;
    margin-bottom: 0.4rem;
    background-color: #fff;
    .city-msg {
      line-height: 1.45rem;
      padding: 0 0.45rem;
      text-align: center;
      span:nth-of-type(1) {
        float: left;
        @include sc(0.55rem, #666);
      }
      span:nth-of-type(2) {
        float: right;
        @include sc(0.45rem, #9f9f9f);
      }
    }
    .city-location {
      line-height: 1.8rem;
      padding: 0 0.45rem;
      text-align: center;
      border-top: 1px solid $bc;
      span:nth-of-type(1) {
        float: left;
        @include sc(0.55rem, $blue);
      }
      span:nth-of-type(1) {
        float: right;
      }
    }
  }
  .city_title {
    color: #666;
    font-weight: 400;
    text-indent: 0.45rem;
    border-top: 2px solid $bc;
    border-bottom: 1px solid $bc;
  }
  .hot_city_container {
    background-color: #fff;
    margin-bottom: 0.4rem;
    .hot_city_title {
    }
  }
}
</style>
