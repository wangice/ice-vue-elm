<template>
  <div class="receipt">
    <div class="receipt-code">
      <h3>扫一扫，向我付钱</h3>
      <div class="receipt-qrcode">
        <img />
      </div>
      <van-row>
        <van-col>
          设置金额
        </van-col>
        <van-col>

        </van-col>
        <van-col>
          保存收款码
        </van-col>
      </van-row>
    </div>

    <van-action-sheet v-model="getSheetShow" :actions="actions" :overlay="false" @select="onSheetSelect" cancel-text="取消"
      @cancel="cancelSheet" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import {ISheet} from '@/api/data'


const openSheet = [{ name: '开启收款到账语音提醒' }]
const shutDownSheet = [{ name: '开启收款到账语音提醒' }]

@Component
export default class ReceiptCode extends Vue {
  private actions: ISheet[] = []

  private sheetShow: boolean = false

  mounted() {
    //判断store中状态
    this.actions = openSheet
  }

  onSheetSelect(item: any) {
    //下拉菜单选择
    AppModule.setSheetShow(false) // 手动关闭
  }

  cancelSheet() {
    AppModule.setSheetShow(false) // 手动关闭
  }

  get getSheetShow() {
    return AppModule.sheetShow
  }

  set getSheetShow(state: boolean) {}
}
</script>
<style lang="scss" scoped>
</style>

