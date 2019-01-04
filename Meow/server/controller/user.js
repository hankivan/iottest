const express = require('express')
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const createToken = require('../middleware/createToken.js')
const sha1 = require('sha1')
const checkToken = require('../middleware/checkToken.js')

//gcloud import
const gcloud = require('@google-cloud/datastore')
const datastore = gcloud({
  projectId: 'datastore-197307',
  keyFilename: 'server/gcloud/datastore-2fa60a27cb72.json',
});


// 注册
const test234 = (req, res) => {
	console.log('test000');
	//Query delacration
	const query_user = datastore
	  .createQuery(req.body.company,'member')
		.filter('user', '=', req.body.user);
  const query_email = datastore
		.createQuery(req.body.company,'member')
	  .filter('email', '=', req.body.email);
	const query_company = datastore
		.createQuery('Aortac','companyinfo')
		.filter('company', '=', req.body.company);

  //key delacration
	let key = datastore.key({
		namespace: req.body.company,
		path: ['member']
  });
	let key_aortac = datastore.key({
		namespace: 'Aortac',
		path:['companyinfo']
	})

	//entity define
	let send_date;
  let entity = {};
	send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
	entity = {
		key: key,
		data: {
			company:  req.body.company,
			user:  req.body.user,
			email:  req.body.email,
			pass:   sha1(req.body.password),
			date : send_date
		}
	};
  let entity_company = {};
	entity_company = {
		key: key_aortac,
		data: {
			company: req.body.company,
			date
		}

	}

	//datastore function
	datastore.runQuery(query_user, function(err_user, entities_user, info_user) {
		console.log(entities_user[0]);
		if(entities_user[0]){
			console.log('user name taken');
			res.json({
				success: false
			})
		}
		else {
			datastore.runQuery(query_email, function(err_email, entities_email, info_email) {
				if(entities_email[0]){
				  console.log('email taken');
				  res.json({
					  success: false
				  })
				}
				else{
					console.log('send ok');
					datastore.save(entity, function(err) {
					})
					res.json({
						success: false
					})
				}
			})
		}
	}) //datastore function end

}//datastore loading end

// 注册
const Register111 = (req, res) => {
	console.log('test000111');
	let userRegister = new model.User({
		email: req.body.email,
		password: sha1(req.body.password),
		recheck: req.body.recheck,
		token: createToken(this.email)
	})

	// 将 objectid 转换为 用户创建时间
	userRegister.create_time = moment(objectIdToTimestamp(userRegister._id))
		.format('YYYY-MM-DD HH:mm:ss');

	model.User.findOne({
		email: (userRegister.email)
			.toLowerCase()
	}, (err, doc) => {
		if(err) console.log(err)
		// 用户名已存在，不能注册
		if(doc) {
			res.json({
				success: false
			})
		} else {
			userRegister.save(err => {
				if(err) console.log(err)
				console.log('register success')
				res.json({
					success: true
				})
			})
		}
	})
}

//Login datastore
const Login111 = (req, res) => {
	console.log('Login test');
	const query_user = datastore
	  .createQuery(req.body.company/*req.body.companyname*/,'member')
		.filter('user', '=', req.body.user);
	const query_email = datastore
		.createQuery(req.body.company,'member')
		.filter('email', '=', req.body.email);
	const query_company = datastore
		.createQuery('Aortac','companyinfo')
		.filter('company', '=', req.body.company);
	//key delacration
	let key = datastore.key({
		namespace: req.body.company,
		path: ['member']
	});
	let key_aortac = datastore.key({
		namespace: 'Aortac',
		path:['companyinfo']
	})

	//entity define
	let send_date;
  let entity = {};
	send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
	entity = {
		key: key,
		data: {
			company:  req.body.company,
			user:  req.body.user,
			email:  req.body.email,
			pass:   sha1(req.body.password),
			date : send_date
		}
	};
	//datastore function
	datastore.runQuery(query_company, function(err_company, entities_company, info_company) {
		console.log(entities_company[0]);
		if(entities_company[0]){
			console.log('company name taken');
			res.json({
				success: false
			})
		}
		else {
			datastore.runQuery(query_email, function(err_email, entities_email, info_email) {
				if(entities_email[0]){
				  console.log('email taken');
				  res.json({
					  success: false
				  })
				}
				else{
					console.log('send ok');
					datastore.save(entity, function(err) {
					})
					res.json({
						success: false
					})
				}
			})
		}
	})//datastore function end
}//login end

// 登录
const Login = (req, res) => {
	let userLogin = new model.User({
		email: req.body.email,
		password: sha1(req.body.password),
		token: createToken(this.email)
	})
	model.User.findOne({ email: userLogin.email }, (err, doc) => {
		if(err) console.log(err)
		if(!doc) {
			console.log("账号不存在");
			res.json({
				info: false
			})
		} else if(userLogin.password === doc.password) {
			console.log('登录成功')
			var name = req.body.email;
			res.json({
				success: true,
				email: doc.email,
				// 账户创建日期
				time: moment(objectIdToTimestamp(doc._id))
					.format('YYYY-MM-DD HH:mm:ss'),
				// token 信息验证
				token: createToken(name)
			})
		} else {
			console.log('密码错误')
			res.json({
				success: false
			})
		}
	})
}

// 所有用户打印
const User = (req, res) => {
	model.User.find({}, (err, doc) => {
		if(err) console.log(err)
		res.send(doc)
	})
}

// 删除用户
const delUser = (req, res) => {
	model.User.findOneAndRemove({ _id: req.body.id }, err => {
		if(err) console.log(err)
		console.log('删除用户成功')
		res.json({
			success: true
		})
	})
}

module.exports = (router) => {
	  router.post('/register', test234),
		router.post('/login', Login111),
		router.get('/user', checkToken, User),
		router.post('/delUser', checkToken, delUser)
		//router.post('/usertest', AddNewAccount)
}
