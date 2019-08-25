<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="日报">内容 1</van-tab>
      <van-tab title="周报">内容 2</van-tab>
      <van-tab title="月报">内容 3</van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Report extends Vue {
  private active: boolean = true
}
</script>
<style lang="scss">
</style>

