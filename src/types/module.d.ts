import {Route} from 'vue-router'
import VueRouter from 'vue-router'
declare module "vue/types/vue" {
  interface Vue {
    $router: VueRouter,
    $post: any,
    $get:any,
    $route: Route,
    util: any
    $ref:{
      audio: HTMLAudioElement
    }
  }
}