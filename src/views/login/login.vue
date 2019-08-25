<template>
    <div class="login">
        <van-nav-bar title="登录" :left-arrow="true" @click-left='$router.push("/home")'>
            <van-icon name="arrow-left" slot="left" size="22"></van-icon>
        </van-nav-bar>

        <div class="login-form">
            <van-cell-group>
                <van-field v-model="account" placeholder="账号" />
            </van-cell-group>
            <van-cell-group>
                <van-field v-model="password" :type="passwordType" placeholder="密码" @click-right-icon="pwdRightClick">
                    <van-icon slot="right-icon" :name="passwordType === 'password'?'eye-o':'closed-eye' " size="22"></van-icon>
                </van-field>
            </van-cell-group>
            <van-row type="flex" justify="space-around">
                <van-col span="14">
                    <van-field v-model="verifyCode" placeholder="验证码" />
                </van-col>
                <van-col span="10">
                    <div class="img_change_img">
                        <img v-show="captchaCodeShow" :src="captchaCodeImg" />
                        <div class="change_img" @click="getCaptchaCode">
                            <span>看不清</span>
                            <span>换一张</span>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <p class="login_tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
        <p class="login_tips">
            注册过的用户可凭账号密码登录
        </p>
        <div class="login_container" @click="mobileLogin">登录</div>
        <p class="reset-password" @click="resetPwd">重置密码？</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
    private account:string = ""
    private password:string = ""
    private verifyCode:string = ""

    private passwordType:string = "password"

    private captchaCodeImg:string = ""

    private captchaCodeShow:boolean = false

    created(){
        this.getCaptchaCode()
    }

    private pwdRightClick(){
        console.log("点击事件")
        if(this.passwordType === 'password'){
            this.passwordType = ''
        }else{
            this.passwordType = 'password'
        }
    } 

    //获取验证码，线上环境使用固定的图片，生产环境使用真实的验证码
    private getCaptchaCode(){
        this.$post('/v1/captchas').then((res: any) => {
            this.captchaCodeImg = res.data.code
            this.captchaCodeShow = true
        });
    }

    private mobileLogin(){

    }

    private resetPwd(){
        
    }
}
</script>

<style lang="scss">
@import '../../style/mixin';

.login {
  font-size: 1rem;

  .van-nav-bar {
    background-color: #3b95e9;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
    .van-nav-bar__title {
     @include sc(1.3rem, white);
    }
    .van-icon-arrow-left{
        color: #666;
    }
  }
  .login-form {
    margin-top: 4vh;
    .van-cell {
      font-size: 1.2rem;
    }
    .img_change_img {
      display: flex;
      align-items: center;
      img {
        margin-right: 0.6rem;
      }
      .change_img {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: center;
        span {
          @include sc(0.55rem, #666);
        }
        span:nth-of-type(2) {
          color: #3b95e9;
          margin-top: 0.2rem;
        }
      }
    }
  }
  .login_tips {
    @include sc(0.5rem, red);
    padding: 0.4rem 0.6rem;
    line-height: 0.5rem;
  }
  .login_container {
    margin: 0 0.5rem 1rem;
    @include sc(1.3rem, #fff);
    background-color: #4cd964;
    padding: 0.5rem 0;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
    height: 2rem;
  }
  .reset-password {
    float: right;
    @include sc(1rem, #3b95e9);
    margin-right: 0.3rem;
  }
}
</style>
