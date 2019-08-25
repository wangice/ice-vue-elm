<template>
  <div class="account">
    <!--类型选择-->
    <div class="account-header">
      <div @click="chooseTransactionType">
        <p>全部交易类型
          <van-icon name="arrow-down" size="10" />
        </p>
      </div>
    </div>
    <div class="account-content">
      <!--时间选择-->
      <div class="account-money">
        <div class="account-choose-time" @click="chooseTime">
          <span>{{chooseDay}}</span>
          <van-icon name="arrow-down" size="10" />
        </div>
        <div>
          支出：<span class="account-expenditure">{{expenditure}}</span>
          收入：<span class="account-income">{{income}}</span>
        </div>
      </div>
      <!--订单列表-->
      <div class="account-item">
        <div class="account-item-c" v-for="(item,index) in accountList" :key="index" @click="enterAccountDetail(item.id)">
          <div class="account-item-img">
            <van-icon name="balance-o" size="30px" />
          </div>
          <div class="account-item-content">
            <div class="account-item-content-name">{{item.name}}</div>
            <div class="account-item-content-time">{{item.time}}</div>
          </div>
          <div class="account-item-money">{{item.money}}</div>
        </div>
      </div>
      <p v-show='accountList.length > 0' style="textAlign:center" @click='() => {
          pageNum++,
          getAccountList()
        }'>加载更多</p>
    </div>

    <!--交易类型上拉菜单-->
    <van-action-sheet v-model="sheetShow" :actions="actions" :overlay="false" @select="onSheetSelect" cancel-text="取消"
      @cancel="cancelSheet" />

    <van-popup v-model="popTime" position="bottom">
      <van-datetime-picker v-model="currentDate" type="year-month" :min-date="minDate" :formatter="formatter" @confirm="timeConfirm" />
    </van-popup>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ISheet } from '@/api/data'

const openSheet = [{ name: '二维码收款' }, { name: '余额提现' }]

@Component
export default class Account extends Vue {
  private expenditure: number = 100
  private income: number = 100

  private actions: ISheet[] = []
  private sheetShow: boolean = false

  private popTime: boolean = false

  private currentDate: any = new Date()

  private minDate: any = new Date()

  private chooseDay: string = '2019年8月'

  private accountList: any[] = [
    {
      id: 123456,
      name: '余额提现',
      time: '8月2日 14:15',
      money: 100
    }
  ]

  private pageNum: number = 0

  mounted() {
    this.actions = openSheet
  }

  private getAccountList() {
    //请求订单
  }

  private enterAccountDetail(id:number){
      this.$router.push('/account-detail')
  }

  private formatter(type: string, value: any) {
    if (type === 'year') {
      return `${value}年`
    } else if (type === 'month') {
      return `${value}月`
    }
    return value
  }

  private timeConfirm(value: any) {
    console.log(value)
    this.popTime = false
  }

  private chooseTime() {
    this.popTime = true
  }

  //选择交易类型
  private chooseTransactionType() {
    this.sheetShow = true
  }

  //选择上拉菜单选项
  private onSheetSelect(item: any) {
    this.$toast(item.name)
    this.sheetShow = false
  }
  //取消菜单
  private cancelSheet() {
    this.sheetShow = false
  }
}
</script>
<style lang="scss" scoped>
.account {
  .account-header {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
  .account-money {
    font-size: 14px;
  }
  .account-item {
    text-align: center;
    height: 50vh;
    margin-top: 10px;
    .account-item-c {
      border-top: solid;
      border-width: 0.5px;
      border-color: darkgray;
      margin: 0 10px 0 10px;
      .account-item-img {
        float: left;
        margin: 5px 0 0 5px;
      }
      .account-item-content {
        float: left;
        margin-left: 10px;
        .account-item-content-name {
          font-size: 16px;
        }
        .account-item-content-time {
          font-size: 12px;
          margin-top: 6px;
        }
      }
      .account-item-money {
        margin: 5px 0 0 5px;
        float: right;
      }
    }
  }
}
</style>
