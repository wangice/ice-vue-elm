<template>
  <van-row type="flex" justify="space-around">
      <van-col span="6">
          <van-icon name="arrow-left" size="14" />
          <span>前一天</span>
      </van-col>
      <van-col span="12"></van-col>
      <van-col span="6">
          <span>后一天</span>
          <van-icon name="arrow" size="14" />
      </van-col>
  </van-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class DayReportTime extends Vue {
  
}
</script>
<style lang="scss">
</style>