const express = require('express')
const router = express.Router()
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')
const createToken = require('../middleware/createToken.js')
const sha1 = require('sha1')
const checkToken = require('../middleware/checkToken.js')

//gcloud setting
const gcloud = require('@google-cloud/datastore')
const datastore = gcloud({
  projectId: 'key-prism-224413',
  keyFilename: 'server/gcloud/key-prism-224413-33ac4c39f9ac.json',
});

//setting user condition
const usercompany = 'ivantest'
const useraccount = 'testuser'

// mounting tab
const getTab = (req, res) =>{
  const query_tab = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'temp')
            .filter('position','Tab')
  datastore.runQuery(query_tab, function (err_tab, entities_tab, info_tab) {
      let ent = entities_tab
      let len = ent.length
      tab = []
      for(let i=0; i<len; i++){
        tab[i] = {title:ent[i].title,
                  name:ent[i].index
        }
      }
      res.send(tab)
});
}

const getInfo = (req, res) =>{
  if(req.body.position == 'Buyer'||req.body.position == 'Seller'){
  const query_seller = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'Companyinfo')
            .filter('position',req.body.position)
  datastore.runQuery(query_seller, function (err_seller, entities_seller, info_seller) {
            res.send(entities_seller)
});
}else{
  const query_seller = datastore
            .createQuery(usercompany/*req.body.companyname*/, req.body.position)
            .filter('position',req.body.position)
  datastore.runQuery(query_seller, function (err_seller, entities_seller, info_seller) {
            res.send(entities_seller)
});
}
console.log(req.body.position)
}

