<template>
  <div class="address">
    <!--头部导航-->
    <van-nav-bar :title="address" right-text="切换城市" @click-left="$router.go(-1)" @click-right='$router.push("/home")'>
      <van-icon name="arrow-left" slot="left" size="22" color="#fff"></van-icon>
    </van-nav-bar>

    <!--输入框-->
    <div class="city_address_container">
      <van-row type="flex">
        <van-col span="1"></van-col>
        <van-col span="22">
          <input v-model="cityName" placeholder="输入学校、商务楼、家庭地址" class="city_address_field" />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="1"></van-col>
        <van-col span="22">
          <button class="city_address_summit" @click="addressSubmit">提交</button>
        </van-col>
      </van-row>
    </div>
    <!--搜索历史-->
    <div class="city_history_container">

      <header class="city_history_header" v-if="historytitle">搜索历史</header>
      <div class="city_history_list">
        <van-row v-for="(item,index) in placeList" :key="index" @click="nextpage(index,item.geohash)">
          <h4 class="city_pos_name ellipsis">{{item.name}}</h4>
          <p class="city_pos_address ellipsis">{{item.address}}</p>
        </van-row>
        <footer class="city_history_footer" v-if="historytitle&&placeList.length" @click="clearAll">清空所有</footer>
        <div class="search_none_place" v-if="placeNone">很抱歉！搜索无结果</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import publicHeader from '@/components/PublicHeader.vue'
import { getCookies, removeCookies, setCookies } from '@/util/cookies'

@Component
export default class City extends Vue {
  private address: string = '' //地址
  private placeList: any = [] //搜索结果
  private placeHistory: any = [] // 历史搜索记录
  private historytitle: boolean = true //搜索头
  private placeNone: boolean = false //搜索结果

  private cityId: any
  private cityName: string = ''
  mounted() {
    this.cityId = this.$route.query.id
    console.log('city:' + this.cityId)
    this.getCurrentCity(this.cityId)
    this.initData()
  }

  //提交信息
  private addressSubmit() {
    this.$get('/v1/pois', {
      type: 'search',
      city_id: this.cityId,
      keyword: this.cityName
    }).then((res: any) => {
      this.historytitle = false
      this.placeList = res.data
      if (this.placeList.length == 0) {
        this.placeNone = true
      }
    })
  }

  private clearAll() {
    //清空所有信息
    removeCookies('placeHistory')
    this.initData()
  }

  //获取当前城市信息
  private getCurrentCity(cityId: any) {
    this.$get('/v1/cities/' + cityId).then((res: any) => {
      this.address = res.data.name
    })
  }

  //初始化搜索历史结果
  private initData() {
    let placeCitys = getCookies('placeHistory')
    if (placeCitys) {
      this.placeList = JSON.parse(placeCitys)
    } else {
      this.placeList = []
    }
  }

  private nextpage(index: any, geohash: any) {
    let city = this.placeList[index]
    let placeCitys = getCookies('placeHistory')
    if (placeCitys) {
      this.placeHistory = JSON.parse(placeCitys)
      let check = false
      this.placeHistory.forEach((item: any) => {
        if (item.geohash == geohash) {
          check = true
        }
      })
      if (!check) {
        this.placeHistory.push(city)
      }
    } else {
      this.placeHistory.push(city)
    }
    setCookies('placeHistory', this.placeHistory)
    //进入商品首页
    this.$router.push({ path: '/msite', query: { geohash: geohash } })
  }
}
</script>
<style lang="scss">
@import '../../style/mixin';

.address {
  .van-nav-bar {
    background-color: #3b95e9;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
    .van-nav-bar__title {
      @include sc(1.3rem, white);
    }
    .van-icon-arrow-left {
      color: #666;
    }
    .van-nav-bar__left {
      left: 10px;
    }
    .van-nav-bar__right {
      .van-nav-bar__text {
        @include sc(0.8rem, white);
      }
    }
  }

  .city_address_container {
    margin-top: 1vh;
    border-top: 1.5px solid #e4e4e4;
    border-bottom: 1.5px solid #e4e4e4;
    background-color: #fff;
    .van-row {
      height: 5vh;
      line-height: 5vh;
      margin-top: 2vh;
    }
    .van-row:nth-child(2) {
      margin-bottom: 3vh;
    }
    .city_address_field {
      width: 100%;
      border: 1px solid #e4e4e4;
      height: 4.5vh;
      padding-left: 0.5rem;
      font-size: 16px;
    }
    .city_address_summit {
      width: 100%;
      height: 5vh;
      line-height: 5vh;
      padding-left: 0.5rem;
      background-color: #3b95e9;
      @include sc(0.8rem, #fff);
      border-radius: 0.1rem;
    }
  }
  .city_history_container {
    .city_history_header {
      height: 2vh;
      line-height: 2vh;
      @include sc(0.6rem, #333333);
      margin-left: 0.5rem;
      margin-top: 0.2rem;
      margin-bottom: 0.2rem;
    }
    .city_history_list {
      border-top: 1.5px solid #e4e4e4;
      background-color: #fff;
    }
    .van-row {
      border-top: 1px solid #e4e4e4;
    }
    .city_pos_name {
      margin: 0 auto 0.35rem;
      width: 90%;
      @include sc(0.9rem, #333);
      margin-top: 0.5rem;
    }
    .city_pos_address {
      width: 90%;
      margin: 0 auto 0.55rem;
      @include sc(0.45rem, #999);
    }
    .search_none_place {
      height: 5vh;
      line-height: 5vh;
      @include sc(0.8rem, #333);
      padding-left: 1rem;
    }
  }
}
</style>
