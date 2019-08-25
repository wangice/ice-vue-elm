<template>
  <div class="GrabSingle">
    <!-- 公告 -->
    <div class="announcement">
      <h2>公告</h2>
      <van-notice-bar background='none' class="announcement-content" v-for="(item, index) in AnnouncementsStr" :key='index' color='white'>
        {{index + 1}}、{{item.noticeContent}}
        <!-- <div >
          {{item.noticeContent}}
        </div> -->
      </van-notice-bar>
    </div>
    <!-- 公告 -->

    <!-- 余额收益 -->
    <div class="single-sum">
      <van-row type="flex" justify="space-around" >
        <van-col span="20">
          当前余额：<span>{{balance / 100}}</span>元
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around" >
        <van-col span="20">
          总收益：<span>{{sum / 100}}</span>元
        </van-col>
      </van-row>
    </div>
    <!-- 余额收益 -->

    <!-- 抢收抢付账单 -->
    <div class="check-content">
      <van-row type="flex" justify="space-around">
        <van-col span="24" >
          说明：抢收款单是别人转账到自己的支付宝或微信
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around" >
        <van-col span="24">
          <div @click='$router.push("/recipt-single")'></div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around" >
        <van-col span="24">
         说明：充值单是对你的账号充值余额
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around" >
        <van-col span="24">
          <div @click='$router.push("/gathering-single")'></div>
        </van-col>
      </van-row>
    </div>
    <!-- 抢收抢付账单 -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({
  // components: {
  //   publicTabbar,
  //   publicHeader
  // }
})
export default class GrabSingle extends Vue {
    private balance:number = 0 // 余额
    private sum:number = 0 // 收益
    private time:any = ''//定时器
    private AnnouncementsStr:string = ''
    getAnnouncementContent () {
      this.$post(`member/notice/queryNotice`, {}).then((res:any) => {
        this.AnnouncementsStr = res.data.data.rows;
      })
    }
    getUserMoneyInfo () {
        this.$post(`member/account/getAccountInfo`, {}).then((res:any) => {
          this.balance = res.data.data.deposit + res.data.data.unavailableAmount;
          this.sum = res.data.data.totalIncome;
        })
    }
    destroyed () {
        clearInterval(this.time)
    }
    mounted() {
      this.getUserMoneyInfo();
      this.time = setInterval(() => {
        this.getAnnouncementContent();
      }, 5000)
    }
    created() {
       this.getAnnouncementContent();
    }
}
</script>
<style lang='scss'>
  .announcement {
    background: url('../assets/commonPic/广告框.png') no-repeat;
    background-size: 100% 110%;
    position: absolute;
    left: calc(50% - 11rem);
    top: 10%;
    overflow-y: auto;
    width: 22rem;
    height: 10rem;
    color: white;
    h2 {
      margin-left: 10vw;
    }
    .announcement-content {
      width: 80%;
      margin: auto;
      // height: 80%;
    }
  }
  .single-sum,.check-content{
    color: white;
    width: 20rem;
    position: absolute;
    left: calc(50% - 10rem);
    top: 37%;
    height: 6rem;
    // font-family: none;
    span{
      color: #00ff1d;
    }
  }
  .check-content {
    top: 47%;
    font-size:0.8rem;
    left: calc(50% - 9rem);
    .van-row:nth-child(2) {
      div {
        width:100%;
        height: 100%;
      }
      .van-col:first-child {
        background: url("../assets/commonPic/抢收款单.png") -4% 5% no-repeat;
        background-size: 90% 110%;
        margin-top: 2%;
        width: 100%;
        height: 14vh;
      }
    }
    .van-row:nth-child(3) {
      margin-top: 10%;
    }
    .van-row:nth-child(4) {
      div {
        width:100%;
        height: 100%;
      }
      .van-col:first-child {
        background: url("../assets/commonPic/抢充值单.png") -4% 4% no-repeat;
        background-size: 90% 110%;
        margin-top: 2%;
        width: 100%;
        height: 14vh;
      }
    }
  }
  @media screen and (max-width: 375px){
        .single-sum {
          top:38%
        }
        .announcement {
          width: 18rem !important;
          height: 8rem !important;
          left: calc(50% - 9rem) !important;
        }
    }
</style>