/*const getSeller = (req, res) =>{
  const query_seller = datastore
            .createQuery(usercompany, 'temp')
            .filter('position','Seller')
  datastore.runQuery(query_seller, function (err_seller, entities_seller, info_seller) {
            var msgdata = []
              var keyl = Object.keys(data[0]).length
              msgdata[0] = {}
                for(i=0;i<keyl;i++){
                  for(j=0;j<keyl;j++){
                    var key = Object.keys(data[0])[j];
                    var obj = data[0];
                    var value = obj[key][0];
                    if(value==i&&key!=='index'){
                      msgdata[0][key] = obj[key][1]
                    }
                  }
                }
            res.send(entities_seller)
            console.log(entities_seller)

});
}*/
const getBuyer = (req, res) =>{
  const query_buyer = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'temp')
            .filter('position','Buyer')
  datastore.runQuery(query_buyer, function (err_buyer, entities_buyer, info_buyer) {
            res.send(entities_buyer)
            //console.log(entities_buyer)

});
}
const getSheetinfo = (req, res) =>{
  const query_sheetinfo = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'temp')
            .filter('position','Sheetinfo')
  datastore.runQuery(query_sheetinfo, function (err_sheetinfo, entities_sheetinfo, info_sheetinfo) {
            res.send(entities_sheetinfo)
            /*res.json({
            	success: true
          	})*/
            //console.log(entities_sheetinfo)

});
}
const getSheet = (req, res) =>{
  console.log(req.body)
  const query_sheet = datastore
            .createQuery(/*req.body.companyname*/)
            .limit(3)
            //.filter('Sheetnumber',req.body.sheetNumber)
  datastore.runQuery(query_sheet, function (err_sheet, entities_sheet, info_sheet) {
            //res.send(entities_statistic)
            res.json({
            	success: true,
              data: entities_sheet
          	})
            console.log(entities_sheet)
          });
}
const getIteminfo = (req, res) =>{
  const query_iteminfo = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'temp')
            .filter('position','Iteminfo')
  datastore.runQuery(query_iteminfo, function (err_iteminfo, entities_iteminfo, info_iteminfo) {
            res.send(entities_iteminfo)
            console.log(entities_iteminfo)

});
}
const getFilter = (req, res) =>{
  console.log(req.body.key,req.body.type)
  if(req.body.type == 'Seller'){
  const query_filter = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'Companyinfo')
            .filter(req.body.key,'=',req.body.value)
  datastore.runQuery(query_filter, function (err_filter, entities_filter, info_filterc) {
            console.log(entities_filter)
            if(entities_filter[0]){
              console.log(entities_filter[0][datastore.KEY])
              //res.send(entities_filter)
              res.json({
                success: true,
                data: entities_filter
              })
            }else{
              res.json({
                success: true,
                data: 'create'
              })
            }
  })
}
}
const getStatistic = (req, res) =>{
  console.log(req.body)
  if(req.body.need=='Inventories'){
  const query_statistic = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'Inventories')
  datastore.runQuery(query_statistic, function (err_statistic, entities_statistic, info_statistic) {
            //res.send(entities_statistic)
            res.json({
            	success: true,
              data: entities_statistic
          	})
            //console.log(entities_iteminfo)
          });
}else if(req.body.need=='Companies'){
  const query_statistic = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'Companyinfo')
  datastore.runQuery(query_statistic, function (err_statistic, entities_statistic, info_statistic) {
    console.log(entities_statistic)
            res.json({
            	success: true,
              data: entities_statistic
          	})
          });
}else{
  const query_statistic = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'Sheetinfo')
  datastore.runQuery(query_statistic, function (err_statistic, entities_statistic, info_statistic) {
            res.json({
            	success: true,
              data: entities_statistic
          	})
          });
}
}
const delTab = (req, res) => {
  console.log(req.body)
  const query_tab = datastore
    .createQuery(usercompany/*req.body.companyname*/, 'temp')
    .filter('index', req.body.index)
    //.filter('title', '=', req.body.title);
    datastore.runQuery(query_tab, function (err_tab, entities_tab, info_tab) {
        let tabkey = []
        for(let i=0;i<entities_tab.length;i++){
          tabkey[i]=entities_tab[i][datastore.KEY]
        }
        console.log(tabkey[0])
              //console.log(tabkey)
              datastore.delete(tabkey). then(() => {
              // Task deleted successfully.
              console.log('server tab deleted')
              res.json({
                success: true,
              })
            });
          });
}
const delItem = (req, res) => {
  console.log(req.body)
  const query_item = datastore
    .createQuery(usercompany/*req.body.companyname*/, 'Iteminfo')
    .filter('index', req.body.index)
    .filter('Number', '=', req.body.Number);
    datastore.runQuery(query_item, function (err_item, entities_item, info_item) {
        let itemkey = entities_item[0][datastore.KEY]
        console.log(itemkey)
        /*for(let i=0;i<entities_tab.length;i++){
          tabkey[i]=entities_tab[i][datastore.KEY]
        }*/
              //console.log(tabkey)
              datastore.delete(itemkey). then(() => {
                console.log('item delete')
            });
          });
}
const insertTab = (req, res) => {
  console.log(req.body)
	const query_name = datastore
            .createQuery(usercompany/*req.body.companyname*/, 'temp')
            .filter('title', '=', req.body);
    datastore.runQuery(query_name, function(err, result, info){
      console.log(result)
      /*for(let i=0;i<=result.length;i++){
        console.log('!')
      }*/
      if(result[0]){
        console.log('ohoh same tab')
      }else{
        console.log('great make new one')
      }
        let key = datastore.key({
      		namespace: usercompany,//req.body.companyname,
      		path: ['temp',req.body.Name]
        });
      	let send_date;
        let entity = {};
      	send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
      	entity = {
      		key: key,
      		data:
          { title:req.body.title,
            index:req.body.index,
            position: 'Tab'
          }
      	};
      	datastore.save(entity, function(err) {
      	res.json({
      		success: true
      	})
      })
  })
}
//將資料存於資料庫中並保留index作為暫存辨識,現以單號為辨識依據
const insert = (req, res) => {
  //let fpath = 'forminfo'+req.body.index;
  //資料為買方賣方時都存入Companyinfo
  if(req.body.position=='Seller'||req.body.position=='Buyer'){
  const query_data = datastore
            .createQuery(usercompany,'Companyinfo')
            .filter('position',req.body.position)
            .filter('index',req.body.index);
  datastore.runQuery(query_data, function (err_data, entities_data, info_data) {
            if(entities_data[0]){
              let key = entities_data[0][datastore.KEY]
              let send_date;
              let entity = {};
              send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
              entity = {
                key: key,
                data: req.body
              }
              datastore.save(entity, function(err) {
                console.log(entity)
              });
              res.json({
                success: true
              })
            }
            //have recorded
            else{
            let key = datastore.key({
              namespace: usercompany,//req.body.companyname,
              path: ['Companyinfo']});

            let send_date;
            let entity = {};
            send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
            entity = {
              key: key,
              data: req.body
            }
            //save data
            datastore.save(entity, function(err,apiResponse) {
            });
            res.json({
              success: true
            })
          }
          });
        }else if(req.body.position=='Sheetinfo'){
          const query_data = datastore
                    .createQuery(usercompany,req.body.position)
                    .filter('index',req.body.index);
          datastore.runQuery(query_data, function (err_data, entities_data, info_data) {
                    if(entities_data[0]){
                      let key = entities_data[0][datastore.KEY]
                      let send_date;
                      let entity = {};
                      send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                      entity = {
                        key: key,
                        data: req.body
                      }
                      datastore.save(entity, function(err) {
                      });
                      res.json({
                        success: true
                      })
                    }
                    //have recorded
                    else{
                      console.log(entities_data[0])
                    let key = datastore.key({
                      namespace: usercompany,//req.body.companyname,
                      path: [req.body.position]});

                    let send_date;
                    let entity = {};
                    send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                    entity = {
                      key: key,
                      data: req.body
                    }
                    console.log(entity)
                    //save data
                    datastore.save(entity, function(err,apiResponse) {
                    });
                    res.json({
                      success: true
                    })
                  }
                  });

        }else{
          const query_data = datastore
                    .createQuery(usercompany,req.body.position)
                    .filter('index',req.body.index)
                    .filter('order',req.body.order);
          datastore.runQuery(query_data, function (err_data, entities_data, info_data) {
                    //without record
                    if(entities_data[0]){
                      let key = entities_data[0][datastore.KEY]
                      let send_date;
                      let entity = {};
                      send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                      entity = {
                        key: key,
                        data: req.body
                      }
                      datastore.save(entity, function(err) {
                      });
                      res.json({
                        success: true
                      })
                    }
                    //have recorded
                    else{
                      console.log('have recorded')
                    let key = datastore.key({
                      namespace: usercompany,//req.body.companyname,
                      path: [req.body.position]});

                    let send_date;
                    let entity = {};
                    send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
                    entity = {
                      key: key,
                      data: req.body
                    }
                    console.log(entity)
                    //save data
                    datastore.save(entity, function(err,apiResponse) {
                    });
                    res.json({
                      success: true
                    })
                  }
                  });

        }
}
// new try
const dataNewSave = (req, res) =>{
  const datakind = 'Iteminfo'
  const updatedata = []
  const query_data = datastore
          .createQuery(usercompany, datakind)
          .filter('index',req.body.index)
  const event = query_data.filter('position',datakind)
  datastore.runQuery(event, function (err_data, entities_data, info_data) {
    const inv = 'Inventories'
    const query_inv = datastore
          .createQuery(usercompany, inv)
    datastore.runQuery(query_inv, function (err_inv, entities_inv, info_inv) {
      for(i=0;i<entities_data.length;i++){
        entities_data[i].Sheetnumber = req.body.sheetnumber
        delete entities_data[i].index
        delete entities_data[i][datastore.KEY]
        function myFunction(value, index, array) {
          return value.Number[1] == entities_data[i].Number[1];
          //console.log(entities_inv.findIndex(myFunction))
        }
        const filter = entities_inv.findIndex(myFunction)
        const invkey = datastore.key({
          namespace: usercompany,
          path: ['Inventories']});
        if(filter == -1){
          updatedata.push({key:invkey, data:entities_data[i]})
          console.log('no record')
        }else{
          const newkey = entities_inv[i][datastore.KEY]
          const newsum = Number(entities_data[i].Quantity[1])+Number(entities_inv[i].Quantity[1])
          entities_data[i].Quantity = [entities_data[i].Quantity[0],newsum]
          updatedata.push({key:newkey, data:entities_data[i]})
          console.log('wow I found the same thing')
        }
      }
      /*const invkey = datastore.key({
        namespace: usercompany,
        path: ['Inventories']});
      const entities = {
        key: invkey,
        data: entities_inv,
      }*/
      datastore.save(updatedata, function(err) {
        console.log(updatedata)
        console.log('save okok')
      });
    });
  });
}

