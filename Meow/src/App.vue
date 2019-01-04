<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'app',
    computed: {
      scale(){
        return this.$store.state.scale;
      },
    },
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body{
  margin: 0px;
}
.el-container{

}
.el-header{
  background-color: rgb(45,45,45);
  border-radius: 5px;
  color: white;
  line-height: 50px;
  position: sticky;
  top: 0;
  z-index: 1;
}
.el-main{
  background-color: ;
  padding: 0px;
  position: sticky;
}
.el-footer{
  background-color: rgb(45,45,45);
  border-radius: 5px;
  color: white;
  line-height: 50px;
  position: sticky;
  bottom: 0px;
}

</style>
