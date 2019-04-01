<template>
  <yd-layout id="addcom" >

    <yd-navbar slot="navbar" title="记录" bgcolor="#0FA0FA" color="#fff">
      <span  slot="left">
        <yd-navbar-back-icon color="#fff" @click.native="goback"></yd-navbar-back-icon>
      </span>
    </yd-navbar>
    <!--<yd-search :result="result" fullpage placeholder="根据公司名搜索" v-model="companyName" :item-click="itemClickHandler" :on-submit="submitHandler">-->

    <!--</yd-search>-->
    <div>
      <div  class="companylist" @click="showconpany=true">
        <div class="name">公司名称</div>
        <div class="value">
          <yd-input  v-model="companyName" disabled required placeholder="请输入公司名"></yd-input>
        </div>
      </div>
      <div  class="companylist" >
        <div class="name">地理坐标</div>
        <div class="value">
          <yd-input  v-model="point" disabled required placeholder="请输入地理坐标"></yd-input>
        </div>
      </div>
      <div class="companylist"  @click="showSelectE=true">
        <div class="name">选择国民经济类型</div>
        <div class="value" >
            <yd-input  v-model="cEconomicsName" disabled required placeholder="请选择国民经济类型"></yd-input>
        </div>
      </div>
      <div class="companylist" >
        <div class="name">选择产业链</div>
        <div class="value" @click="selectEconomicsT">
            <yd-input  v-model="cEconomicsLevelName" disabled required placeholder="请选择产业链"></yd-input>
        </div>
      </div>
    </div>
    <div class="subCla">
      <yd-button size="large" bgcolor="#0FA0FA" color="#fff" @click.native="subCompany">提交</yd-button>
    </div>

    <yd-popup v-model="showconpany" position="bottom" style="max-height: 60%">
      <div slot="top" >
        <yd-search v-model="selectcompany" :on-submit="submitHandler" placeholder="根据公司名搜索" cancel-text="确定" :on-cancel="submitHandler"></yd-search>
      </div>
      <yd-cell-group>
        <yd-cell-item type="radio" v-for="(item,n) in companyList" :key="n">
          <span slot="left">{{item.companyName}}</span>
          <input slot="right" type="radio" :value="item.companyId" v-model="companyId"/>
        </yd-cell-item>
      </yd-cell-group>
    </yd-popup>
    <yd-popup v-model="showSelectE" position="bottom" style="max-height: 60%">
      <div slot="top" class="poptop">选择国民经济类型</div>
      <yd-cell-group>
        <yd-cell-item type="radio" v-for="(item,n) in EconomicsList" :key="n">
          <span slot="left">{{item.cEconomicsName}}</span>
          <input slot="right" type="radio" :value="item.cEconomicsId" v-model="cEconomicsId"/>
        </yd-cell-item>
      </yd-cell-group>
    </yd-popup>
    <yd-popup v-model="showSelectEleve" position="bottom" style="max-height: 60%">
      <div slot="top" class="poptop">选择国民经济类型</div>
      <yd-cell-group>
        <yd-cell-item type="radio" v-for="(item,n) in cEconomicsLevelList" :key="n">
          <span slot="left">{{item.cEconomicsLevelName}}</span>
          <input slot="right" type="radio" :value="item.cEconomicsLevelId" v-model="cEconomicsLevelId"/>
        </yd-cell-item>
      </yd-cell-group>
    </yd-popup>


  </yd-layout>
</template>

