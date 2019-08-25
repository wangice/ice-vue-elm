import axios from 'axios'
import util from '@/util'
import { Toast } from 'vant';
import Vue from 'vue'
import qs from 'qs'
import {router} from '@/router'
import VueCookies from 'vue-cookies'


axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;
axios.defaults.headers['x-requested-with'] = 'XMLHttpRequest';
axios.interceptors.request.use((req:any):any => {
    // req.headers.phoneNumber = window.localStorage.getItem('phoneNumber') || '';
   return req
}, (error:any) => {
})
axios.interceptors.response.use((response:any):any => {
        return response
},(error:any) => {
    if(error.response.status === 403){//后台拦截了，则进入到登录页面
        (VueCookies as any).remove('phoneNumber');
        router.push('/login');
        return;
    }else if(error.response.status === 302 && (VueCookies as any).get('phoneNumber') != null){
        (VueCookies as any).remove('phoneNumber');
        router.push('/login');
        return;
    }
    Toast('请求失败');
    return error
// 对响应错误做点什么
})
const post = (url: any, params?: any, option ?: any) => {
    return new Promise((resolve, reject) => {
        if (option && option.from) {
            option.headers = {
                "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
            }
            option.transformRequest = [function (data: any) {
                data = qs.stringify(data)
                return data;
            }]
        };
        axios.post(url, params, option).then((res: any) => {
            resolve(res);
        }).catch((err: any) => {
            reject(err);
         });
     });
};
Vue.prototype.$post = post;
// 将axios 的 get 方法，绑定到 vue 实例上面的 $get
const get =  (url: any, params?: any, option ?: any) => {
    return new Promise((resolve, reject) => {
        if (option && option.from) {
            option["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8'
        };
        axios.get(url, { params: params , headers : option}).then((res: any) => {
            resolve(res); // 返回请求成功的数据 data
        }).catch((err: any) => {
            reject(err);
        });
    });
};
Vue.prototype.$get = get;
// export const get = (url:any, params:object = {}) => {
//     return new Promise((resolve, reject) => {
//         axios.get(url, {
//             params
//         }).then(response => {
//             resolve(response);
//         }).catch(err => {
//             reject(err);
//         })
//     })
// }

// export const post = (url:any, data:object = {}) => {
//     return new Promise((resolve, reject) => {
//         axios.post(url, data).then(response => {
//             resolve(response);
//         }).catch(err => {
//             reject(err);
//         })
//     })
// }

// export const put = (url:any, data:object = {}) => {
//     return new Promise((resolve, reject) => {
//         axios.put(url, data).then(response => {
//             resolve(response);
//         }).catch(err => {
//             reject(err);
//         })
//     })
// }

// export const deleteFn = (url:any, data:object = {}) => {
//     return new Promise((resolve, reject) => {
//         axios.delete(url, {
//             data
//         }).then(response => {
//             resolve(response);
//         }).catch(err => {
//             reject(err)
//         })
//     })
// }

export const $post = post;
export const $get = get;
