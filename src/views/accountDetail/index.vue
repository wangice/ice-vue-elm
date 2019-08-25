<template>
  <div>
    <div class="account-detail-header">
      <div class="account-detail-header-img">
        <van-icon name="balance-o" size="30px" />
      </div>
      <div class="account-detail-header-name">
        <span>二维码收款</span>
      </div>
      <div class="account-detail-header-money">
        <span>600</span>
      </div>
    </div>
    <div class="account-detail-content">
      <van-row type="flex" justify="space-around">
        <van-col span="6">当前状态</van-col>
        <van-col span="18">已收款</van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="6">收款时间</van-col>
        <van-col span="18">2019-06-25 16:18:30</van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="6">转账单号</van-col>
        <van-col span="18">213213123123123123123123123123</van-col>
      </van-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Account extends Vue {}
</script>
<style lang="scss" scoped>
.account-detail-header {
  width: 100%;
  text-align: center;
  height: 20vh;
  .account-detail-header-img {
    margin-top: 8vh;
  }
}
.account-detail-content {
  border-top: solid;
  border-width: 0.5px;
  border-color: darkgray;
  text-align: left;
  margin-left: 15px;
  .van-row {
    margin-top: 2vh;
  }
}
</style>

