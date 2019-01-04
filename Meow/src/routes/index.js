import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'


Vue.use(Router)

const router = new Router({
	//don't want # mark
	//mode: 'history',
	//define scroll position
	scrollBehavior(to, from, savedPosition){
		if(savedPosition){
			return savedPosition
		}else{
			return { x: 0, y: 0}
		}
	},
	//avoid browser unsupport single page system
	fallback: true,
	routes: [
    {
			path: '/',
			name: 'Hello',
			component(resolve) {
				require.ensure(['@/components/Basic.vue'], () => {
					resolve(require('@/components/Basic.vue'));
				});
			},
			// 设置 mata 字段，表示该字段需要验证
			meta: {
				requireAuth: true
			}
		},
		// 简单设置404页面
		{
			path: '*',
			component(resolve) {
				require.ensure(['@/components/404.vue'], () => {
					resolve(require('@/components/404.vue'));
				});
			},
			hidden: true
		}
	]
})

// 验证 token，存在才跳转
/*router.beforeEach((to, from, next) => {
	let token = localStorage.getItem('token')
	if(to.meta.requireAuth) {
		if(token) {
			next()
		} else {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			})
		}
	} else {
		next()
	}
})*/

export default router
