import axios from 'axios'
import router from './routes/index'
import store from './store/index'
import * as types from './store/types'

//
axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	if(localStorage.getItem('token')) {
		config.headers.Authorization = `token ${localStorage.getItem('token')}`
			.replace(/(^\")|(\"$)/g, '')
	}
	return config
}, err => {
	return Promise.reject(err)
})
// axios拦截响应

instance.interceptors.response.use(response => {
	return response
}, err => {
	return Promise.reject(err)
})


export default {
	// 用户注册
	userRegister(data) {
		return instance.post('/api/register', data)
	},
	// 用户登录
	UserLogin(data) {
		return instance.post('/api/login', data)
	},
	// 获取用户
	getUser() {
		return instance.get('/api/user')
	},
	// 删除用户
	delUser(data) {
		return instance.post('/api/delUser', data)
	},
	delTab(data) {
		return instance.post('/api/delTab', data)
	},
	delItem(data) {
		return instance.post('/api/delItem', data)
	},
	// 獲取單據
	getSheet(data) {
		return instance.post('/api/getSheet', data)
	},
	// 獲取tab
	getTab() {
		return instance.get('/api/getTab')
	},
	getInfo(data) {
		return instance.post('/api/getInfo', data)
	},
	getFilter(data) {
		return instance.post('/api/getFilter', data)
	},
	getStatistic(data) {
		return instance.post('/api/getStatistic', data)
	},
	// 輸入tab
	insertTab(data) {
		return instance.post('/api/insertTab', data)
	},
	// 輸入seller
	insert(data) {
		return instance.post('/api/insert', data)
	},
	dataSave(data) {
		return instance.post('/api/dataSave', data)
	}
}
