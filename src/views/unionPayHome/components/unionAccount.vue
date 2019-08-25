<template>
  <van-row type="flex" justify="space-around">
    <van-col span="8">
      <div class="union-home-account-icon">
        <van-icon name="balance-o" size="30px"/>
      </div>
      <div class="union-home-account-desc">
        <div>账户余额(元)</div>
        <div>0.00</div>
      </div>
    </van-col>
    <van-col span="8">
      <div class="union-home-account-icon">
        <van-icon name="balance-o" size="30px"/>
      </div>
      <div class="union-home-account-desc">
        <div>账户余额(元)</div>
        <div>0.00</div>
      </div>
    </van-col>
  </van-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class UnionAccount extends Vue {}
</script>
<style lang="scss" scoped>
.union-home-account-icon{
    float: left;
    margin: 8px 0 8px 0
}
.union-home-account-desc{
    float: right;
}
</style>