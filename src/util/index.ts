import CryptoJS from 'crypto-js';
// let apiStr = ''
// switch (process.env.NODE_ENV) {
//     case 'dev':
//         apiStr = 'http://10.6.12.122/apis/'
//         break;
//     case 'test':
//         apiStr = 'https://cf-test.kangmei.com.cn/apis/'
//         break;
//     case 'uat':
//         apiStr = ' https://cf-uat.kangmei.com.cn/apis/'
//         break;
//     case 'prod':
//         apiStr = ' https://cf.kangmei.com.cn/apis/'
//         break;
// }
export default {
    // 'requestApi' : 'http://103.194.105.9:8100/',
     'requestApi' : process.env.VUE_APP_BASEURL,
    getUrlParams () {
        let url = window.location.href.split('#')[0];
        let Request:any = new Object();
        if (url.indexOf("?") != -1) {
            var str = url.slice(url.indexOf('?') + 1);
            var strs = str.split("&");
            for(var i = 0; i < strs.length; i ++) {
              Request[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
            }
        } else {
            Request.type = window.location.href.split('#')[1]
        }
        return Request;
    }, // 获取浏览器参数
    S4():any {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    guid():any {
        return (
            this.S4() +
            this.S4() +
            "-" +
            this.S4() +
            "-" +
            this.S4() +
            "-" +
            this.S4() +
            "-" +
            this.S4() +
            this.S4() +
            this.S4()
        );
    },
    encrypt(word:any){
        var key = CryptoJS.enc.Utf8.parse("bWFsbHB3ZA==WNST");
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
    //解密
    decrypt(word:any){
        var key = CryptoJS.enc.Utf8.parse("bWFsbHB3ZA==WNST");
        var decrypt = CryptoJS.AES.decrypt(word, key, {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    }
}
