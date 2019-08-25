<template>
  <div class="mine">
    <van-row type="flex" class="mine-header">
        <van-col span="14" style="text-indent:1em">
         会员昵称：{{userData.memName}}
        </van-col>
        <van-col span="10">
         <strong>信誉积分：{{userData.score}}</strong>
        </van-col>
    </van-row>
    <van-row type="flex" class="mine-header">
        <van-col span="24" style="text-indent:1em">
         会员账号：{{userData.phoneNumber}}
        </van-col>
    </van-row>
    <div class="info-list">
        <ul>
            <li v-for="(item, index) in infoList" :key='item + index' >
                <van-row type="flex" >
                    <van-col class="info-list-icon" span="6" >
                        <!-- <div class="info-list-icon"></div> -->
                        <img :src="item.imgSrc" alt="">
                    </van-col>
                    <van-col span="18" >
                        <span class="info-list-text" @click='$router.push(item.src)'>{{item.text}}</span>
                    </van-col>
                </van-row>
            </li>
        </ul>
    </div>
    <div class="user-info-footer" @click="logout">
        退出登陆
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({

})
export default class Gathering extends Vue {
    private userData:any = {
        memName: '',
        phoneNumber: '',
        score: '' 
    }
    private infoList:any[] = [
        {
            imgSrc: '',
            text: '个人信息',
            src: '/account/user-info'
        },
        {
            imgSrc: '',
            text: '银行卡信息',
            src: '/account/card-info'
        },
        // {
        //     imgSrc: '',
        //     text: '充值',
        //     src: '/account/user-info'
        // },
        {
            imgSrc: '',
            text: '提现',
            src: '/account/withdraw-deposit'
        },
        {
            imgSrc: '',
            text: '抢单记录',
            src: '/account/grab-single-log'
        },
        {
            imgSrc: '',
            text: '充值记录',
            src: '/account/charge-log'
        },
        {
            imgSrc: '',
            text: '提现记录',
            src: '/account/withdraw-weposit-log'
        },
        {
            imgSrc: '',
            text: '收款码',
            src: '/account/qr-code'
        }
    ]
    logout () {
        this.$post(`member/login/loginOut`, {from: true}).then((res:any) => {
            this.$toast(res.data.msg)
            if (res.data.code == 0) {
                this.$cookies.remove('userId');
                this.$cookies.remove('phoneNumber');
                this.$router.push('/login');
            }
        })
    }
    mounted() {
        this.$post(`/member/memberInfo/getMemeber`).then((res:any) => {
            this.userData = res.data.data;
            console.log(this.userData)
        })
    }
}
</script>
<style lang='scss'>
  .mine {
      overflow-y: auto;
    .mine-header {
        background:white;
        strong {
            color: red;
        }
    }
    .info-list {
        color: white;
        li {
            height: 6vh;
            // opacity:0.4;
            margin-top: 2vh;
            line-height: 6vh;
            &:nth-child(1) .info-list-icon {
                background: url('../assets/commonPic/521/个人信息.png') 50% no-repeat; 
            }
            &:nth-child(2) .info-list-icon {
                background: url('../assets/commonPic/521/银行卡信息.png') 50% no-repeat; 
            }
            &:nth-child(3) .info-list-icon {
                background: url('../assets/commonPic/521/提现.png') 50% no-repeat; 
            }
            &:nth-child(4) .info-list-icon {
                background: url('../assets/commonPic/521/抢单记录.png') 50% no-repeat; 
            }
            &:nth-child(5) .info-list-icon {
                background: url('../assets/commonPic/521/充值记录.png') 50% no-repeat; 
            }
            &:nth-child(6) .info-list-icon {
                background: url('../assets/commonPic/521/提现记录.png') 50% no-repeat; 
            }
            &:nth-child(7) .info-list-icon {
                background: url('../assets/commonPic/521/二维码.png') 50% no-repeat; 
            }
            .info-list-icon {
                background-size: contain !important;
            }
            .van-row{
                .van-col:last-child {
                    font-size: 3vh;
                }
            }
            .info-list-text {
                display: inline-block;
                width: 100%;
                height: 100%;
            }
        }
        li:nth-of-type(odd){ background:rgba($color: #813c4d, $alpha: 0.4)}
        li:nth-of-type(even){ background:rgba($color: #072859, $alpha: 0.4)}
    }
    .user-info-footer {
        color: white;
        text-align: center;
        margin-top: 3vh;
    }
  }
</style>
