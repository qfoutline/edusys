// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from "axios";
import App from './App';
import router from './router';

// Vuex
import store from './store';

// UI
import {Loading} from 'element-ui';

Vue.config.productionTip = false;

// 刷新：读取本地存储信息，并同步vuex
let currentUser = localStorage.getItem('currentUser');
if(currentUser){
  currentUser = JSON.parse(currentUser);
  store.commit('changeCurrentUser',currentUser);

  // 发送token到后端验证
  if(currentUser.Authorization){
    axios.defaults.headers.common['Authorization'] = currentUser.Authorization
  }
}


// axios配置
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://localhost:10001';
var loadinginstace;
axios.interceptors.request.use(config => {
	if (config.method == 'get') {
		// get请求为简单请求，默认设置content-type不会生效
		// 所以做个条件判断
		config.data = true
	}


	// element ui Loading方法
	loadinginstace = Loading.service({ fullscreen: true });
	return config;
}, error => {
	loadinginstace.close();
	Message.error({
		message: '加载超时'
	});
	return Promise.reject(error);
});

// 响应拦截：关闭loading效果
axios.interceptors.response.use(response => {console.log(router.history.current.name)
  loadinginstace.close();
  
  // 如果后端验证token不通过,则在响应头中设置Authorization
  // 跳转到登录页面
  // if(response.headers.Authorization && router.history.current.name != 'Login'){
  //   router.push({
  //     name:'Login'
  //   })
  // }

  // 静默登录
  if(response.headers.Authorization){
    currentUser.Authorization = currentUser.name + '|' + response.headers.Authorization
  }

	return response;
}, error => {
	loadinginstace.close();
	Message.error({
		message: '加载失败'
	});
	return Promise.reject(error);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render:h=>h(App)
})
console.log('main.js',currentUser)