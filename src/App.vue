<template>
  <div id="app" :class="$route.meta.type == 'app' ? 'moblie' : ''">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style lang="scss">
@import url('./assets/common.scss');
</style>
