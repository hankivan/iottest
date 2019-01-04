import api from '../axios'
import Vue from 'vue'
import router from '../routes/index'
import * as types from './types'

export default {
	UserLogin({ commit }, data) {
		commit(types.LOGIN, data)
	},

	UserLogout({ commit }) {
		commit(types.LOGOUT)
	},

	UserName({ commit }, data) {
		commit(types.USERNAME, data)
	},
	Renew({ commit }, data){
		commit(types.RENEW, data)
	},
	SetLanguage({ commit }, lang) {
		commit(types.LANGUAGE, lang);
	},
	EdiTab({ commit }, data){
		commit(types.EDITAB, data)
	}
}
