<template>
  <yd-layout id="conlist" >
    <yd-navbar slot="navbar" :title="cEconomicsName" bgcolor="#0FA0FA" color="#fff">
        <yd-navbar-back-icon color="#fff"  @click.native="goback" slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div>
         <div v-for="(item,n) in companyList" class="companylist" @click="goItem(item.cEconomicsLevelId,item.cEconomicsLevelName)">
           <div style="border-bottom: solid 1px #eee">
             <yd-cell-item>
               <span slot="left">{{item.cEconomicsLevelName}}</span>
               <span slot="right">{{item.countCompany}}个企业</span>
             </yd-cell-item>
           </div>
         </div>
   </div>
  </yd-layout>
</template>

<script>
  import { mapMutations } from 'vuex'
export default {

  data () {
    return {
      isActive:true,
      centerId:"",
      companyList:[],
      cEconomicsName:"",
      cEconomicsId:"",
      pointCenterId:"",
    }
  },
  watch:{

  },
  mounted: function(){
    this.pointCenterId = this.$route.query.pointCenterId;
    this.cEconomicsId = this.$route.query.cEconomicsId;
    this.cEconomicsName = this.$route.query.cEconomicsName;

    this.getList();
  },

  methods:{
    goback:function () {
      this.$router.go(-1)
    },
    changetype:function (type) {
      if(type=='list'){
        this.isActive = true
      }
      if(type=='chart'){
        this.isActive = false
      }

    },

    getList:function (page) {
      let vm = this;
      vm.api(vm,'post',"信息获取中...","common/company/findEconomicslevelAndCompany.json",{
        cEconomicsId:vm.cEconomicsId,
        pointCenterId:vm.pointCenterId
      },function (data) {
        console.log(data);
        if(data.statusCode == 0){
          vm.companyList = vm.companyList.concat(data.dataInfo.listData);
        }
      });
    },
    goItem:function (companyEconomicsLevel,companyEconomicsName) {

        this.$router.push({path:"ecCompanylist",query:{
          companyEconomicsType: this.cEconomicsId,
          companyEconomicsName:companyEconomicsName,
          pointCenterId: this.pointCenterId ,
          companyEconomicsLevel:companyEconomicsLevel
        }});
    }

  }
}
</script>

<style scoped>
  #conlist{
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  .tab{
    display: inline-block;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    height: 30px;
    width: 80px;
    background-color: #fff;
    color: #0076FF;

  }
  .active{
    background-color: #0076FF;
    color: #fff;
    transition: all .5s ;
  }
</style>
