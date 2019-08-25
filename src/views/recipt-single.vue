<template>
  <div class="reciptSingle">
    <div class="audioBox">
      <audio id="eventAudio" v-if="!this.borswerIE" ref="audioPlay" src="../member/music/system_order.m4a" hidden='true'/>
      <embed id="eventAudio" v-if="this.borswerIE" ref="audioPlay" src="../member/music/system_order.m4a" autostart="true" hidden="true" loop="false"/>
    </div>
    <p class='grab-single-title'>支付宝分润百分比：<span v-if="this.rateShow">{{ zfbRate }} %</span> ,微信分润百分比：<span v-if="this.rateShow">{{wxRate}} %</span></p>

    <!-- 公告 -->
    <div class="announcement">
      <h2>温馨提示：</h2>
      <p>1、抢到订单务必要关注是否收到钱、<strong>及时确认收款，避免被投诉导致无法收款</strong></p>
      <p>2、尊敬的会员，请密切关注您的可用余额，避免因余额不足导致抢单失败</p>
      <p>3、点击右下角【刷新】按钮更新可抢单金额</p>
    </div>
    <!-- 公告 -->
    
    <!-- 单列表 -->
    <div class="singleList">
      <div class="singleList-header">
        <van-row type="flex" justify="space-around" >
          <van-col span="24">
            可抢单统计
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-around">
          <van-col span="6">类型</van-col>
          <van-col span="6">金额(元)</van-col>
          <van-col span="6">订单数量</van-col>
        </van-row>
      </div>
      <div class="singleList-body">
        <van-row type="flex" justify="space-around" v-for="(item, index) in singleList" :key='item.payAmount + index'>
          <van-col span="6" v-if='item.payType == "zfbwap"'>支付宝扫码</van-col>
          <van-col span="6" v-else-if='item.payType == "wxwap"'>微信扫码</van-col>
          <van-col span="6">{{item.payAmount / 100}}</van-col>
          <van-col span="6">{{item.totalCount}}</van-col>
        </van-row>
      </div>
      <div class="singleList-footer" @click='moreData'>
        加载更多
      </div>
    </div>
    <!-- 单列表 -->

    <!-- 底部按钮 -->
    <van-row type="flex" justify="space-around" class="recipt-single-footer-btn">
        <van-col span="11">
          <div @click='Single(1)'>
            <span>可抢单金额：<strong>{{balance / 100}}</strong>元</span>
            开始抢单
          </div>
        </van-col>
        <van-col span="11">
          <div @click='getSingleList(true)'>
            刷新
          </div>
        </van-col>
      </van-row>
    <!-- 底部按钮 -->

    <van-dialog
      v-model="actionSingleShow"
      title="智能匹配订单..."
      confirmButtonText='关闭抢单'
      @confirm='confirm'
    >
      <p>抢单匹配中请稍后，60S后若未抢到订单，请重新点击开始抢单按钮</p>
      <p style="text-align:center">{{countDown}}秒</p>
    </van-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({

})
export default class reciptSingle extends Vue {
  private rate:number = 0 //分润百分比
  private wxRate:number = 0 //微信分润百分比
  private zfbRate:number = 0 //支付宝分润百分比
  private rateShow:boolean = false
  private singleList:any[] = [] // 数据列表
  private pageNum: number = 1;
  private time:any = '' //定时器
  private orderTime:any ='' //订单定时器
  private balance:number = 0 // 余额
  private pageSize: number = 10; // 页数
  private actionSingleShow: boolean = false;
  private countDown: number = 60 // 倒计时
  private borswerIE: boolean = false
  private audioPlayer:any = null
  private pause:boolean = false
  mounted() {
    this.audioPlayer = this.$refs.audioPlay //this.$refs需要早mounted中获取，即渲染之后才能获取，因为标签中有if判断
  }

  getSingleList (type?:boolean) {
    if (type) {
      this.pageNum = 1;
      this.singleList = [];
    }
    this.$post(`member/statistic/orderStatistic`, {
      pageNumber: this.pageNum,
      pageSize: this.pageSize
    }, {from: true}).then((res:any) => {
      if (res.data.data.rows.length <= 0) {
        this.$toast('没有更多数据了')
        this.singleList = []
      } else {
        this.singleList = res.data.data.rows
        if(res.data.data.rows.length > 0){//播放音乐
          this.playAudio()
        }
      }
    })
  }
  moreData () {
    this.$router.push("/orderStatic");//跳转到订单统计页面
  }
  actionSingle () {
    this.pause = true;
    this.actionSingleShow = true;
    this.countDown = 60; // 重置倒计时
    this.time = setInterval(() => {
      if (this.countDown % 5 == 0) {
        // this.pageNum = 1;
        // this.singleList = [];
        this.$post(`member/memberInfo/orderList`, {
          pageNumber: 1,
          pageSize: 1
        }, {from: true}).then((res:any) => {
          console.log(res.data.data.rows[0].status)
          if (res.data.data.rows[0].status == 0) {
            clearInterval(this.time);
            setTimeout(() => {
              this.$router.push('/account/grab-single-log')
            }, 600);
          }
        })
      } // 每隔5秒重新调用
      if (this.countDown <= 0) {
        clearInterval(this.time);
        this.actionSingleShow = false;
        this.Single(0);
        this.pause = false;
      } else {
        this.countDown--;
      }
      // console.log(this.countDown);
    }, 1000)
    // try {
    //     let data = this.Single(1);
    // } catch (error) {
    //     this.countDown = 60; // 重置倒计时
    //     this.actionSingleShow = false;
    //     clearInterval(this.time);
    // }
  }
  confirm () {
    clearInterval(this.time);
    this.Single(0);
    this.countDown = 0;
    this.pause = false;
  }
  Single(status: number) {
    let taskBoolean = status;
    this.$post(`member/memberInfo/updateMember`, {
      mode: status
    }, {from: true}).then((res:any) =>{
            if(taskBoolean == 1){
                if( res.data.code == 0){
                this.actionSingle()
            }else{
                this.$toast(res.data.msg)
            }
        }
    })
  }
  getMemberRate(){
     this.$post(`/member/sysconfig/memberRate`).then((res:any) => {
      if(res.data.code == 0){
          if(res.data.data != null && res.data.data.length != 0){
              this.rateShow = true
            for(let i =0;i < res.data.data.length;i++){
                let memberRate = res.data.data[i]
                if(memberRate.payType == 'wx'){
                    this.wxRate = memberRate.rate
                }else if(memberRate.payType == 'zfb'){
                    this.zfbRate = memberRate.rate
                }
            }
          }else{
              this.rateShow = false
              console.log("刷手分润百分比为空")
          }
      }
    })
  }
  playAudio(){
        if(this.borswerIE){
          this.audioPlayer.volume = 100
        }else{
          this.audioPlayer.play()
        } 
    }

