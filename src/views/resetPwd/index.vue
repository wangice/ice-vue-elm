<template>
  <div class="resetpwd">
    <van-nav-bar title="重置密码" @click-left="$router.go(-1)">
      <van-icon name="arrow-left" slot="left" size="22" color="#fff"></van-icon>
    </van-nav-bar>
    <div class="resetpwd-content">
      <van-row type="flex" justify="space-around">
        <van-col span="24">
          <van-field v-model="account" placeholder="账号" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="24">
          <van-field v-model="password" :type="oldPasswordType" placeholder="旧密码" @click-right-icon="owdPwdRightClick">
            <van-icon slot="right-icon" :name="oldPasswordType === 'password'?'closed-eye':'eye-o' " size="22"></van-icon>
          </van-field>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="24">
          <van-field v-model="password" :type="newPasswordType" placeholder="请输入新密码" @click-right-icon="newPwdRightClick">
            <van-icon slot="right-icon" :name="newPasswordType === 'password'?'closed-eye':'eye-o' " size="22"></van-icon>
          </van-field>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-around">
        <van-col span="24">
          <van-field v-model="password" :type="configPasswordType" placeholder="请确认密码" @click-right-icon="configPwdRightClick">
            <van-icon slot="right-icon" :name="configPasswordType === 'password'?'closed-eye':'eye-o' " size="22"></van-icon>
          </van-field>
        </van-col>
      </van-row>
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
      <button class="resetPwd-btn" @click="resetPwd">确认修改</button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ResetPwd extends Vue {
  private account: string = '' //账号
  private oldPwd: string = '' //旧密码
  private newPwd: string = '' //新密码
  private configPwd: string = '' //确认密码
  private verifyCode: string = '' //验证码
  private oldPasswordType: string = 'password'
  private newPasswordType: string = 'password'
  private configPasswordType: string = 'password'
  private captchaCodeImg: string = '' //验证码图片数据
  private captchaCodeShow: boolean = false //是否展示验证码

  created() {
    this.getCaptchaCode()
  }

  private owdPwdRightClick() {
    if (this.oldPasswordType === 'password') {
      this.oldPasswordType = ''
    } else {
      this.oldPasswordType = 'password'
    }
  }
  private newPwdRightClick() {
    if (this.newPasswordType === 'password') {
      this.newPasswordType = ''
    } else {
      this.newPasswordType = 'password'
    }
  }
  private configPwdRightClick() {
    if (this.configPasswordType === 'password') {
      this.configPasswordType = ''
    } else {
      this.configPasswordType = 'password'
    }
  }

  //获取验证码，线上环境使用固定的图片，生产环境使用真实的验证码
  private getCaptchaCode() {
    this.$post('/v1/captchas').then((res: any) => {
      this.captchaCodeImg = res.data.code
      this.captchaCodeShow = true
    })
  }

  // 确认修改
  private resetPwd() {
    if (!this.account) {
      this.$toast('账号不能为空')
      return
    } else if (!this.oldPwd) {
      this.$toast('旧密码不能为空')
      return
    } else if (!this.newPwd) {
      this.$toast('新密码不能为空')
      return
    } else if (!this.configPwd) {
      this.$toast('确认密码不能为空')
      return
    } else if (this.newPwd != this.configPwd) {
      this.$toast('两次输入密码不一致')
      return
    } else if (!this.verifyCode) {
      this.$toast('验证码不能为空')
      return
    }
    let json = {
      username: this.account,
      oldpassWord: this.oldPwd,
      newpassword: this.newPwd,
      confirmpassword: this.configPwd,
      captcha_code: this.verifyCode
    }
    this.$post('/v2/changepassword', json).then((res: any) => {
      if (res.message) {
        this.$toast('修改密码失败')
        this.getCaptchaCode()
        return
      } else {
        this.$toast('修改密码成功')
      }
    })
  }
}
</script>
<style lang="scss">
@import '../../style/mixin';
.resetpwd {
  .van-nav-bar {
    background-color: #3b95e9;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
    .van-nav-bar__title {
      @include sc(1.3rem, white);
    }
    .van-icon-arrow-left {
      color: #666;
    }
    .van-nav-bar__left {
      left: 10px;
    }
  }
  .resetpwd-content {
    margin-top: 2vh;
    .var-row {
      border-top: 1px solid #e4e4e4;
    }
    .img_change_img {
      display: flex;
      align-items: center;
      background-color: #fff;
      height: 100%;
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
    .resetPwd-btn {
      margin-top: 3vh;
      height: 5vh;
      line-height: 5vh;
      width: 90%;
      margin-left: 5vw;
      background-color: #4cd964;
      @include sc(1rem, #fff);
    }
  }
}
</style>
