<template>
  <div class="qr-doede">
    <div class='qr-content'>
        <div class='qr-data' v-for='(item, index) in logList' :key='index'>
            <van-row type="flex" justify="space-around" gutter='20'>
                <van-col span="10" >
                    类型:
                    <span v-if='item.payType == "zfbwap"'>支付宝扫码</span>
                    <span v-if='item.payType == "wxwap"'>微信扫码</span>
                </van-col>
                <van-col span="10" >
                    金额(元):{{item.amount / 100}}
                </van-col>
                <van-col span="4" >
                    <strong style='color:red' @click='() => {
                        deleteShow = true,
                        deleteObj = item
                    }'>删除</strong>
                </van-col>
            </van-row>
            <van-row type="flex" >
                <van-col span="24" >
                    状态：
                    <span v-if='item.status == 0'>未审核</span>
                    <span v-if='item.status == 1'>审核通过</span>
                    <span v-if='item.status == 2'>审核不通过</span>
                    <span v-if='item.status == 3'>禁用</span>
                    <span v-if='item.status == 4'>删除</span>
                </van-col>
            </van-row>
            <van-row type="flex" >
                <van-col span="24" >
                    二维码账号:{{item.extra1}}
                </van-col>
            </van-row>
            <van-row type="flex" >
                <van-col span="7" >
                    二维码URL:
                </van-col>
                <van-col span="17" style='word-break:break-word'>
                    {{item.qrUrl}}
                </van-col>
            </van-row>
        </div>
        <p v-show='logList.length > 0' style="textAlign:center" @click='() => {
          pageNum++,
          getLogList()
        }' >加载更多</p>
    </div>
    <p style="textAlign:center" >
        <button @click='show = true' class='add-qr-code'>添加</button>
    </p>
    <van-dialog
        v-model="show"
        title="新增二维码"
        class='qr-dialog'
        confirmButtonText='保存'
        @confirm='addQrCode'
        show-cancel-button
        @cancel='show = false'
        :before-close='(action, done) => {
            done(false)
        }'
        >
        <van-row type="flex" :gutter='20' style='padding:4.3vw 3vw'>
            <van-col span="8" style='text-align:right'>
            <p>类型：</p>
            </van-col>
            <van-col span="16" style='margin:auto'>
            <select style='padding:2vw;border-radius:2vw' id='payType'>
                <option value='zfbwap'>支付宝</option>
                <option value='wxwap'>微信</option>
            </select>
            </van-col>
        </van-row>
        <van-row type="flex" :gutter='20' style='padding:4.3vw 3vw'>
            <van-col span="8" style='text-align:right'>
            <p>金额：</p>
            </van-col>
            <van-col span="16" style='margin:auto'>
            <select style='padding:2vw;border-radius:2vw' v-html='moneyTep' id='moneyType'>
                
            </select>
            </van-col>
        </van-row>
        <van-row type="flex" :gutter='20' style='padding:4.3vw 3vw'>
            <van-col span="10" >
            <p>二维码账号：</p>
            </van-col>
            <van-col span="14" style='margin:auto'>
                 <van-field v-model="qrNum" placeholder="请输入账号" />
            </van-col>
        </van-row>
        <van-row type="flex" :gutter='20' style='padding:4.3vw 3vw'>
            <van-col span="10" >
            <p>二维码URL：</p>
            </van-col>
            <van-col span="14" style='margin:auto'>
                 <van-field v-model="qrUrl" placeholder="请输入url" type='textarea'/>
            </van-col>
        </van-row>
    </van-dialog>
    <van-dialog
        v-model="deleteShow"
        title="删除二维码"
        class='qr-dialog'
        confirmButtonText='确定'
        @confirm='deleteQr'
        show-cancel-button
        @cancel='deleteShow = false'
        :before-close='(action, done) => {
            done(false)
        }'
        >
       <p style='text-align:center'>您确定删除该二维码？</p>
    </van-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class QrCode extends Vue {
  private pageNum: number = 1;
  private show: boolean = false;
  private moneyTep: any = '';
  private deleteObj: any = '';
  private deleteShow:boolean = false;
  private qrNum:string = '';
  private qrUrl:string = '';
  private pageSize: number = 10; // 页数
    private logList: any[] = []
    mounted() {
      this.getLogList();
      this.$post(`member/sysconfig/amountList`, {from: true}).then((res:any) => {
          res.data.data.map((item:any, index:number) => {
              this.moneyTep += `<option value=${item.amount}>${item.amount / 100}</option>`
          })
          console.log(this.moneyTep)
      })
    }
    getLogList () {
      this.$post(`member/memberQr/queryMemberQr`, {
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
    deleteQr(obj:any) {
       this.$post(`member/memberQr/delMemberQr`, {
           qrId: this.deleteObj.qrId
       }, {from: true}).then((res:any) => {
           this.$toast(res.data.msg)
           if (res.data.code == 0) {
               this.deleteShow = false;
               this.pageNum = 1;
               setTimeout(() => {
                    this.logList = []
                    this.getLogList()
                }, 700);
           }
       })
    }
    addQrCode () {
        let payVal = document.getElementById('payType')
        let moneyVal = document.getElementById('moneyType')
        // console.log(payVal.options[payVal.selectedIndex].value, moneyVal.options[moneyVal.selectedIndex].value)
         console.log(moneyVal)
        if (!(this.qrNum && this.qrUrl)) {
            this.$toast('以上信息皆为必填项，请按照要求填写')
        } else if (this.qrNum.length > 30) {
            this.$toast('账号不可超过30个字')
        } else {
            this.$post(`member/memberQr/addMemberQr`, {
                payType: (payVal as any).options[(payVal as any).selectedIndex].value,
                amount: (moneyVal as any).options[(moneyVal as any).selectedIndex].value,
                qrUrl: this.qrUrl,
                extra1: this.qrNum
            }, {from: true}).then((res:any) => {
                this.$toast(res.data.msg);
                if (res.data.code == 0) {
                    this.pageNum = 1;
                    this.show = false
                    this.qrNum = ''
                    this.qrUrl = ''
                    setTimeout(() => {
                        this.logList = []
                        this.getLogList()
                    }, 700);
                }
            })
        }
    }
}
</script>
<style lang="scss">
    .qr-doede {
        color:white;
        .qr-content {
            height: 62vh;
            overflow-y:auto;
        }
        .qr-data {
            width: 90vw;
            background: #4b4c68;
            margin:5vw;
            .van-row  {
                padding: 1vw;
            }
        }
        .unlog-show {
          text-align:center;
          margin:15vh;
        }
        .add-qr-code {
            background: url('../assets/commonPic/4/开始抢单按钮.png') no-repeat;
            background-size: 100% 110%;
            border:none;
            width:20vw;
            height:6vh;
        }
        .qr-dialog {
            color:black
        }
    }
</style>