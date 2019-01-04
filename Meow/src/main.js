// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
//import locale from 'element-ui/lib/locale/lang/en';
import Vue from 'vue';
import App from './App';
//import VueRouter from 'vue-router';
//import tw from './i18n/tw'; // 存放繁體中文翻譯
import VueI18n from 'vue-i18n';
import router from './routes';
import axios from './axios'
import store from './store/index.js'

fontawesome.library.add(solid);

Vue.config.productionTip = false;
Vue.use(ElementUI);
//Vue.use(ElementUI, { locale });
Vue.use(VueI18n);
//Vue.use(VueRouter);
const locale = localStorage.getItem('locale') || 'tw'
const i18n = new VueI18n({
  locale: 'tw',
  messages: {
		'tw': require('./i18n/tw')
	}
})



/*
const router = new VueRouter({
  routes: Routes,

});
*/
Vue.component('font-awesome-icon', FontAwesomeIcon);

/* eslint-disable no-new */
new Vue({
		axios,
		store,
		router,
		i18n,
		render: h => h(App)
	})
	.$mount('#app')

export default i18n
