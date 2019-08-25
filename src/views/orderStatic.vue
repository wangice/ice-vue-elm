<template>
  <div class="order-static">
    <div class='header'>
      <van-row type="flex" justify="space-around" align="center">
          <van-col span="8" >
              类型
          </van-col>
          <van-col span="8" >
              金额(元)
          </van-col>
          <van-col span="8" >
              订单数量
          </van-col>
      </van-row>
    </div>
    <div class='content' style="height:68vh">
      <p v-show='logList.length <= 0' class='unlog-show'>
        暂无订单统计！！！
      </p>
      <van-row type="flex" justify="space-around" v-for='(item, index) in logList' :key='index' align="center">
          <van-col span="8" >
            <span v-if='item.payType == "zfbwap"'>支付宝</span>
            <span v-else-if='item.payType == "wxwap"'>微信</span>
          </van-col>
          <van-col span="8" >
            {{item.payAmount / 100}}
          </van-col>
          <van-col span="8" >
             {{item.totalCount}}
          </van-col>
      </van-row>
    </div>
     <p v-show='logList.length > 0' style="textAlign:center" @click='() => {
          pageNum++,
          getOrderStatic()
        }' >加载更多</p>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class OrderStatic extends Vue {
  private pageNum: number = 1;
  private pageSize: number = 10; // 页数
    private logList: any[] = []
    mounted() {
      this.getOrderStatic();
    }
    getOrderStatic () {
      this.$post(`member/statistic/orderStatistic`, {
        pageNumber: this.pageNum,
        pageSize: this.pageSize
      }, {from: true}).then((res: any) => {
        if (res.data.data.rows.length <= 0) {
          this.$toast('没有更多数据了');
        } else {
          this.$toast('加载成功')
          this.logList = this.logList.concat(res.data.data.rows)
        }
         
      })
    }
}
</script>
<style lang="scss">
    .order-static {
        color:white;
        .header {
          .van-col {
            padding:2vh 0.2vh;
          }
        }
        .content {
          height: 80vh;
          overflow-y: auto;
          .van-row {
            background: #4b4c68;
            margin-top:2vh;
            .van-col {
              padding:1vh 0.2vh;
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
        .log-btn {
            padding: 0px;
            height: 5vh;
            line-height: 5vh;
            font-size: 2vh;
            border-radius: 1vh;
          }
    }
</style>