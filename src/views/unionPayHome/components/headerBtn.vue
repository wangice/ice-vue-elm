<template>
  <van-row type="flex" justify="space-around" class="header-b">
    <van-col span="8">
      <div class="header-receipt" @click="receipt">
        <div>
          <img class="receipt_img" src="@/assets/images/first_1.png" />
        </div>
        <div>
          <span>收款</span>
        </div>
      </div>
    </van-col>
    <van-col span="8">
      <div class="header-bill" @click="bill">
        <div>
          <img class="receipt_img" src="@/assets/images/first_2.png" />
        </div>
        <div>
          <span>账单</span>
        </div>
      </div>
    </van-col>
    <van-col span="8">
      <div class="header-report" @click="report">
        <div>
          <img class="receipt_img" src="@/assets/images/first_3.png" />
        </div>
        <div>
          <span>报表</span>
        </div>
      </div>
    </van-col>
  </van-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HeaderBtn extends Vue {

  receipt() {
    this.$toast('收款')
    this.$router.push('/receipt-code')
  }

  bill() {
    this.$toast('账单')
    this.$router.push('/account-list')
  }

  report() {
    this.$toast('报表')
  }
}
</script>
<style lang="scss" scoped>
.receipt_img {
  width: 50px;
  height: 50px;
}
.header-b {
  padding: 15px 0;
  text-align: center;
}
</style>
