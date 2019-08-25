<template>
  <div class="charge-log">
    <div class='header'>
      <van-row type="flex" justify="space-around">
        <van-col span="6">
          充值时间
        </van-col>
        <van-col span="6">
          金额（元）
        </van-col>
        <van-col span="6">
          状态
        </van-col>
        <van-col span="6">
          操作
        </van-col>
      </van-row>
    </div>
    <div class='content' style="height:68vh;overflow-y:auto">
      <p v-show='logList.length <= 0' class='unlog-show'>
        暂无充值记录！！！
      </p>
      <van-row type="flex" justify="space-around" v-for='(item, index) in logList' :key='item + index' gutter='20'>
        <van-col span="6">
          {{item.createTimeStr}}
        </van-col>
        <van-col span="6">
          {{item.payAmount / 100}}
        </van-col>
        <van-col span="6">
          <span v-if='item.status == 0'>支付中</span>
          <span v-if='item.status == 1'>充值成功</span>
          <span v-if='item.status == 2'>已释放</span>
        </van-col>
        <van-col span="6">
          <van-button type="default" class='single-blue' v-if='item.status == 0' @click='cancelRechargeOrder(item)'>释放订单</van-button>
          <van-button type="default" class='single-withe' v-if='item.status != 0'>释放订单</van-button>
        </van-col>
      </van-row>
    </div>
    <p v-show='logList.length > 0' style="textAlign:center" @click='() => {
          pageNum++,
          getLogList()
        }'>加载更多</p>

    <van-dialog v-model="actionSingleShow" message="订单释放后，该充值单将被其他会员抢单" @confirm='confirm' show-cancel-button=true>

    </van-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class ChargeLog extends Vue {
  private actionSingleShow: boolean = false
  private rechargeId: string = ''
  private logList: any[] = []
  private pageNum: number = 1
  private pageSize: number = 10 // 页数
  // private logList: any[] = []
  mounted() {
    this.getLogList()
  }
  getLogList() {
    this.$post(
      `member/recharge/queryMemberRecharge`,
      {
        pageNumber: this.pageNum,
        pageSize: this.pageSize
      },
      { from: true }
    ).then((res: any) => {
      if (res.data.data.rows.length <= 0) {
        this.$toast('没有更多数据了')
      } else {
        this.$toast('加载成功')
        this.logList = this.logList.concat(res.data.data.rows)
      }
    })
  }
  cancelRechargeOrder(obj: any) {
    this.actionSingleShow = true
    this.rechargeId = obj.rechargeId
  }

  confirm() {
    this.$post(
      `member/recharge/cancelRecharge`,
      {
        rechargeId: this.rechargeId
      },
      { from: true }
    ).then((res: any) => {
      if (res.data.code == 0) {
        this.$toast('释放成功')
        this.pageNum = 1
        this.logList = []
        this.getLogList()
      } else {
        this.$toast('释放失败')
      }
    })
  }
}
</script>
<style lang="scss">
.charge-log {
  color: white;
  .header {
    .van-col {
      padding: 2vh 0.2vh;
      text-align: center;
    }
  }
  .content {
    .van-row {
      background: #4b4c68;
      margin-top: 1vh;
      .van-col {
        padding: 1vh 0.2vh;
        text-align: center;
        // height: 6vh;
      }
      .van-col:first-child {
        font-size: 1vh;
      }
    }
    .van-row:first-child {
      margin-top: 0vh;
    }
  }
  .single-blue {
    background-color: #00ffff;
    color: #ffffff;
    padding: 0px;
    height: 5vh;
    line-height: 5vh;
    font-size: 2vh;
    border-radius: 1vh;
  }
  .single-withe {
    background-color: #ffffff;
    color: #d3d3d3;
    padding: 0px;
    height: 5vh;
    line-height: 5vh;
    font-size: 2vh;
    border-radius: 1vh;
  }
  .unlog-show {
    text-align: center;
    margin-top: 15vh;
  }
  .van-dialog__message {
    color: black;
  }
}
</style>