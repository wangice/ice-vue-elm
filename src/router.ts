import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VueCookies from 'vue-cookies'
Vue.use(Router)

export const router = new Router({
    base: '/elm/',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import(/* webpackChunkName: "about" */ './views/login/login.vue')
        }, {
            path: '/resetPwd',
            name: 'resetPwd',
            component: () => import(/* webpackChunkName: "about" */ './views/resetPwd/index.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "about" */ './views/home/index.vue')
        }, {
            path: '/city',
            name: 'city',
            component: () => import(/* webpackChunkName: "about" */ './views/city/index.vue')
        },
        {
            path: '/',
            name: 'home',
            redirect: '/union-pay-home',
            component: () => import(/* webpackChunkName: "about" */ './views/Home.vue'),
            children: [
                {
                    path: 'union-pay-home',
                    name: 'union-pay-home',
                    meta: {
                        title: '首页',
                        // type: 'app'
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/unionPayHome/index.vue')
                }, {
                    path: 'receipt-code',
                    name: 'receipt-code',
                    meta: {
                        title: '收款',
                        type: 'receipt-code',
                        left: true,
                        right: true
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/receiptCode/index.vue')
                }, {
                    path: "account-list",
                    name: "account-list",
                    meta: {
                        title: '账单',
                        type: 'account-list',
                        left: true,
                        right: false
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/account/index.vue')
                }, {
                    path: "account-detail",
                    name: "account-detail",
                    meta: {
                        title: '账单明细',
                        type: 'account-detail',
                        left: true,
                        right: false
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/accountDetail/index.vue')
                }
            ]
        },
        {
            path: '/account',
            name: 'account',
            component: () => import(/* webpackChunkName: "about" */ './components/PublicUserInfo.vue'),
            children: [
                {
                    path: 'user-info',
                    name: 'user-info',
                    meta: {
                        title: '个人信息'
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/userInfo.vue')
                },
                {
                    path: 'card-info',
                    name: 'cardInfo',
                    meta: {
                        title: '银行卡信息'
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/cardInfo.vue')
                },
                {
                    path: 'withdraw-deposit',
                    name: 'withdraw-deposit',
                    meta: {
                        title: '提现'
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/withdrawDeposit.vue')
                },
                {
                    path: 'grab-single-log',
                    name: 'grab-single-log',
                    meta: {
                        title: '抢单记录',
                        // type: 'app'
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/grabSingleLog.vue')
                },
                {
                    path: 'charge-log',
                    name: 'charge-log',
                    meta: {
                        title: '充值记录',
                        // type: 'app'
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/chargeLog.vue')
                },
                {
                    path: 'withdraw-weposit-log',
                    name: 'withdraw-weposit-log',
                    meta: {
                        title: '提现记录',
                        // type: 'app'
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/withdrawDepositLog.vue')
                },
                {
                    path: 'qr-code',
                    name: 'qr-code',
                    meta: {
                        title: '收款码',
                        // type: 'app'
                    },
                    component: () => import(/* webpackChunkName: "about" */ './views/qrCode.vue')
                }
            ]
        }
    ]
})
// router.beforeEach((to:any, from:any, next:any):any => {
//  if ((VueCookies as any).get('phoneNumber')) {
//     next();
//  } else {
//    to.path === '/login' ? next() : next({path: '/login'})
//  }

// })
