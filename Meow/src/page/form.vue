<template>
  <div id="form">
    <el-container id="tabbar">
      <el-header v-show="this.$route.path!='/printer'">
        <mainheader/>
      </el-header>
      <el-row>
        <el-col :span="24"><formtabs/></el-col>
      </el-row>
    </el-container>
    <el-container id="formcontent" direction="vertical">
      <el-row>
        <el-col :span="24">
          <el-select v-model="sheetinfo['Sheetkind']" placeholder="Select" @change="getkind">
            <el-option
              v-for="item in sheets"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" id="seller"><formseller/></el-col>
        <el-col :span="6" id="buyer"><formbuyer/></el-col>
        <el-col :span="12"><formsheet/></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><formitem/></el-col>
      </el-row>
      <el-row>
        <el-col :span="14">備註欄</el-col>
        <el-col :span="10"><cal/></el-col>
      </el-row>
      <el-footer v-show="this.$route.path!='/printer'">
        <computer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import formtabs from '@/components/formTabs';
import formseller from '@/components/formSeller';
import formbuyer from '@/components/formBuyer';
import formsheet from '@/components/formSheet';
import formitem from '@/components/formItem';
import cal from '@/components/cal';

export default {
  components: {
    formtabs,
    formseller,
    formbuyer,
    formsheet,
    formitem,
    cal,
  },
  data() {
    return {
    };
  },
  methods:{
    getkind(item){
      let act = this.$store.state.activeTab
      let form = 'forminfo'+String(act)
      let result = this.$store.state[form].sheetinfo;
      result.sheetkind = item
    },
  },
  computed:{
    tabre(){
      return this.$store.state.activeTab;
    },
    sheetinfo(){
      let act = this.$store.state.activeTab;
      let form = 'forminfo'+String(act)
      let result = this.$store.state[form].sheetinfo
      if(result==undefined){
        return this.$store.state.forminfox.sheetinfo
      }else{
      return result;
      }
    },
    sheets(){
      return this.$store.state.sheets;
    },
  },
  beforeUpdate(){

  }
};
</script>
<style>
#tabbar .el-tabs__header{
  margin: 0px;
}
#tabbar .el-tabs__new-tab{
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.computer{
}
.el-container #tabbar{
  margin: auto;
  background-color: white;
}
.el-header{
  background-color: rgb(45,45,45);
  border-radius: 5px;
  color: white;
  line-height: 50px;
  position: sticky;
  top: 0;
  z-index: 2;
}
.el-container #formcontent{
  height: 800px;
  width: 900px;
  margin: auto;
  background-color: white;
  transform: scale(1);
  transform-origin: top;
}
.el-footer{
  background-color: rgb(45,45,45);
  border-radius: 5px;
  color: white;
  line-height: 50px;
  position: sticky;
  bottom: 0px;
}
.background{
  background-color: gray;
}
.el-select{
  margin-top: 40px;
}
</style>