// insert seller
/*const insertSeller = (req, res) => {
  let fpath = 'forminfo'+req.body.index;
  //set query
	const query_pos = datastore
            .createQuery('ivantest','temp')
            .filter('position','Seller')
            .filter('index',req.body.index);
  datastore.runQuery(query_pos, function (err_pos, entities_pos, info_pos) {
    console.log(entities_pos)

    //no record in sql
    if(entities_pos[0]){
      let key = entities_pos[0][datastore.KEY]
      let send_date;
      let entity = {};
      send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
      entity = {
        key: key,
        data: req.body
      }

      datastore.save(entity, function(err) {
      });
      res.json({
      	success: true
    	})
    }
    //have recorded
    else{
    let key = datastore.key({
      namespace: 'ivantest',//req.body.companyname,
      path: ['temp',fpath,'temp']});

    let send_date;
    let entity = {};
    send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
    entity = {
      key: key,
      data: req.body
    }
    //save data
    datastore.save(entity, function(err) {
    });
    res.json({
    	success: true
  	})
    //console.log('create new')
  }
	/*let key = datastore.key({
		namespace: 'ivantest',//req.body.companyname,
		path: ['temp',fpath,'temp']
  });*/
	/*let send_date;
  let entity = {};
	send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
	entity = {
		key: key,
		data: req.body
	};

	datastore.save(entity, function(err) {
	});
	res.json({
		success: true
	})*/
