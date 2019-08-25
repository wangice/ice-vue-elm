<template>
  <div class="withdraw-weposit-log">
    <div class='header'>
      <van-row type="flex" justify="space-around" >
          <van-col span="8" >
              提现时间
          </van-col>
          <van-col span="8" >
              金额（元）
          </van-col>
          <van-col span="8" >
              状态
          </van-col>
      </van-row>
    </div>
    <div class='content' style="height:60vh;overflow-y:auto">
      <p v-show='logList.length <= 0' class='unlog-show'>
        暂无提现记录！！！
      </p>
      <van-row type="flex" justify="space-around" v-for='(item, index) in logList' :key='index'>
          <van-col span="8" >
            {{item.createTimeStr}}
          </van-col>
          <van-col span="8" >
            {{item.money / 100}}
          </van-col>
          <van-col span="8" >
            <span v-if='item.status == 0'>提现中</span>
            <span v-if='item.status == 1'>已打款</span>
            <span v-if='item.status == 3'>审核通过</span>
            <span v-if='item.status == 4'>驳回</span>
            <span v-if='item.status == 5'>已撤回</span>
            <span v-if='item.status == 6'>确认打款</span>
          </van-col>
      </van-row>
    </div>
    <p v-show='logList.length > 0' style="textAlign:center" @click='() => {
          pageNum++,
          getLogList()
        }' >加载更多</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class withdrawDepositLog extends Vue {
    private logList: any[] = [
      // {
      //   time: '2019-5-20 10:12:48',
      //   money: '50.00',
      //   status: '提现中'
      // },
      // {
      //   time: '2019-5-20',
      //   money: '50.00',
      //   status: '已打款'
      // }
    ]
    private pageNum: number = 1;
    private pageSize: number = 10; // 页数
    // private logList: any[] = []
    mounted() {
      this.getLogList();
    }
    getLogList() {
      this.$post(
        `member/withdraw/queryMemberWithdraw`,
        {
          pageNumber: this.pageNum,
          pageSize: this.pageSize
        },
        { from: true }
      ).then((res: any) => {
        if (res.data.data.rows.length <= 0) {
          this.$toast("没有更多数据了");
        } else {
          this.$toast("加载成功");
          this.logList = this.logList.concat(res.data.data.rows);
        }
      });
    }
}
</script>
<style lang="scss">
    .withdraw-weposit-log {
        color:white;
        .header {
          .van-col {
            padding:2vh 0.2vh;
            text-align:center;
          }
        }
        .content {
          .van-row {
            background: #4b4c68;
            margin-top:1vh;
            .van-col {
              padding:1vh 0.2vh;
               text-align:center;
              // height: 6vh;
            }
            .van-col:first-child {
              font-size:1vh;
            }
          }
          .van-row:first-child {
            margin-top:0vh;
          }
          
        }
        .unlog-show {
          text-align:center;
          margin-top:15vh;
        }
    }
</style>