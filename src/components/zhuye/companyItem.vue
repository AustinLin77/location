<template>
  <yd-layout id="conlist" >

    <yd-navbar slot="navbar" :title="companItem.公司名称" bgcolor="#0FA0FA" color="#fff">
      <span  slot="left">
        <yd-navbar-back-icon color="#fff" @click.native="goback"></yd-navbar-back-icon>
      </span>
    </yd-navbar>
    <!--<div class="linetop" slot="top">-->
      <!--<span>-->
        <!--<div class="topItemName">纳税总数</div>-->
        <!--<div class="topItemValue">{{companyItem.companyTotalTax}}元</div>-->
      <!--</span>-->
      <!--<span>-->
        <!--<div class="topItemName">就业总人数</div>-->
        <!--<div class="topItemValue">{{companyItem.companyTotalEmployment}}人</div>-->
      <!--</span>-->
      <!--<span>-->
        <!--<div class="topItemName">是否政府补贴</div>-->
        <!--<div class="topItemValue" v-if="companyItem.companyIsSubsidies==0">否</div>-->
        <!--<div class="topItemValue" v-if="companyItem.companyIsSubsidies==1">是</div>-->
      <!--</span>-->
    <!--</div>-->
    <div>
      <div v-for="(key,value) in companItem" class="companylist" >
        <div class="name">{{value}}</div>
        <div class="value">{{key}}</div>
      </div>
    </div>


  </yd-layout>
</template>

<script>
import  {mapState} from  "vuex"
export default {

  data () {
    return {
      companyname:'信息科技有限公司',
      xlineTiem:"",
      companItem:{
        "公司名称":"",
        "统一社会信用代码":"",
        "登记机关":"",
        "公司规模":"",
        "成立日期":"",
        "法定代表人":"",
        "行业":"",
        "组织机构代码":"",
        "工商注册号":"",
        "公司地址":"",
        "管辖单位":"",
        "注册资金":"",
        "实缴资本":"",
        "公司英文名称":"",
        "经营范围":"",
        "公司类型":"",
        "是否政府补贴":"",
        "政府补贴金额":"",
        "就业总数":"",
        "纳税总数":"",
        "经济类型":"",
        "类型层级":"",
        "经度":"",
        "维度":""
      }
    }
  },
  computed:{
    ...mapState({
      companyItem:"companyItem"
    })
  },
  watch:{

  },
  mounted: function(){
     console.log(this.companyItem);
    this.getcompanyitem();
  },

  methods:{
    goback:function () {
        this.$router.go(-1)
    },
    getcompanyitem:function () {
      let vm = this;
      vm.api(vm,'post',"信息获取中...","common/company/findCompany.json",{
        companyId:vm.companyItem.companyId,

      },function (data) {
        console.log(data);
        if(data.statusCode == 0){
          let comp =  data.dataInfo.listData[0]
          vm.companItem={
            "公司名称":comp.companyName,
//            "统一社会信用代码":comp.companyNumber,
//            "登记机关":comp.companyRegisAddress,
//            "公司规模":comp.companyScale,
            "成立日期	":comp.companyRegistDateStr,
//            "法定代表人	":comp.companyLegalPerson,
            "行业":comp.companyIndustry,
//            "组织机构代码":comp.companyOrganCode,
//            "工商注册号":comp.companyRegistNumber,
            "公司地址":comp.companyAddress,
//            "管辖单位":comp.companyRegistAgency,
            "注册资金":comp.companyRegistCapital,
            "实缴资本":comp.companyPaidCapital,
            "公司英文名称":comp.companyEnglishName,
            "经营范围":comp.companyOperation,
            "公司类型":comp.companyType,
//            "政府补贴金额":comp.companySubsidiesCapotal,
//            "就业总数":comp.companyTotalEmployment,
//            "纳税总数":comp.companyTotalTax,
//            "经济类型":comp.companyEconomicsTypeStr,
//            "类型层级":comp.companyEconomicsLevelStr,
            "经度":comp.pointLongitude,
            "维度":comp.pointLatitude
          }
        }
      });
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
  .linetop{
    border-bottom: solid 8px #eee;
    display: flex;
    padding-top: 0.36rem;
    padding-bottom: 0.36rem;
  }
  .linetop>span{
    flex: 1;
  }
  .linetop>span .topItemName{
    line-height: 0.34rem;
    font-size: 0.24rem;
    color: rgba(125, 125, 125, 1);
    text-align: center;
  }
  .linetop>span .topItemValue{
    padding-right: 0.2rem;
    line-height: 0.76rem;
    color: rgba(16, 16, 16, 1);
    font-size: 0.46rem;
    text-align: center;
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
    line-height: 0.34rem;
    color: rgba(125, 125, 125, 1);
    font-size: 0.24rem;
  }
  .companylist .value{
    line-height: 0.4rem;
    min-height: 0.4rem;
    color: rgba(57, 57, 57, 1);
    font-size: 0.28rem;
  }

</style>