  created() {
    const borswer = window.navigator.userAgent.toLowerCase();
        // 判断 是否为IE浏览器内核
    if (borswer.indexOf("ie") >= 0) {
          this.borswerIE = true
    }
    this.getSingleList();  
    this.getMemberRate();
    this.$post(`member/account/getAccountInfo`, {}).then((res:any) => {
          this.balance = res.data.data.deposit;
    })
    //10s调用一次
    this.orderTime = setInterval(()=>{
      this.getSingleList()
    },10000)
  }
  beforeDestroy() {
    clearInterval(this.orderTime)
  }
}
</script>
<style lang='scss'>
  $fontColor: #f6ed5a;
  .reciptSingle {
    .grab-single-title {
      font-size: 0.6rem;
      color: $fontColor;
      text-align:center;
    }
    .announcement {
      overflow-y: auto;
      background: url('../assets/commonPic/广告框.png') no-repeat;
      background-size: 100% 110%;
      position: absolute;
      left: calc(50% - 11rem);
      top: 11%;
      width: 22rem;
      height: 12rem;
      h2 {
        color: $fontColor;
        margin: 3% 0px 0px 10%;
      }
      p {
        width:19rem;
        font-size: 0.9rem;
        margin: 3% 0px 0px 10%;
        color:#8e8e91;
        strong {
          color: red;
        }
      }
    }
    .recipt-single-footer-btn {
      width: 22rem;
      position: absolute;
      margin-left: calc(50% - 11rem);
      top: 71%;
      .van-col {
        height: 8.5rem;
        text-align: center;
        line-height: 10rem;
        color: white;
        font-size: 1.8rem;
      }
      .van-col:nth-child(1) {
        background: url('../assets/commonPic/4/开始抢单按钮.png') no-repeat;
        background-size: 100% 110%;
        position: relative;
        span {
          font-size: 2vh;
          position: absolute;
          top: 10%;
          left: 17%;
          line-height: 2rem;
          strong {
            color: #00ff1d;
          }
        }
      }
      .van-col:nth-child(2) {
        background: url('../assets/commonPic/4/刷新按钮.png') no-repeat;
        background-size: 100% 110%;
      }
    }
  }
  .singleList {
    background: url('../assets/commonPic/4/可抢单统计括号.png') no-repeat;
    background-size: 100% 100%;
    width: 22rem;
    height: 13.5rem;
    position: absolute;
    left: calc(50% - 11rem);
    top: 39%;
    color:white;
    .singleList-header {
      .van-row:nth-child(1) {
        margin: 2vw 0vw 0vw 5vw;
      }
      .van-row:nth-child(2) {
        text-align: center;
      }
    }
    .singleList-body {
      width: 100%;
      height: 65%;
      overflow: hidden;
      overflow-y: auto;
      text-align: center;
    }
    .singleList-footer {
      text-align: center;
      
    }
  }
  @media screen and (max-width: 390px) and (max-height: 740px){
    .reciptSingle {
      .announcement {
        left: calc(50% - 9.8rem);
        top: 15%;
        width: 20rem;
         p {
          width:64vw;
        }
      }
      .recipt-single-footer-btn {
        top: 100%;
        .van-col {
          height: 9rem;
        }
      }
    }
    .reciptSingle .singleList {
        width: 80vw;
        height: 45vh;
        left: calc(50% - 40vw);
        top: 47% !important;
        .singleList-body {
          width: 100%;
          height: 68%;
        }
        .singleList-footer {
          margin-top: 1vh;
        }
    }
  }
  @media screen and (min-width: 1024px) {
    .singleList {
        // width: 18rem;
        height: 18rem;
        // left: calc(50% - 9rem);
        top: 35%;
        .singleList-header {
          .van-row:nth-child(1) {
            margin: 1vw 0vw 0vw 2vw;
          }
          .van-row:nth-child(2) {
            text-align: center;
          }
        }
        .singleList-body {
          width: 100%;
          height: 70%;
        }
    }
  }
</style>
