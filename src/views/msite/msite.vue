<template>
  <van-swipe :loop="false" :width="300">
    <van-swipe-item>
      <van-row type="flex" justify="space-around">
        <van-col span="6">
          <div>

          </div>
        </van-col>
      </van-row>
    </van-swipe-item>
    <van-swipe-item>

    </van-swipe-item>
  </van-swipe>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SelectCityModule } from '@/store/modules/city'

@Component
export default class Carousel extends Vue {
  private geohash: any
  private msiteTitle: string = '请选择地址...' // msite页面头部标题

  private hasGetData: boolean = false //是否已经获取地理位置数据，成功之后再获取商铺列表信息

  beforeMount() {
    if (!this.$route.query.geohash) {
      this.getCurrentCity()
    } else {
      this.geohash = this.$route.query.geohash
    }
    SelectCityModule.setGeohash(this.geohash)
    this.msiteAddress()

    this.hasGetData = true
  }

  private getCurrentCity() {
    this.$get('/v1/cities', { type: 'guess' }).then((res: any) => {
      this.geohash = res.data.latitude + ',' + res.data.longitude
    })
  }

  private msiteAddress() {
    this.$get('/v2/pois/' + this.geohash).then((res: any) => {
      this.msiteTitle = res.name
      SelectCityModule.setAddress(res)
    })
  }
}
</script>
<style lang="scss">
@import '../../style/mixin';
</style>