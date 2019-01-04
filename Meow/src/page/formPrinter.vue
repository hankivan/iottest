<template>
  <div>
    <el-container direction="vertical">
      <el-row>
        <el-col :span="12">
          <el-form size="mini" :data="seller" ref="seller" label-width="100px">
            <el-form-item
            :label="key"
            v-for="(key,index) in Object.keys(seller)">
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-select v-model="sheetinfo['Sheetkind']" placeholder="Select" @change="">
            <el-option
              v-for="item in sheets"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </el-container>
    <el-container direction="vertical">
      <el-row>
        <el-col :span="12">
          <el-form size="mini" :data="buyer" ref="buyer" label-width="100px">
            <p id="buyer">
              {{$t('lang.Buyer')}}
            </p>
            <el-form-item
            :label="key"
            v-for="(key,index) in Object.keys(buyer)">
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form size="mini" :model="sheetinfo" label-width="100px">
            <el-form-item
            :label="key"
            v-for="(key,index) in Object.keys(sheetinfo)">
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-container>
    <el-container>
      <el-row>
        <el-col :span="24">
          <el-table id="tableinput" size="mini" style="width: 100%" border :data="iteminfo" :border="true" @row-click="" @cell-mouse-enter="">
            <el-table-column
              :prop="key"
              :label="key"
              resizable
              v-for="(key,index) in Object.keys(iteminfo[0])">
              <template slot-scope="scope"><el-input v-model="scope.row[key]" @focusout.native="insertIteminfo(scope,scope.$index,key,index)"/></template>
            </el-table-column>
            <el-table-column
            label="total">
              <template slot-scope="scope" >{{scope.row.Price*scope.row.Quantity}}</template>
            </el-table-column>
            <el-table-column
            width="50px" id="edit" label="">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-container>
    <el-container direction="vertical">
      <el-row>
        <el-col :span="12">remark</el-col>
        <el-col :span="12">
          <el-form :model="cal" size="mini">
            <el-form-item
            :label="c"
            v-for="c in Object.keys(cal)">
            <el-input v-model="cal[c]"/>
            </el-form-item>
            <el-form-item>
              <p id="total">Total {{sum}}</p>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import * as types from '../store/types'
import api from '../axios'
export default {
  name: 'formprinter',
  data() {
    return {

    };
  },
  computed: {
    seller(){
      return this.$store.state.forminfox.seller;
    },
    sheetinfo(){
      return this.$store.state.forminfox.sheetinfo;
    },
    buyer(){
      return this.$store.state.forminfox.buyer;
    },
    iteminfo(){
      return this.$store.state.forminfox.iteminfo;
    },
    sheets(){
      return this.$store.state.sheets;
    },
    cal(){
      return this.$store.state.cal;
    },
    sum(){
      let act = '0';
      let form = 'forminfo'+String(act);
      let result = this.$store.state[form].iteminfo
      let item;
      if(result==undefined){
        item = this.$store.state.forminfox.iteminfo
      }else{
      item = result;
      }
      let cdata = this.$store.state.cal;
      let len = item.length;
      let sum = 0;
      for(let i=0;i<len;i++){
        let total = item[i].Price*item[i].Quantity;
        sum = sum + total;
      }
      let balance = sum+Number(cdata.Tax)+Number(cdata.Shipping)-Number(cdata.Discount);
      return balance;
    },
  },
  mounted(){
    const info = {}
    info.sheetNumber = '201807220001'//window.name
      api.getSheet(info).then(({
          data
      }) => {
        console.log(data)
        console.log(this.$store.state.forminfox)
        /*const cdata = data
        var msgdata = []
        for(let x=0;x<cdata.length;x++){
          var keyl = Object.keys(cdata[x]).length
          msgdata[x] = {}
            for(let i=0;i<keyl;i++){
              for(let j=0;j<keyl;j++){
                var key = Object.keys(cdata[x])[j];
                var obj = cdata[x];
                var value = obj[key][0];
                if(value==i&&key!=='index'){
                  msgdata[x][key] = obj[key][1]
                }
              }
            }
          console.log()
          this.$store.state.forminfo0.seller = msgdata[x]
        }*/
      })
      console.log()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form-item{
  margin-bottom: 0px;
}

</style>
