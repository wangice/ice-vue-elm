<template>
  <div class="city">
    <van-nav-bar left-text="ele.me" right-text="登录|注册" @click-right='$router.push("/login")' />

    <div class="city-nav">
      <div class="city-msg">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>

      <div class="city-location" @click='guessLocation'>
        <span>{{guessCity}}</span>
        <van-icon name="arrow" size="18"></van-icon>
      </div>
    </div>

    <section class="hot_city_container">
      <div class="city_title">热门城市</div>
      <ul class="hot_city_list clear">
        <router-link tag="li" v-for="(item,index) in hotcity" :key="index" :to="{path:'/city',query:{id:item.id}}">
          {{item.name}}
        </router-link>
        <div style="clear:both;"></div>
      </ul>
    </section>

    <!--分组-->
    <section class="group_city_container">
      <ul class="letter_classify">
        <li v-for="(value,key,index1) in groupCity" :key="key" class="group_city_item">
          <div class="item_city_title">{{key}} <span v-if="index1 == 0">（按字母排序）</span></div>
          <ul class="group_city_list">
            <router-link tag="li" v-for="(item,ind) in value" :key="ind" :to="{path:'/city',query:{id:item.id}}">
              {{item.name}}
            </router-link>
            <div style="clear:both;"></div>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  private guessCityId: number = 0
  private guessCity: string = ''

  private hotcity: string[] = []

  private groupCity: any = {}

  //跳入city界面
  private guessLocation() {
    this.$router.push({
      path: '/city',
      query: { id: this.guessCityId + '', city: this.guessCity }
    })
  }

  private created() {
    this.getCurrentCity()
    this.getHotcity()
    this.getGroupCity()
  }

  //获取热门城市
  private getHotcity() {
    this.$get('/v1/cities', { type: 'hot' }).then((res: any) => {
      this.hotcity = res.data
    })
  }
  //获取当前城市
  private getCurrentCity() {
    this.$get('/v1/cities', { type: 'guess' }).then((res: any) => {
      this.guessCity = res.data.name
      this.guessCityId = res.data.id
    })
  }

  //获取所有城市列表
  private getGroupCity() {
    this.$get('/v1/cities', { type: 'group' }).then((res: any) => {
      let citys = res.data

      //将获取的数据按照A-Z字母开头排序
      for (let i = 65; i <= 90; i++) {
        if (citys[String.fromCharCode(i)]) {
          this.groupCity[String.fromCharCode(i)] = citys[String.fromCharCode(i)]
        }
      }
      console.log(this.groupCity)
    })
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
    .van-nav-bar__text {
      @include sc(1rem, white);
    }
  }

  .city-nav {
    margin-top: 0.8rem;
    background-color: #fff;
    border-bottom: 0.4rem solid #f5f5f5;
    .city-msg {
      padding-top: 0.4rem;
      line-height: 1.45rem;
      height: 1.45rem;
      padding: 0 0.45rem 0.2rem 0.45rem;
      text-align: center;
      border-bottom: 1px solid $bc;
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
      padding: 0 0.45rem 0.2rem 0.45rem;
      height: 1.8rem;
      span:nth-of-type(1) {
        float: left;
        @include sc(1rem, $blue);
      }
      i:nth-of-type(1) {
        float: right;
        padding-top: 0.4rem;
      }
    }
  }
  .hot_city_container {
    border-top: 1px solid $bc;
    background-color: #fff;
    .city_title {
      line-height: 1.45rem;
      height: 1.45rem;
      @include sc(0.45rem, #666);
      border-bottom: 1px solid $bc;
      padding: 0 0.45rem 0.4rem 0.45rem;
    }
    .hot_city_list {
      li {
        float: left;
        text-align: center;
        color: #3190e8;
        border-bottom: 0.025rem solid #e4e4e4;
        border-right: 0.025rem solid #e4e4e4;
        width: 24.89%;
        height: 2.4rem;
        line-height: 2.4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .group_city_container {
       border-top: 0.4rem solid #f5f5f5;
    .letter_classify {
      .group_city_item {
        margin-bottom: 0.4rem;
        background-color: #fff;
        border-bottom: 0.4rem solid #f5f5f5;
        .item_city_title {
          line-height: 1.45rem;
          height: 1.45rem;
          @include sc(0.45rem, #666);
          border-bottom: 1px solid $bc;
          padding: 0 0.45rem 0.4rem 0.45rem;
        }
        .group_city_list {
          li {
            float: left;
            text-align: center;
            color: #3190e8;
            border-bottom: 0.025rem solid #e4e4e4;
            border-right: 0.025rem solid #e4e4e4;
            width: 24.89%;
            height: 2.4rem;
            line-height: 2.4rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            @include sc(0.4rem, #666);
          }
        }
      }
    }
  }
}
</style>
