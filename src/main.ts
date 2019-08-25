import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import './reuqest'
import util from '@/util'
import { Row, Col, Field, Tabbar, TabbarItem, NoticeBar, Dialog, Button, NavBar, Swipe, SwipeItem, Icon, ActionSheet, Panel, Popup, DatetimePicker, Tab, Tabs,Switch,CellGroup} from 'vant';
import 'vant/lib/index.css'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies).use(Row).use(Col).use(Field).use(Tabbar).use(TabbarItem).use(NoticeBar).use(Dialog).use(Button).use(NavBar).use(Swipe)
    .use(SwipeItem).use(Icon).use(ActionSheet).use(Panel).use(Popup).use(DatetimePicker).use(Tab).use(Tabs).use(Switch).use(CellGroup);
Vue.config.productionTip = false
Vue.prototype.util = util
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
