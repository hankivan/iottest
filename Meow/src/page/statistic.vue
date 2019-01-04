<template>
  <div>
    <el-container direction="vertical">
      <el-header v-show="this.$route.path!='/printer'">
        <mainheader/>
      </el-header>
      <el-row>
        <el-col :span="24"><statistictabs/></el-col>
      </el-row>
      <el-row>
        <el-col :span="24"><statisticcontent/></el-col>
      </el-row>
    </el-container>
  </div>
</template>

<script>
import statistictabs from '@/components/statisticTabs';
import statisticcontent from '@/components/statisticContent';

export default {
  name: 'mainContent',
  data() {
    return {

    };
  },
  components: {
    statistictabs,
    statisticcontent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-row{
  width: 596px;
  margin: auto;
  background-color: white;
}


</style>
