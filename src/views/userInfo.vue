<template>
  <div class="userInfo">
    <div class='content'>
        <van-row type="flex"  >
            <van-col span="8">
                身份证号码：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入您的身份证号码" v-model='reuqestData.identifyNumber'/>
            </van-col>
        </van-row>
        <van-row type="flex"  >
            <van-col span="8">
                手机号码：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入您的手机号码" v-model='reuqestData.phoneNumber'/>
            </van-col>
        </van-row>
        <van-row type="flex"  >
            <van-col span="8">
                所在地区：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入所在地区" v-model='reuqestData.area'/>
            </van-col>
        </van-row>
        <van-row type="flex"  >
            <van-col span="8">
                详细地址：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入详细地址" v-model='reuqestData.detailArea'/>
            </van-col>
        </van-row>
        <van-row type="flex"  >
            <van-col span="8">
                支付密码：
            </van-col>
            <van-col span="14">
                <van-field placeholder="请输入6位数支付密码" type='password' v-model='reuqestData.payPasswd' clearable/>
            </van-col>
        </van-row>
        <van-row type="flex" justify="space-around" >
            <van-col span="6" >
                <button class='userinfo-footer-btn' @click='save'>保存</button>
            </van-col>
        </van-row>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CryptoJS from 'crypto-js';
@Component({})
export default class UserInfo extends Vue {
    private reuqestData:any = {
        identifyNumber: '',
        phoneNumber: '',
        area: '',
        detailArea: '',
        detailId: '',
        payPasswd: ''
    }
    mounted() {
     this.getUserInfo();   
    }
    getUserInfo () {
        this.$post(`member/detail/queryMemberDetail`).then((res:any) => {
            if (res.data.code == 0) {
                this.reuqestData.identifyNumber = res.data.data.identifyNumber
                this.reuqestData.phoneNumber = res.data.data.phoneNumber
                this.reuqestData.area=res.data.data.area
                this.reuqestData.detailArea= res.data.data.detailArea
                this.reuqestData.detailId= res.data.data.detailId
            }
        })
    }
    save () {
        if (!(this.reuqestData.identifyNumber && this.reuqestData.area && this.reuqestData.detailArea && this.reuqestData.phoneNumber)) {
            this.$toast('以上所有信息为必填，请按照要求填写')
            return
        } else {
            if (!(/^[0-9a-zA-Z]{18}$/.test(this.reuqestData.identifyNumber))) {
                this.$toast('身份证只可输入数字或字母且为18位数')
                return
            } else if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(this.reuqestData.phoneNumber))) {
                this.$toast('该手机号码格式有误，请重新输入');
                return
            } else if (this.reuqestData.area.length > 20){
                this.$toast('地址只可输入中文且不超过20个字');
                return
            } else if (this.reuqestData.area.detailArea > 10){
                this.$toast('详细地址只可输入中文且不超过10个字');
                return
            } else if ((this.reuqestData.detailId==''&&this.reuqestData.payPasswd=='')||(this.reuqestData.payPasswd!='' && this.reuqestData.payPasswd.length !=6)) {
                this.$toast('支付密码请设置6位数数字');
                return
            } else {
                var oldPayPasswd = this.reuqestData.payPasswd;
                if(this.reuqestData.payPasswd != ''){
                    this.reuqestData.payPasswd = CryptoJS.MD5(this.reuqestData.payPasswd).toString()
                }
                this.$post(`member/detail/saveMemberDetail`, this.reuqestData, {from: true}).then((res:any) => {
                    if (res.data.code == 0) {
                        this.$toast('保存成功'), 
                        this.getUserInfo();
                        this.reuqestData.payPasswd = oldPayPasswd;
                        // this.reuqestData = {
                        //     identifyNumber: '',
                        //     phoneNumber: '',
                        //     area: '',
                        //     detailArea: '',
                        //     detailId: '',
                        //     payPasswd: ''
                        // }
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss">
    .userInfo {
        color:white;
        .content {
            margin-top:10%;
            .van-row:nth-of-type(odd){ background:rgba($color: #813c4d, $alpha: 0.4)}
        .van-row:nth-of-type(even){ background:rgba($color: #072859, $alpha: 0.4)}
        .van-row:last-child {background: none}
            .van-row {
                height:6vh;
                margin-top:2vh;
                line-height:6vh;
                .van-col:first-child {
                    text-align:right;
                    font-size:2.5vh;
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
                        line-height: 6vh;
                        color: white;
                        font-size: 1rem;
                        // font-family: none;
                        }
                    }
                }
            }
        }
        .userinfo-footer-btn {
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