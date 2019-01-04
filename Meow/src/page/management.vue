<template>
  <div>
    <el-container id="managementcontent" direction="vertical">
      <el-header v-show="this.$route.path!='/printer'">
        <mainheader/>
      </el-header>
        <el-form>
          <el-button>Add</el-button>
          <el-button>Detail</el-button>
        </el-form>
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
  name: 'Management',
  data() {
    return {

    };
  },
  computed: {
    management(){
        return this.$store.state.management;
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
