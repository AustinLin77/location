<template>
  <yd-layout id="conlist" >

    <yd-navbar slot="navbar" :title="xlinename" bgcolor="#0FA0FA" color="#fff">
        <yd-navbar-back-icon color="#fff" @click.native="goback" slot="left"></yd-navbar-back-icon>
      <i class="iconfont icon-yduifenlei" slot="right" style="font-size:0.4rem;color: #ffffff"  @click="gocomplist"></i>
    </yd-navbar>
    <div class="linetop" slot="top"> 共计<span style="font-size: 0.8rem;">{{total}}</span>家</div>
    <div id="listpiechart">

    </div>

  </yd-layout>
</template>

<script>
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'
  let echarts = require('echarts/lib/echarts');



export default {
  data () {
    return {
       totalnum:6000,
       xlinename:'',
       xlineTiem:"",
       centerId:"",
       total:"",
      datacolor:{
        "传统服务业":"#66d2ff",
        "供应链管理":"#e8e825",
        "其他":"#8a66ff",
        "加工制造":"#eb66ff",
        "整合信息":"#ffaa66",
        "旅游文化创意":"#32b16c",
        "日用制造":"#e565ac",
        "物流采购":"#a98eff",
        "现在服务业":"#6695ff",
        "研发":"#1f4fe9",
        "能源与基础原材料":"#0086d3",
        "装备制造":"#d1c0a5",
        "重化工制造":"#84ccc9",
      },
    }
  },
  computed:{
    ...mapState({
      centerpoint:"centerpoint",
      userMessage:"userMessage"
    })
  },
  watch:{

  },
  mounted: function(){
    this.xlineTiem = this.$route.query.position;
    this.centerId = this.$route.query.centerId;
    this.totalnum = this.$route.query.companyCount;
    let names = ["第一象限","第二象限","第三象限","第四象限"];
    this.xlinename = names[this.xlineTiem-1];
    this.getList(1);
  },

  methods:{
    goback:function () {
      this.$router.go(-1)
    },
    gocomplist:function () {
      this.$router.push({path:"companylist",query:{position:this.xlineTiem,centerId:this.centerId}})
    },
    setpiechart:function (opdata,oplenda) {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter:function (a) {
            return  a.name + "："+oplenda[a.name] +"%";
          }
        },
        legend: {
          show:true,
//          backgroundColor:"rgba(255,255,255,.8)",
          borderColor:"#eee",
          formatter:  function (name) {
            return  name +"("+ oplenda[name] +"%)";
          }
        },
        series: [
          {
            type: 'pie',
            radius : '50%',
            center: ['50%', '60%'],
            data:opdata,
            label: {
              normal: {
//                formatter: '{b}({d}%) ',
              }
            },

          }
        ]
      };
      let myChart = echarts.init(document.getElementById('listpiechart'));
      this.myCharts = myChart
      // 绘制图表
      myChart.setOption(option);
    },
//    getList:function () {
//      let vm = this;
//      vm.api(vm,'post',"信息获取中...","common/company/findQuadrant.json",{
//        pointCenterId:vm.centerId,
//        pointQuadrant:vm.xlineTiem,
//        pageSize:10,
//        page:1,
//      },function (data) {
//        console.log(data);
//        if(data.statusCode == 0){
//          vm.total=data.extData.total;
//          let option = [
//            {value:parseInt(vm.totalnum-vm.total), name:"其他象限",itemStyle:{color:"#e565ac"}},
//            {value:parseInt(vm.total), name:vm.xlinename,itemStyle:{color:"#66d2ff"}}
//            ];
//          vm.setpiechart(option)
//        }
//      });
//    },
    getList:function (page) {
      let vm = this;
      vm.companyList = [];


        vm.api(vm,'post',"信息获取中...","common/company/findQuadrantCount.json",
          {pointCenterId:vm.centerId,pointQuadrant:vm.xlineTiem,userAccout:vm.userMessage.userAccount,},function (data) {
        console.log(data);
        if(data.statusCode == 0){
          if(data.dataInfo.listData){
            vm.total = data.dataInfo.listData[0].total;
            let oplenda={};

            let opdata =  data.dataInfo.listData[0].types.map(function (item) {
              oplenda[item.cEconomicsName] =  (item.count/vm.total*100).toFixed(2)
              return  {value:item.count, name:item.cEconomicsName,itemStyle:{color:vm.datacolor[item.cEconomicsName]}};
            });
            vm.setpiechart(opdata,oplenda);
          }


          }

      });
    },
    ...mapMutations([
      'setcompanyItem',
    ]),
    goItem:function (item) {
        console.log(item);
        this.$router.push({path:"companyItem"})
        this.setcompanyItem(item)
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
    border-bottom: solid 10px #eee;
    line-height: 1.2rem;
    text-align: center;
    font-size: 0.28rem;
    vertical-align: middle;
  }
  #listpiechart{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .companylist{
    height: 0.9rem;
    border-bottom: solid 1px #eee;
    line-height: 0.9rem;
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    display: flex;
  }
  .companylist span{
    padding: 0 0.2rem;
  }
  .companylist .conterName{
    flex: 1;
    white-space: nowrap;
  }
  .companylist>span:first-child{
    width: 0.6rem;
    flex-basis: 0.6rem;

  }
</style>
