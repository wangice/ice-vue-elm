<template>
  <div class="register">
    <div class="join-us-content">
      <van-nav-bar title="注册" @click-left="onClickLeft" >
          <van-icon name="arrow-left"  slot="left"></van-icon>
      </van-nav-bar>
    </div>
    <!-- 登录模块 -->
    <div class='register-content'>
      <van-row type="flex" justify="space-around">
        <van-col span="4">
        </van-col>
        <van-col span="20">
          <van-field placeholder="请输入手机号" v-model="registerData.phone" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="4">
        </van-col>
        <van-col span="12">
          <van-field placeholder="请输入验证码" type='password' v-model="registerData.password" />
        </van-col>
        <van-col span="8">
          <div class="codetxt">
            <span type="button" :disabled="disabled" @click="sendcode">{{btntxt}}</span>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="4">
        </van-col>
        <van-col span="20">
          <van-field placeholder="请输入你的登录密码" type='password' v-model="registerData.password" />
        </van-col>
      </van-row>
    </div>
    <!-- 登录模块 -->

    <button :class='user_status ? "register-btn register-btn-logo" : "register-btn register-register-logo"' @click="register"></button>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CryptoJS from 'crypto-js'
@Component({})
export default class register extends Vue {
  public user_status: boolean = true // 表示用户已注册或未注册状态
  private verifyStatus: boolean = false // 验证码状态
  private btntxt: string = '获取验证码'
  private time: number = 60
  private disabled: boolean = false

  private registerData: any = {
    phone: '',
    password: ''
  } // 登陆参数
  register() {
    if (this.user_status) {
      if (!this.registerData.phone) {
        this.$toast('账号不可为空，请输入账号')
        return
      } else if (!this.registerData.password) {
        this.$toast('登录密码不可为空，请输入密码')
        return
      } else if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.registerData.phone)) {
        this.$toast('该手机号码格式有误，请重新输入')
        return
        // } else if (!(/^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{6,16}$/.test(this.registerData.password))) {
        //   this.$toast('密码格式有误，请输入6~16位数字和字母');
        //   return
      } else {
        this.$post(
          'member/register/checkVerify',
          {
            mobile: this.registerData.phone,
            pwd: CryptoJS.MD5(this.registerData.password).toString()
          },
          { from: true }
        ).then((res: any) => {
          if (res.data.code == 0) {
            this.$cookies.set(
              'phoneNumber',
              this.registerData.phone,
              60 * 60 * 24 * 3
            ) // 存储手机号3天 3天内有效
            this.$cookies.set(
              'userId',
              CryptoJS.MD5(this.registerData.phone).toString(),
              60 * 60 * 24 * 3
            ) // 存储手机号3天 3天内有效
            this.$toast(res.data.msg)
            this.$router.push('/')
            console.log(this.$cookies.get('phoneNumber'))
          } else {
            this.$toast(res.data.msg)
            this.registerData.password = ''
            this.registerData.verify = ''
          }
        })
      }
    }
  }

  private sendcode() {
    //发送短信
    var reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (this.registerData.phone == '') {
      this.$toast('手机号不能为空')
    } else if (!reg.test(this.registerData.phone)) {
      this.$toast('手机号格式不正确')
    } else {
      this.time = 60
      this.disabled = true
      //验证码的时间设置 可有可无
      this.timer()
      //手机号争取后调取接口
      this.$toast('发送短信请求')
    }
  }

  //验证码的倒计时
  timer() {
    if (this.time > 0) {
      this.time--
      this.btntxt = this.time + 's后获取'
      setTimeout(this.timer, 1000)
    } else {
      this.time = 0
      this.btntxt = '获取验证码'
      this.disabled = false
    }
  }

  private onClickLeft() {
    this.$router.push('/login')
  }

  mounted() {}
}
</script>
<style lang="scss">
.register {
  // height: 100vh;
  // background: url("../assets/register&register/背景.png") no-repeat;
  // background-size: cover;
  .register-verify-pic {
    width: 100%;
    height: 100%;
  }
  .user_logo {
    width: 6rem;
    height: 7rem;
    position: absolute;
    top: 13%;
    left: calc(50% - 3rem);
  }
  .join-us-content {
    height: 3rem;
    background: url('../../assets/login&register/顶部灰底图.png') no-repeat;
    background-size: 100% 100%;
    .van-row {
      height: 100%;
      .van-col:last-child {
        span {
          display: inline-block;
          height: 100%;
          width: 5rem;
          line-height: 3rem;
          position: absolute;
          left: calc(50% - 2.5rem);
          // font-family: none;
          font-size: 1.1rem;
        }
      }
    }
  }
  .register-content {
    position: absolute;
    color: #ffffff;
    width: 18rem;
    left: calc(50% - 9rem);
    top: 35%;
    border: 1px solid #8e8e91;
    .codetxt {
      background-color: #fff;
      color: #000;
      text-align: center;
      margin-top: 12px;
      margin-right: 6px;
    }
    .van-row:first-child {
      .van-col:first-child {
        background: url('../../assets/commonPic/手机图标.png') 80% center
          no-repeat;
        background-size: 40% 55%;
      }
    }
    .van-row:nth-child(2) {
      .van-col:first-child {
        background: url('../../assets/commonPic/密码图标.png') 80% center
          no-repeat;
        background-size: 50% 50%;
      }
    }
    .van-col {
      height: 7vh;
      .van-field {
        background: transparent;
        input {
          color: white;
          display: inline-block;
          height: 7vh;
          margin-top: -1.5vh;
          font-size: 1rem;
          // font-family: none;
        }
      }
      .van-cell {
        padding: 10px 8px;
      }
    }
    .van-row {
      border-bottom: 1px solid #8e8e91;
    }
    .van-row:last-child {
      border-bottom: none;
      .van-col:first-child {
        background: url('../../assets/commonPic/验证码图标.png') 80% center
          no-repeat;
        background-size: 50% 45%; /* 通过百分比设置 */
      }
    }
  }
  .register-btn-logo {
    background: url('../../assets/commonPic/登录.png') no-repeat;
  }
  .register-register-logo {
    background: url('../../assets/commonPic/注册按钮.png') no-repeat;
    top: 78% !important;
  }
  .register-btn {
    width: 14rem;
    height: 5.5rem;
    background-size: 100% 100%;
    border: none;
    position: absolute;
    top: 65%;
    left: calc(50% - 7rem);
  }
  .forget {
    position: absolute;
    width: 100%;
    top: 78%;
    .forget-password {
      width: 5rem;
      background-size: 100% 100%;
      color: #fff;
      font-size: 0.8rem;
      position: relative;
      float: right;
    }
  }
  .register-account {
    color: #f6ed5a;
    font-size: 1rem;
    position: absolute;
    top: 85%;
    left: calc(50% - 2rem);
    display: inline-block;
    width: 4rem;
    // font-family: none;
  }
}
@media screen and (max-height: 520px) {
  #app {
    height: 130vh;
  }
  .register {
    height: 140vh;
    overflow-y: auto;
    .register-content,
    .register-content {
      .van-col {
        height: 9vh;
      }
      top: 50%;
    }
    .register-btn {
      top: 98% !important;
    }
    .register-account {
      top: 120%;
    }
  }
}
</style>