//});
/*if(req.body.position == 'Sheetinfo')
  const savecheck = datastore
            .createQuery('ivantest',req.body.position)*/
//}
/*const insertBuyer = (req, res) => {
	console.log(req.body);
  let fpath = 'forminfo'+req.body.index;
	const query_pos = datastore
            .createQuery(usercompany,'temp')
            .filter('position','Buyer')
            .filter('index',req.body.index);
  //console.log(entity)
  datastore.runQuery(query_pos, function (err_pos, entities_pos, info_pos) {
    console.log(entities_pos)
    if(entities_pos[0]){
      //key = (entities_pos[0][datastore.KEY]);
      let key = entities_pos[0][datastore.KEY]
      let send_date;
      let entity = {};
      send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
      entity = {
        key: key,
        data: req.body
      }

      datastore.save(entity, function(err) {
      });
      res.json({
      	success: true
    	})
      //console.log('update buyer')
    }
    else{
    let key = datastore.key({
      namespace: usercompany,//req.body.companyname,
      path: ['temp',fpath,'temp']});

    let send_date;
    let entity = {};
    send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
    entity = {
      key: key,
      data: req.body
    }

    datastore.save(entity, function(err) {
    });
    res.json({
    	success: true
  	})
    //console.log('create new buyer')
  }
});
}
const insertSheetinfo = (req, res) => {
  let fpath = 'forminfo'+req.body.index;
	const query_pos = datastore
            .createQuery(usercompany,'temp')
            .filter('position','Sheetinfo')
            .filter('index',req.body.index);
  //console.log(entity)
  datastore.runQuery(query_pos, function (err_pos, entities_pos, info_pos) {
    console.log(entities_pos)
    if(entities_pos[0]){
      //key = (entities_pos[0][datastore.KEY]);
      let key = entities_pos[0][datastore.KEY]
      let send_date;
      let entity = {};
      send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
      entity = {
        key: key,
        data: req.body
      }
      datastore.save(entity, function(err) {
      });
      res.json({
      	success: true
    	})
      console.log('update sheet')
    }
    else{
    let key = datastore.key({
      namespace: usercompany,//req.body.companyname,
      path: ['temp',fpath,'temp']});

    let send_date;
    let entity = {};
    send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
    entity = {
      key: key,
      data: req.body
    }

    datastore.save(entity, function(err) {
    });
    res.json({
    	success: true
  	})
    console.log('create new sheet')
  }
});
}
const insertIteminfo = (req, res) => {
  console.log(req.body)
  let fpath = 'forminfo'+req.body.index;
	const query_pos = datastore
            .createQuery(usercompany,'temp')
            .filter('position','Iteminfo')
            .filter('index',req.body.index)
            .filter('order','=',req.body.order);
  //console.log(entity)
  datastore.runQuery(query_pos, function (err_pos, entities_pos, info_pos) {
    console.log(entities_pos)
    if(entities_pos[0]){
      //key = (entities_pos[0][datastore.KEY]);
      let key = entities_pos[0][datastore.KEY]
      let send_date;
      let entity = {};
      send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
      entity = {
        key: key,
        data: req.body
      }
      console.log(entity)
      datastore.save(entity, function(err) {
      });
      res.json({
      	success: true
    	})
      //console.log('update item')
    }
    else{
    let key = datastore.key({
      namespace: usercompany,//req.body.companyname,
      path: ['temp',fpath,'temp']});

    let send_date;
    let entity = {};
    send_date = moment().format('MMMM Do YYYY, h:mm:ss a');
    entity = {
      key: key,
      data: req.body
    }

    datastore.save(entity, function(err) {
    });
    res.json({
    	success: true
  	})
    //console.log('create new item')
  }
});
}*/
const dataSave = (req, res) =>{
  //transfer data from temp to SQL
  function temp2store(datakind){
    //setting query
    const query_data = datastore
            .createQuery(usercompany, datakind)
            .filter('index',req.body.index)
    const event = query_data.filter('position',datakind)
    datastore.runQuery(event, function (err_data, entities_data, info_data) {
      if(datakind=='Iteminfo'){
        //handle data
        for(i=0;i<entities_data.length;i++){
          entities_data[i].Sheetnumber = req.body.sheetnumber
          delete entities_data[i].index
        }
        console.log(entities_data)
        let key = datastore.key({
          namespace: usercompany,//req.body.companyname,
          path: [datakind]
        });
        entity = {
          key: key,
          data: entities_data
        }
        const check = datastore
                  .createQuery(usercompany,datakind)
                  .filter('Number','=',entities_data[0].Number[1])
        datastore.runQuery(check, function(err,checkresult,info){
          if(checkresult[0]){
            console.log(checkresult)
            console.log('already have this kind of item')
          }else{
            datastore.save(entity, function(err) {
              console.log(checkresult)
              console.log('new items save')
            });
          }
        })
      }else{
              //res.send(entities_buyer)
              //console.log(entities_data[0])
              entities_data[0].Sheetnumber = req.body.sheetnumber
              delete entities_data[0].index
              delete entities_data[0][datastore.KEY]
              if(datakind=='Seller'||datakind=='Buyer'){
                let key = datastore.key({
                  namespace: usercompany,//req.body.companyname,
                  path: ['Companyinfo']
                });
                entity = {
                  key: key,
                  data: entities_data[0]
                }
                //console.log(entity)
                const check = datastore
                          .createQuery(usercompany/*req.body.companyname*/, 'Companyinfo')
                          .filter('Name','=',entities_data[0].Name[1])
                datastore.runQuery(check, function(err,checkresult,info){
                  if(checkresult[0]){
                    console.log('already have this company')
                  }else{
                    datastore.save(entity, function(err) {
                    });
                  }
                })
              }else{
              let key = datastore.key({
                namespace: usercompany,//req.body.companyname,
                path: [datakind]
              });
              entity = {
                key: key,
                data: entities_data[0]
              }
              if(datakind=='Sheetinfo'){
                const check = datastore
                          .createQuery(usercompany/*req.body.companyname*/,datakind)
                          .filter('Sheetnumber','=',entities_data[0].Sheetnumber)
                      datastore.runQuery(check, function(err,checkresult,info){
                        if(checkresult[0]){
                          console.log('already have this sheet')
                        }else{
                          datastore.save(entity, function(err) {
                            console.log('new sheet save')
                          });
                        }
                      })
              }/*else{
              const check = datastore
                        .createQuery('ivantest'/*req.body.companyname*//*,datakind)
                        .filter('Number','=',entities_data[0].Number[1])
              datastore.runQuery(check, function(err,checkresult,info){
                if(checkresult[0]){
                  console.log(checkresult)
                  console.log('already have this kind of item')
                }else{
                  datastore.save(entity, function(err) {
                    console.log(checkresult)
                    console.log('new items save')
                  });
                }
              })
            }*/
          }
        }
  });

  }
  //temp2store('Buyer');
  //temp2store('Seller');
  //temp2store('Sheetinfo');
  temp2store('Iteminfo');
  /*const s2c = query_data.filter('position','Seller')
  datastore.runQuery(s2c, function (err_data, entities_data, info_data) {
            //res.send(entities_buyer)
            entities_data[0].Sheetnumber = req.body.sheetnumber
            let pos = entities_data.position
            //console.log(entities_data[0])
            delete entities_data[0][datastore.KEY]
            let key = datastore.key({
              namespace: 'ivantest',//req.body.companyname,
              path: ['Companyinfo']
            });
            entity = {
              key: key,
              data: entities_data[0]
            }
            //console.log(entity)
            const check = datastore
                      .createQuery('ivantest'/*req.body.companyname*//*, 'Companyinfo')
                      .filter('Name','=',entities_data[0].Name[1])
            datastore.runQuery(check, function(err,checkresult,info){
              if(checkresult[0]){
                console.log('already have it')
              }else{
                datastore.save(entity, function(err) {
                });
                res.json({
                	success: true
              	})
              }
            })
});*/
}

module.exports = (router) => {
    router.get('/getTab', getTab)
    router.post('/delTab', delTab)
    router.post('/delItem', delItem)
    router.post('/getSheet', getSheet)
    router.post('/getInfo', getInfo)
    router.post('/getFilter', getFilter)
    router.post('/getStatistic', getStatistic)
    router.post('/insertTab', insertTab)
	  router.post('/insert', insert)
    router.post('/dataSave', dataNewSave)
}
