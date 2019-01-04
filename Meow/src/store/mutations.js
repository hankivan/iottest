import * as types from './types'
import api from '../axios'

const mutations = {
	[types.LOGIN]: (state, data) => {
		localStorage.setItem('token', data)
		// localStorage.token = data
		state.token = data
	},
	[types.LOGOUT]: (state) => {
		localStorage.removeItem('token');
		state.token = null
	},
	[types.USERNAME]: (state, data) => {
		localStorage.setItem('username', data)
		state.username = data
	},
	[types.RENEW]: (state, data) =>{
		state.forminfo.host = data;
	},
	[types.LANGUAGE]: (state, setlang) =>{
		state.lang = setlang;
		//set Vue config 將會改變i18n 使用的語言包而更改語系
		Vue.config.lang = state.lang;
	},
	[types.EDITAB]: (state, data) =>{
		const action = data.action
		const targetName = data.targetName
		var tabs = state.tabs
		var tabIndex = state.tabIndex
		var tabsValue = state.tabsValue
		console.log()
		//增加tab並給予名稱
		if (action === 'add') {
			if(tabs.length<10){
				console.log(tabIndex)
				let newTabName = ++tabIndex + '';
				//new tab 命名
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth();
				let day = date.getDate();
				let newtitle = String(year)+('0'+String(month+1)).substr(-2)+('0'+String(day)).substr(-2)+'0001';
				for(let i=0;i<tabs.length;i++){
					if(newtitle==tabs[i].title){
						if(newtitle.slice(-3)>9998){
							alert('cannot over 10000 sheets a day!!!')
						}else{
						newtitle = String(Number(newtitle)+1)
						}
					}
				}
				state.tabsValue = newTabName;
				//前端增加tab
				tabs.push({
					title: newtitle,
					name: newTabName,
				});
				let newform = 'forminfo'+newTabName
				let info = {};
				info.index = newTabName;
				info.Name = newform
				info.title = newtitle
				console.log()
				state.tabIndex = tabIndex
				//資料庫暫存增加個別tab
				api.insertTab(info).then(({
						data
				}) => {
						if (data.success) {
								console.log('ui tab insert!');
						} else {
								console.log('ui tab not insert!')
						}
				}).catch((err) => {
						console.log(err);
				})

				tabsValue = newTabName;
				state.activeTab=tabIndex-1;
			}else{
				//alert cannot over 10 tabs
				this.$message({
				showClose: true,
				message: 'cannot over 10 tabs',
				type: 'warning'
				});
			}
		}
		//移除tab
		if (action === 'remove') {
			tabIndex = tabIndex-1
			console.log()
			let activeName = tabsValue;
			if (activeName === targetName) {
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						let nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
							activeName = nextTab.name;
						}
					}
				});
			}
			console.log()
			state.tabsValue = activeName;
			tabs = tabs.filter(tab => tab.name !== targetName);
			state.tabs = tabs
			let x = Number(targetName)
			//console.log(x)
			let info = {index:String(x)}
			console.log(info)
			//this.$store.state.activeTab=this.tabIndex;
			//console.log(typeof(this.tabIndex))
		//從資料庫暫存刪除個別tab
		api.delTab(info).then(({
				data
		}) => {
				if (data.success) {
						console.log('ui tab deleted');
				} else {
						console.log('ui tab not deleted!')
				}
		}).catch((err) => {
				console.log(err);
		})
	}
	}
}
export default mutations
