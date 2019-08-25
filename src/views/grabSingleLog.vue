<template>
  <div class="grab-single-log">
    <div class='grab-content'>
      <div class="audioBox">
        <audio id="eventAudio" v-if="!this.borswerIE" ref="audioPlay" src="../member/music/ordered_tip.m4a" hidden='true' />
        <embed id="eventAudio" v-if="this.borswerIE" ref="audioPlay" src="../member/music/ordered_tip.m4a" autostart="true"
          hidden="true" loop="false" />
      </div>
      <div class='header' v-for='(item, index) in logList' :key='index'>
        <p v-show='logList.length <= 0' class='unlog-show'>
          暂无抢单记录！！！
        </p>
        <van-row type="flex" justify="space-around" gutter='20'>
          <van-col span="24">
            订单ID:
            <span>{{item.payOrderId}}</span>
          </van-col>
        </van-row>
        <van-row type="flex">
          <van-col span="24">
            创建时间:{{item.createTimeStr}}
          </van-col>
        </van-row>
        <van-row type="flex">
          <van-col span="12">
            类型：
            <span v-if='item.payType == "zfbwap"'>支付宝扫码</span>
            <span v-else-if='item.payType == "wxwap"'>微信扫码</span>
          </van-col>
          <van-col span="12">
            金额:
            <span>{{item.payAmount / 100}}</span>
          </van-col>
        </van-row>
        <van-row type="flex">
          <van-col span="12">
            名称
            <span> {{item.goodsName}}</span>
          </van-col>
          <van-col span="12">
            <van-button type="default" class="log-btn" v-if='item.status == 0' @click="confirm(item)">确认收款</van-button>
            <van-button type="default" class="log-btn" v-if='item.status == 1' disabled>已收款</van-button>
            <van-button type="default" class="log-btn" v-if='item.status == 2' disabled>已撤销</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <p v-show='logList.length > 0' style="textAlign:center" @click='() => {
          pageNum++,
          getLogList()
        }'>加载更多</p>

    <van-dialog v-model="configOrderShow" title="确认订单" class='grap-order-dialog' confirmButtonText='确认订单' @confirm='confirmOrder'
      show-cancel-button @cancel='cancelOrder' :before-close='(action, done) => {
            done(false)
        }'>
      <van-row type="flex" style='padding:2.3vw 2vw'>
        <van-col span="4" style='text-align:left'>
          <p>订单ID：</p>
        </van-col>
        <van-col span="18" style='margin:auto'>
          {{orderNumber}}
        </van-col>
      </van-row>
      <van-row type="flex" style='padding:2.3vw 2vw'>
        <van-col span="12" style='text-align:left'>
          <p>请输入订单后四位：</p>
        </van-col>
        <van-col span="12" style='margin:auto'>
          <van-field placeholder="订单后四位" v-model='orderNumberLast' />
        </van-col>
      </van-row>
    </van-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class GrabSingleLog extends Vue {
  private configOrderShow: boolean = false
  private pageNum: number = 1
  private pageSize: number = 10 // 页数
  private borswerIE: Boolean = false
  private logList: any[] = []
  private audioPlayer: any = null
  private orderNumber: string = ''
  private orderNumberLast: string = ''
  created() {
    const borswer = window.navigator.userAgent.toLowerCase()
    // 判断 是否为IE浏览器内核
    if (borswer.indexOf('ie') >= 0) {
      this.borswerIE = true
    }
  }
  mounted() {
    this.getLogList()
    this.audioPlayer = this.$refs.audioPlay //this.$refs需要早mounted中获取，即渲染之后
    console.log(this.audioPlayer)
  }
  confirm(obj: any) {
    console.log(obj)
    this.configOrderShow = true
    this.orderNumber = obj.payOrderId
  }
  confirmOrder() {
    console.log(this.orderNumberLast)
    console.log(this.orderNumber.substring(this.orderNumber.length - 4))
    if (this.orderNumberLast == '') {
      return
    }
    if (
      this.orderNumberLast.length != 4 ||
      this.orderNumber.substring(this.orderNumber.length - 4) !=
        this.orderNumberLast
    ) {
      this.$toast('输入订单后四位')
      return
    }
    this.configOrderShow = false
    this.logList = []
    this.$post(
      `member/memberInfo/confirmOrder`,
      { payOrderId: this.orderNumber },
      { from: true }
    ).then((res: any) => {
      this.$toast(res.data.msg)
      if (res.data.code == 0) {
        this.pageNum = 1
        this.getLogList()
      }
    })
  }
  cancelOrder() {
    this.configOrderShow = false
    this.orderNumber = ''
    this.orderNumberLast = ''
  }
  getLogList() {
    this.$post(
      `member/memberInfo/orderList`,
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
        if (this.logList[0].status == 0) {
          //播放音乐
          this.playAudio()
        }
      }
    })
  }

  playAudio() {
    if (this.borswerIE) {
      this.audioPlayer.volume = 100
    } else {
      this.audioPlayer.play()
    }
  }
}
</script>
<style lang="scss">
.grab-single-log {
  color: white;
  .grab-content {
    height: 65vh;
    overflow-y: auto;
  }
  .header {
    width: 90vw;
    background: #4b4c68;
    margin: 5vw;
    .van-col {
      padding: 2vh 0.2vh;
    }
  }
  .content {
    height: 80vh;
    overflow-y: auto;
    .van-row {
      background: #4b4c68;
      margin-top: 2vh;
      .van-col {
        padding: 1vh 0.2vh;
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
  .unlog-show {
    text-align: center;
    margin-top: 15vh;
  }
  .log-btn {
    padding: 0px;
    height: 5vh;
    line-height: 5vh;
    font-size: 2vh;
    border-radius: 1vh;
  }
  .grap-order-dialog {
    color: black;
  }
}
</style>