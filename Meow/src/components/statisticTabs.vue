<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
     <el-tab-pane label="Inventories" name="first"/>
     <el-tab-pane label="Companies" name="second"/>
     <el-tab-pane label="Sheets" name="third"/>
    </el-tabs>
  </div>
</template>

<script>
import * as types from '../store/types'
import api from '../axios'
export default {
  name: 'statisticTabs',

  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    handleClick(event) {
      let info = {'need':event.label}
      api.getStatistic(info).then(({
          data
      }) => {
          if (data.success) {
            //console.log(data.data)
            const cdata = data.data
            this.$store.state.statisticdata = []
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
              this.$store.state.statisticdata[x] = msgdata[x]
              this.$set(this.$store.state.statisticdata,x,msgdata[x])
              //console.log(msgdata)
            }
            console.log(this.$store.state.statisticdata)
          } else {
              console.log('not ok ne')
          }
      }).catch((err) => {
          console.log(err);
      })
      /*api.getStatistic(info).then(({
          data
      }) => {
        const cdata = data
        console.log(cdata)
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
          this.$store.state.statisticdata[x] = msgdata[x]
          this.$set(this.$store.state.statisticdata,x,msgdata[x])
          console.log(msgdata)
        }
      })*/
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
