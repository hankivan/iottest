import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
	scales:[{
					value: 1,
					label: '100%'
					},{
					value: 1.25,
					label: '125%'
					},{
					value: 1.5,
					label: '150%'
				}],
	sacle:'',
	porportion: 1,
	filterdata: [],
	lang: 'tw',
	token: null,
	username: '',
	tabsValue: '',
	tabIndex: 0,
	tabs:[],
	companies:[],
	sheets:[{
          value: 'PurchaseOrder',
          label: 'PurchaseOrder'
        	}, {
          value: '進貨單',
          label: '進貨單'
        	}, {
          value: '出貨單',
          label: '出貨單'
        	}, {
          value: '發票',
          label: '發票'
					}],
	statisticdata:
		[{ Number: '',
			Item: '',
			Description: '',
			Price: '',
			Unit: '',
			Quantity: '' },],
	activeTab: '0',
	//tabs 10 data
	forminfo0: {},
	forminfo1: {},
	forminfo2: {},
	forminfo3: {},
	forminfo4: {},
	forminfo5: {},
	forminfo6: {},
	forminfo7: {},
	forminfo8: {},
	forminfo9: {},
	forminfox:{
		seller:
		{ Name:'',
			Telephone:'',
			Fax:'',
			Address:'',
			Contact:'' },
		buyer:
		{ Name:'',
			Telephone:'',
			Fax:'',
			Address:'',
			Contact:'' },
		sheetinfo:
		{	Sheetkind:'',
			Sheetnumber:'',
			Currentdate:'',
			Duedate:'',
			Balancedue:'',
			Shippingdate:'' },
		iteminfo:
			[{ Number: '',
				Item: '',
				Description: '',
				Price: '',
				Unit: '',
				Quantity: ''}],
			},
	cal: {
		Pretax:'',
		Tax:'',
		Shipping:'',
		Discount:'',
	},
	management: [{
		Type:'',
		Number:'',
		Partner:'',
		Sum:'',
		Date:'',
		Status:'',
	},
	]
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})
