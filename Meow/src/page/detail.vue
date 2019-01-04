<template>
  <div>
    <el-container id="detail" direction="vertical">
      <el-header v-show="this.$route.path!='/printer'">
        <mainheader/>
      </el-header>
      <el-row>
        <el-form>
          <el-col :span="12">
            <el-table :data="partner">
            </el-table>
          </el-col>
          <el-col :span="12">123</el-col>
        </el-form>
      </el-row>
      <el-table :data="management">
        <el-table-column
          :prop="key"
          :label="key"
          resizable
          v-for="key in Object.keys(management[0])">
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {

    };
  },
  computed: {
    management(){
        return this.$store.state.management;
    },
    partner(){
        return this.$store.state.seller;
    },
    sheetinfo(){
        return this.$store.state.sheetinfo;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form{
  margin-top: 10px;
}
.el-container #managementcontent{
  height: 800px;
  width: 900px;
  margin: auto;
  background-color: white;
  transform: scale(1);
  transform-origin: top;
}
</style>