<script>
  import  {mapState} from  "vuex"
  export default {

    data () {
      return {
        showconpany:false,
        showSelectE:false,
        showSelectEleve:false,
        selectcompany:"",
        companyName:'',
        companyId:"",
        cEconomicsName:"",
        cEconomicsId:"",
        cEconomicsLevelId:"",
        cEconomicsLevelName:"",
        companyList:[],
        EconomicsList:[],
        cEconomicsLevelList:[],
        xlineTiem:"",
        point:"",
        pointlng:"",
        pointlat:"",

      }
    },
    computed:{
      ...mapState({
        user:"userMessage",
        centerpoint:"centerpoint"
      })
    },
    watch:{
      selectcompany(val) {
        this.getcompanyList(val);
      },
      companyId:function (val) {
        for(let i=0;i<this.companyList.length;i++ ){
          if(this.companyList[i].companyId == val){
            this.companyName = this.companyList[i].companyName;
          }
        }
        this.showconpany = false;
      },
      cEconomicsId:function (val) {
        this.cEconomicsLevelId = "";
        this.cEconomicsLevelName = "";
        for(let i=0;i<this.EconomicsList.length;i++ ){
          if(this.EconomicsList[i].cEconomicsId == val){
            console.log(this.EconomicsList[i]);
            this.cEconomicsName = this.EconomicsList[i].cEconomicsName;
            this.cEconomicsLevelList =this.EconomicsList[i].levelList;
          }
        }
        this.showSelectE = false;
      },
      cEconomicsLevelId:function (val) {
        for(let i=0;i<this.cEconomicsLevelList.length;i++ ){
          if(this.cEconomicsLevelList[i].cEconomicsLevelId == val){
            console.log(this.cEconomicsLevelList[i])
            this.cEconomicsLevelName = this.cEconomicsLevelList[i].cEconomicsLevelName;
          }
        }
        this.showSelectEleve = false;
      }
    },
    mounted: function(){
         this.point = this.$route.query.lng+","+this.$route.query.lat;
         this.pointlng = this.$route.query.lng;
         this.pointlat = this.$route.query.lat;
         this.getcompanyList();
         this.getEconomics();
    },

    methods:{
      goback:function () {
        this.$router.go(-1)
      },
      selectEconomicsT:function () {
        if(!this.cEconomicsId){
         this.$dialog.toast({mes: "请先选择经济类型", timeout: 1500});
          return
        }
        this.showSelectEleve = true;
      },
      itemClickHandler(item) {
        this.$dialog.toast({mes: `搜索：${item}`});
      },
      submitHandler(value) {
        this.$dialog.toast({mes: `搜索：${value}`});
      },
      subCompany:function () {
        let vm =this;
        if(!vm.companyId){
          vm.$dialog.toast({mes: "请先选择公司", timeout: 1500});
          return
        } if(!vm.cEconomicsId){
          vm.$dialog.toast({mes: "请先选择经济类型", timeout: 1500});
          return
        }
        vm.api(vm,'post',"提交中","common/company/updateCompanyByPoint.json",{
          companyId:vm.companyId,
          uId:vm.user.userId,
          lng:vm.pointlng,
          lat:vm.pointlat,
          pointCenterId:vm.centerpoint.centerId,
          companyEconomicsType:vm.cEconomicsId,
          companyEconomicsLevel:vm.cEconomicsLevelId,
        },function (data) {
//          console.log(data)
          if(data.statusCode == 0){
            vm.$dialog.toast({mes: "添加成功", timeout: 1500});
            vm.goback()
          }else {
            vm.$dialog.toast({mes: data.message, timeout: 1500});
          }
        });

      },
      getEconomics:function () {
        let vm = this;
        vm.api(vm,'post',"查询中","common/company/findEconomics.json",{pageSize:-1},function (data) {
//          console.log(data)
          if(data.statusCode == 0){
            vm.EconomicsList = data.dataInfo.listData;
          }
        });
      },
      getcompanyList:function (val) {
        let vm = this;
        vm.api(vm,'post',"查询中","common/company/findCompany.json",{companyName:val},function (data) {
//          console.log(data)
          if(data.statusCode == 0){
            vm.companyList = data.dataInfo.listData;
          }
        });
      }
    }
  }
</script>

<style scoped>
  #addcom {
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
  .companylist{
    border-bottom: solid 0.01rem #eee;
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    padding-bottom: 0.16rem;
    padding-top: 0.16rem;
    display: flex;
    flex-direction: column;
  }
  .companylist .name{
    line-height: 0.4rem;
    color: rgba(125, 125, 125, 1);
    font-size: 0.25rem;
  }
  .companylist .value{
    line-height: 0.55rem;
    min-height: 0.55rem;
    color: rgba(57, 57, 57, 1);
    font-size: 0.28rem;
  }
  .poptop{
    height: 0.8rem;
    line-height: 0.8rem;
    background-color: #eee;
    font-size: 0.3rem;
    padding-left: 0.32rem;
  }
  .subCla{
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    box-sizing: border-box;
  }

</style>
