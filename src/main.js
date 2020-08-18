import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
// import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import { JSEncrypt } from 'jsencrypt'

Vue.prototype.$encryptedData = function(publicKey, data) {
  //new一个对象
  let encrypt = new JSEncrypt()
  //设置公钥
  encrypt.setPublicKey(publicKey)
  //password是要加密的数据,此处不用注意+号,因为rsa自己本身已经base64转码了,不存在+,全部是二进制数据
  let result = encrypt.encrypt(data)
  return result
}
//JSEncrypt解密方法
Vue.prototype.$decryptData = function(privateKey, data) {
  // 新建JSEncrypt对象
  let decrypt = new JSEncrypt()
  // 设置私钥
  decrypt.setPrivateKey(privateKey)
  // 解密数据
  let result = decrypt.decrypt(data)
  return result
}

// import 'quill/dist/quill.bubble.css';
import * as Quill from 'quill'; // 富文本基于quill
Vue.use(VueQuillEditor)
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('ms_userInfo')
  if (!role && to.path !== '/login') {
    next('/login');
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === 'yumoer22' ? next() : next('/403');
    window.scrollTo(0,0)
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }

});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
