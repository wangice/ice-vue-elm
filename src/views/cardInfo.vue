<template>
  <div class="cardInfo">
    <div class='content' v-clock>
        <van-row type="flex"  >
            <van-col span="8">
                开户行名称：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入开户行名称" v-model='reuqestData.bankName'/>
            </van-col>
        </van-row>
        <van-row type="flex"  >
            <van-col span="8">
                支行名称：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入支行名称" v-model='reuqestData.branchBankName'/>
            </van-col>
        </van-row>
        <!-- <van-row type="flex"  >
            <van-col span="8">
                支行地址：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入支行地址" />
            </van-col>
        </van-row> -->
        <van-row type="flex"  >
            <van-col span="8">
                银行卡号：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入银行卡号" v-model='reuqestData.bankNo'/>
            </van-col>
        </van-row>
        <van-row type="flex"  >
            <van-col span="8">
                开户人姓名：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入开户人姓名" v-model='reuqestData.accountName'/>
            </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" v-if="!cardStatus.length > 0">
            <van-col span="6" >
                <button class='cardInfo-footer-btn' @click='save'>保存</button>
            </van-col>
        </van-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class CardInfo extends Vue {
    private reuqestData:any = {
        bankName: '',
        branchBankName: '',
        accountName: '',
        bankNo: '',
        // detailId: '',
        // payPasswd: ''
    }
    private cardStatus: any[] = []
    beforeCreate() {
        this.$post(`member/detail/queryMemberDetail`).then((res:any) => {
            (res.data.code != 0 || !res.data.data.payPasswd) && this.$toast('请先设置支付密码');
            (res.data.code != 0 || !res.data.data.payPasswd) && this.$router.push('/account/user-info');
        })
    }
    mounted() {
      this.getCardInfo()
    }
    getCardInfo () {
        this.$post(`member/bank/bankList`, {}, {form: true}).then((res: any) => {
            if (res.data.code == 0 && res.data.data.rows.length > 0) {
                this.reuqestData = res.data.data.rows[0]
                this.cardStatus = res.data.data.rows
            }
        })   
    }
    save () {
        if (!(this.reuqestData.bankName && this.reuqestData.branchBankName && this.reuqestData.accountName && this.reuqestData.bankNo)) {
            this.$toast('以上所有信息为必填，请按照要求填写')
            return
        } else {
            if (!(/^[\u4e00-\u9fa5]{1,20}$/.test(this.reuqestData.bankName))) {
                this.$toast('开户行名称只可输入中文，不超过20个字')
                return
            } else if (!(/^[\u4e00-\u9fa5]{1,20}$/.test(this.reuqestData.branchBankName))) {
                this.$toast('支行名称只可输入中文，不超过20个字');
                return
            } else if (!(/^[\u4e00-\u9fa5]{1,8}$/.test(this.reuqestData.accountName))){
                this.$toast('开卡人姓名只可输入中文，不超过8个字');
                return
            } else if (!(/^\d{1,19}$/.test(this.reuqestData.bankNo))){
                this.$toast('银行卡号只可输入数字且不超过19位');
                return
            } else {
                // this.reuqestData.payPasswd = CryptoJS.MD5(this.reuqestData.payPasswd).toString()
                this.$post(`member/bank/addBankInfo`, this.reuqestData, {from: true}).then((res:any) => {
                    if (res.data.code == 0) {
                        this.$toast('保存成功'), 
                        this.getCardInfo()
                        // this.reuqestData = {
                        //     bankName: '',
                        //     branchBankName: '',
                        //     accountName: '',
                        //     bankNo: ''
                        // }
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss">
    .cardInfo {
        color:white;
        .content {
            margin-top:10%;
            .van-row:nth-of-type(odd){ background:rgba($color: #813c4d, $alpha: 0.4)}
        .van-row:nth-of-type(even){ background:rgba($color: #072859, $alpha: 0.4)}
        .van-row:last-child {background: none}
            .van-row {
                height:6vh;
                margin-top:3vh;
                line-height:6vh;
                .van-col:first-child {
                    text-align:right;
                    font-size:3vh;
                }
                .van-col {
                    height: 6vh;
                    .van-cell {
                        padding:0px 10px;
                    }
                    .van-field {
                        background: transparent;
                        input {
                        display: inline-block;
                        height: 6vh;
                        color: white;
                        line-height: 6vh;
                        font-size: 1rem;
                        // font-family: none;
                        }
                    }
                }
            }
        }
        .cardInfo-footer-btn {
            background:url('../assets/commonPic/7/个人消息/保存按钮.png') no-repeat;
            background-size: 100% 110%;
            width:100%;
            height:100%;
            border-radius: 1vw;
            text-align:center;
            color:white;
            border:none;
            margin-top: 3vh;
        }
    }
</style>