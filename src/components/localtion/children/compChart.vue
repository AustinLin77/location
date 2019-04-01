<template>
  <yd-layout id="conlist" >
    <yd-navbar slot="navbar" bgcolor="#0FA0FA" color="#fff">
        <yd-navbar-back-icon color="#fff"  @click.native="goback" slot="left"></yd-navbar-back-icon>
        <div slot="center" style="display: flex" >
          <span  class="tab"  :class="isActive=='chart2'?'active':''" @click="changetype('chart2')">布局图</span>
          <span  class="tab"  :class="isActive=='chart'?'active':''" @click="changetype('chart')">统计图</span>
          <span class="tab" :class="isActive=='list'?'active':''" @click="changetype('list')">明细</span>
        </div>
    </yd-navbar>

    <div v-show="isActive=='list'" class="list">
         <div v-for="(item,n) in companyList" class="companylist" @click="goItem(item.cEconomicsId,item.cEconomicsName)">
           <div style="border-bottom: solid 1px #eee">
             <yd-cell-item>
               <span slot="left">{{item.cEconomicsName}}</span>
               <span slot="right">{{item.countCompany}}个企业</span>
             </yd-cell-item>
           </div>
         </div>
   </div>
    <div v-show="isActive=='chart'" class="baicontent" >
       <div class="lineChart" id="piechart">
         <!--<div class="center">-->
           <!--<div class="line" v-for="(item,n) in companyList" :style="'transform: rotate('+parseInt(360/(companyList.length))*n+'deg)' " @click="goItem(item.cEconomicsId,item.cEconomicsName)">-->
              <!--<div class="lineItem" v-for="i in item.levelList" >-->
                <!--<span class="lineleft"></span>-->
                <!--<span class="linecenter"></span>-->
                <!--<span class="lineright"></span>-->
              <!--</div>-->
             <!--<div class="centerLine"></div>-->
             <!--<span class="lineName" :style="'transform: rotate('+(-parseInt(360/(companyList.length))*n)+'deg)' ">{{item.cEconomicsName}}</span>-->
           <!--</div>-->

         <!--</div>-->
       </div>
    </div>


    <div v-show="isActive=='chart2'" class="baicontent1" >
      <div class="lineChart2" >
        <div class="center"> <span class="centertxt"></span>
        <div class="line" v-for="(item,n) in companyList" :style="'transform: rotate('+parseInt(360/(companyList.length))*n+'deg)' " @click.self="goItem(item.cEconomicsId,item.cEconomicsName)">
        <div class="lineItem" v-for="i in item.levelList" >
        <span class="lineleft"></span>
        <span class="linecenter" ></span>
        <span class="lineright"></span>
        </div>
        <div class="centerLine" :style="{background: 'linear-gradient(to right,'+datacolor[item.cEconomicsName]+','+datacolor[item.cEconomicsName]+' 5px, transparent 5px, transparent)',backgroundSize: '10px 100%'}"></div>
        <!--<span class="lineName" :style="{transform: 'rotate('+(-parseInt(360/(companyList.length))*n)+'deg)',backgroundColor:datacolor[item.cEconomicsName]} ">{{item.cEconomicsName}}</span>-->
        </div>
        </div>
      </div>
      <div  class="mapcontent">
        <div id="myChart" style="width: 100%;height: 100%;overflow: hidden"></div>
      </div>
    </div>

  </yd-layout>
</template>

<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/extension/bmap/bmap');
  import { mapMutations,mapState } from 'vuex'
export default {

  data () {
    return {
      mapdata: {},
      centerdata:{},
//      datacolor:{
//        "传统服务业":"#f3a4ff",
//        "供应链管理":"#3f6cff",
//        "其他":"#a98eff",
//        "加工制造":"#d074f2",
//        "整合信息":"#e565ac",
//        "旅游文化创意":"#66c08f",
//        "日用制造":"#92b3ff",
//        "物流采购":"#ffbb84",
//        "现在服务业":"#66d2ff",
//        "研发":"#84ccc9",
//        "能源与基础原材料":"#f928bc",
//        "装备制造":"#ffa800",
//        "重化工制造":"#e8e825",
//      },
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
      seriesdata:[],
      showlegend:false,
      asd:null,
      phoneNum:'',
      selectAll:false,
      myStyleJson:[
        {
          "featureType": "background",
          "elementType": "geometry",
          "stylers": {
            "color": "#fefeee"
          }
        }],
      centerId:"",
      companyList:[],
      myCharts:null,
      datacolor:{
        "传统服务业":"#66d2ff",
        "供应链管理":"#e8e825",
        "其他":"#8a66ff",
        "加工制造":"#eb66ff",
        "整合信息":"#ffaa66",
        "旅游文化创意":"#32b16c",
        "日用制造":"#e565ac",
        "物流采购":"#a98eff",
        "现代服务业":"#6695ff",
        "研发":"#1f4fe9",
        "能源与基础原材料":"#0086d3",
        "装备制造":"#d1c0a5",
        "重化工制造":"#84ccc9",
      },
      total:6000,
      centerpoint:{},
      userMessage:{}
    }
  },
  watch:{

  },
  computed:{
    ...mapState({
      isActive:"isActive",

    })
  },
  mounted: function(){
    this.centerId = this.$route.query.centerId;
    this.userMessage=JSON.parse(localStorage.getItem("user"))
    this.centerpoint=JSON.parse(localStorage.getItem("center"))
    this.getList();
    this.getpoints()
  },

  methods:{
    ...mapMutations([
      'setisActive',
    ]),
    goback:function () {
      this.$router.go(-1)
    },
    changetype:function (type) {
      this.setisActive(type);
      if(type=='chart'){
        let vm =this;
        this.getList();
      }
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
          type: 'scroll',
          orient: 'vertical',
          right: 10,
          top: 10,
          height:140,
          backgroundColor:"rgba(255,255,255,.8)",
          borderColor:"#eee",

          formatter:  function (name) {
            return  name +"("+ oplenda[name] +"%)";
          }
        },
        series: [
          {
            type: 'pie',
            radius : '50%',
            center: ['50%', '55%'],
            data:opdata,
            label:{
              color:"#fff",
              padding:2,
//              backgroundColor:"rgba(0,0,0,.3)"
            }

          }
        ]
      };
      let myChart = echarts.init(document.getElementById('piechart'));
      this.myCharts = myChart
      // 绘制图表
      myChart.setOption(option);
    },
    getList:function (page) {
      let vm = this;
      vm.companyList = [];
      vm.api(vm,'post',"信息获取中...","common/company/findEconomicsAndCompany",{pageSize:20
      },function (data) {
        console.log(data);
        if(data.statusCode == 0){

          vm.companyList = vm.companyList.concat(data.dataInfo.listData);
          vm.total = data.extData.companyCount;
          console.log( vm.total);
          if(vm.isActive == 'chart'){
            let oplenda={};
            let opdata =  vm.companyList.map(function (item) {
              oplenda[item.cEconomicsName] =  (item.countCompany/vm.total*100).toFixed(2);
              return  {value:item.countCompany, name:item.cEconomicsName, label:{
                backgroundColor:vm.datacolor[item.cEconomicsName]
              },itemStyle:{color:vm.datacolor[item.cEconomicsName]}};
            });
            vm.setpiechart(opdata,oplenda);
          }

        }
      });
    },

    goItem:function (cEconomicsId,cEconomicsName) {
        console.log(cEconomicsId);
        let vm = this;
        this.$router.push({path:"ecCompanylist",query:{
          cEconomicsId:cEconomicsId,
          pointCenterId:vm.centerId,
          cEconomicsName:cEconomicsName
        }})

    },
    gocompChart:function () {
      this.$router.push({path:"compChart",query:{centerId:this.centerpoint.centerId}});
    },
    //    初始化数据点 中心点经纬度 地图缩放层级
    init:function () {
      let vm = this;
      console.log(vm.centerpoint);
      console.log(vm.mapdata);
      console.log(vm.userMessage)
      vm.phoneNum=vm.userMessage.userAccount
      vm.centerdata.lng=vm.centerpoint.centerLongitude;
      vm.centerdata.lat=vm.centerpoint.centerLatitude;
      console.log(vm.centerpoint.centerLongitude)
      console.log(vm.centerpoint.centerLatitude)

      var aa=parseInt(localStorage.getItem("AA"))
      console.log(aa)
      if(aa==null){
        aa=13
      }
      vm.drawChinaMap(vm.centerdata.lng,vm.centerdata.lat,parseInt(localStorage.getItem("AA")));
    },
    getpoints:  function () {
      let vm = this;
      vm.api(vm,'post',"信息获取中...","common/company/findCompanyByObj.json",{centerId:vm.centerpoint.centerId,pageSize:6000},function (data) {
        if(data.statusCode == 0){
          vm.gkshow=true
          console.log(data)
          for(let i=0;i<data.dataInfo.listData.length;i++){
            vm.mapdata[data.dataInfo.listData[i].cEconomicsName] = data.dataInfo.listData[i].data;
          }
          vm.init()
        }
      });
    },

//    处理数据

    convertData:function (name) {
      let vm = this;
      let res = [];
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      for(let i=0;i<vm.mapdata[name].length;i++){
        if(vm.mapdata[name][i].ponitLongitude && vm.mapdata[name][i].ponitLatitude){
          res.push({
            name:vm.mapdata[name][i].companyName,
            value:[vm.mapdata[name][i].ponitLongitude,vm.mapdata[name][i].ponitLatitude]
          })
        }
      }
      return res;
    },
    setpointserise:function (size) {
      let vm = this;
      let res = [{
        name: '中心点',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: [
//          {
//            name: "中心点",
//            value:[vm.centerdata.lng,vm.centerdata.lat]}
        ],
        symbolSize:20,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke'
        },
        hoverAnimation:false,
        itemStyle: {
          normal: {
            color: '#00a8ff',
            shadowBlur: 10,
            shadowColor: '#333',
          }
        },
        zlevel: 1
      }];
      for(let item in vm.datacolor){
        res.push(
          {
            name: item,
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: vm.convertData(item),
            symbolSize: size,
            hoverAnimation:false,
            itemStyle: {
              normal: {
                color: vm.datacolor[item],
                show:false
              }
            }
          }
        )}
      return res
    },
    drawChinaMap(lng,lat,leve) {
      console.log(lng)
      console.log(lat)
      let vm = this;
      var option = {
        title: {
          text: '',
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a}<br>{b}",
          position: ['5%', '50%']
        },
        legend: {
          show:vm.showlegend,
          orient: 'horizontal',
          right: 80,
          top: 3,
          zlevel:9999,
          backgroundColor:"rgba(255,255,255,.8)",
          borderColor:"#eee",
          selected: {
            "传统服务业":true,
            "供应链管理":true,
            "其他":false,
            "加工制造":true,
            "整合信息":true,
            "旅游文化创意":true,
            "日用制造":true,
            "物流采购":false,
            "现代服务业":false,
            "研发":false,
            "能源与基础原材料":false,
            "装备制造":false,
            "重化工制造":false,
          }
        },
        bmap: {
          center: [lng, lat],
          zoom:leve,
          roam: true,
        },
        series : vm.setpointserise(7),
        animation:false,

      };
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(option);
      var bmap = myChart.getModel().getComponent('bmap').getBMap();
//      bmap.setMapStyle({styleJson: vm.myStyleJson });
//      vm.drawline(bmap);
      vm.addControl(bmap,"图例显隐",BMAP_ANCHOR_TOP_RIGHT,10,10,function () {
        vm.showlegend = !vm.showlegend;
        myChart.setOption({
          legend: {
            show:vm.showlegend
          },
        });
//        显示还是隐藏这些操作
        if(vm.showlegend == true){
          vm.addControl(bmap,"全选",BMAP_ANCHOR_TOP_RIGHT,10,50,function () {
            vm.selectAll = !vm.selectAll
            vm.setlengthsele(myChart,vm.selectAll)
          });
        }else {
          vm.deletecontrol(bmap);
        }

      });
      bmap.addEventListener("zoomend", function(evt){
        let offsetPoint = bmap.getZoom();
        let cp = bmap.getCenter();
        if(offsetPoint>10){
          myChart.setOption({
            series : vm.setpointserise(offsetPoint*2-19),
            bmap: {
              center: [cp.lng,cp.lat],
              zoom:offsetPoint,
              roam: true,
            },
          });
        }

      });
    },
    topcontrol:function (position) {
      this.$router.push({path:"companylistchart",query:{companyCount:this.centerpoint.companyCount,position:position,centerId:this.centerpoint.centerId}})
    },
//根据true 或false 设置lengend选择项目
    setlengthsele:function (chart,tof) {
      if(tof == true){
        chart.setOption({
          legend: {
            selected: {
              "传统服务业":true,
              "供应链管理":true,
              "其他":true,
              "加工制造":true,
              "整合信息":true,
              "旅游文化创意":true,
              "日用制造":true,
              "物流采购":true,
              "现代服务业":true,
              "研发":true,
              "能源与基础原材料":true,
              "装备制造":true,
              "重化工制造":true,}
          },
        });
      }else {
        chart.setOption({
          legend: {
            selected: {
              "传统服务业":false,
              "供应链管理":false,
              "其他":false,
              "加工制造":false,
              "整合信息":false,
              "旅游文化创意":false,
              "日用制造":false,
              "物流采购":false,
              "现代服务业":false,
              "研发":false,
              "能源与基础原材料":false,
              "装备制造":false,
              "重化工制造":false,}
          },
        });
      }
    },

//    根据中心点和半径（米）确认四个象限的直线点
//    经度每隔0.00001度，距离相差约1米；
//    纬度每隔0.00001度，距离相差约1.1米；   约等于 1米 为0.000009度
    getlinedata:function (lng,lat,radis) {
      let top = {lng:lng,lat:(lat+(radis*0.000009)).toFixed(5)}
      let bottom = {lng:lng,lat:(lat-(radis*0.000009)).toFixed(5)}
      let left = {lng:(lng-(radis*0.00001)).toFixed(5),lat:lat}
      let right = {lng:(lng+(radis*0.00001)).toFixed(5),lat:lat}
      let fourdot ={
        top:top,
        bottom:bottom,
        left:left,
        right:right
      };
      return fourdot

    },
//    给地图画十字线  根据中心点和半径 确认上下左右四个点坐标
//    drawline:function (bmap) {
//      let vm = this;
//      let fourdot= vm.getlinedata(vm.centerdata.lng,vm.centerdata.lat,20000)
//      var polyline = new BMap.Polyline([
//          new BMap.Point(fourdot.top.lng, fourdot.top.lat),
//          new BMap.Point(fourdot.bottom.lng, fourdot.bottom.lat)
//        ],
//        {strokeColor:"#f66", strokeWeight:1, strokeOpacity:0.5}
//      );
//      var polyline1 = new BMap.Polyline([
//          new BMap.Point(fourdot.left.lng, fourdot.left.lat),
//          new BMap.Point(fourdot.right.lng, fourdot.right.lat)
//        ],
//        {strokeColor:"#f66", strokeWeight:1, strokeOpacity:0.5}
//      );
//      bmap.addOverlay(polyline);
//      bmap.addOverlay(polyline1);
//    },


    addControl:function (map,content,off,top,left,fn) {
      // 定义一个控件类，即function
      let vm =this;
      function ZoomControl(){
        // 设置默认停靠位置和偏移量
        this.defaultAnchor = off;
        this.defaultOffset = new BMap.Size(top, left);
      }
      ZoomControl.prototype = new BMap.Control();
      ZoomControl.prototype.initialize = function(map){
        // 创建一个DOM元素
        var div = document.createElement("div");
        // 添加文字说明
        div.appendChild(document.createTextNode(content));
        // 设置样式
        div.classList.add("Controlfour");
        div.style.cursor = "pointer";
        div.style.border = "1px solid #ccc";
        div.style.backgroundColor = "rgba(255,255,255,.5)";
        div.style.borderRadius = "3px";
        div.style.padding = "5px";
        div.style.boxShadow="1px 1px 2px rgba(0,0,0,.4)"
        div.onclick = fn
        // 添加DOM元素到地图中
        map.getContainer().appendChild(div);
        // 将DOM元素返回
        return div;
      }

// 创建控件实例
      var myZoomCtrl = new ZoomControl();
      vm.asd = myZoomCtrl;
// 添加到地图当中
      map.addControl(myZoomCtrl);
    },

    deletecontrol:function (map) {
      let vm = this;
      map.removeControl(vm.asd);

    }

  }
}
</script>

<style scoped>
  #conlist{
    width: 100%;
    height: 100%;
  }
  .tab{
    display: inline-block;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    height: 30px;
    width: 60px;
    background-color: #fff;
    color: #0076FF;

  }
  .tab:first-child{
    border-right: solid 1px #ccc;
  }
   .tab:last-child{
      border-left: solid 1px #ccc;
  }
.list{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.companylist{
  background-color: #fff;
}
  .active{
    background-color: #222;
    box-shadow: 0 1px 5px #333;
    color: #fff;
    transition: all .5s ;
  }
  .baicontent{
    position: absolute;
    width: 100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .baicontent::before{
    content: "";
    position: absolute;
    background-image: url("../../../assets/baitu.png");
    filter:blur(2px);
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-size: cover;
    overflow:hidden;
  }
  .baicontent1{
    position: absolute;
    width: 100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .baicontent1::before{
    content: "";
    position: absolute;

    filter:blur(2px);

    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    background-size: cover;
    overflow:hidden;
  }
  .lineChart{
     width: 100vw;
     height:100%;
    overflow: hidden;
  }

  .lineChart2{
    z-index: 999;
    width: 99vw;
    height: 99vw;
    border: solid 2px #186EF9;
    display: flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    opacity: 1;
  }
  .line{
    position: absolute;
    margin-top: -30px;
    width: 49vw;
    height: 60px;
    transform-origin: left;
    display: flex;
    align-items: center;
  }

  .line:hover .lineItem .linecenter{
     background-color: #05a;
     box-shadow: 0 1px 5px #aaa;
  }
  .centertxt{
    position: absolute;
    display: inline-block;
    width: 45px;
    height: 45px;
    margin-top: -20px;
    margin-left: -20px;
    text-align: center;
    line-height: 12px;
    font-size: 12px;
    color:#186EF9;
    background-color: #fff;
    z-index: 999;
    padding: 5px;
    border-radius: 50%;
    border: solid 5px #186EF9;
  }

  .line:hover  .centerLine{
    border-bottom: dashed 2px #999;
  }
  .centerLine{
    position: absolute;
    top:30px;
    left: 0;
    width: 100%;
    /*border-bottom: dashed 1px #10aeff;*/
    height: 1px;
    /*background: linear-gradient(to right, #999, #999 5px, transparent 5px, transparent);*/
    background-size: 15px 100%;
  }
  .lineItem:first-child{
    margin-left: 10px;
  }

  .lineName{
     position: absolute;
     display: inline-block;
     width: 65px;
     overflow: hidden;
     bottom:-10px;
     right:3px;
     font-size:12px;
     transform-origin: center;
     text-align: center;
     background-color:rgba(0,0,0,.3);
     color: #fff;
     padding: 0 1px;
     border-radius: 1px;
  }
  .lineItem{
    flex: 1;
    height: 10px;
    display: flex;
  }
  .lineleft{
    flex: 2;
    /*background-color: #eee;*/
  }
  .linecenter{
    flex: 5;
    max-width: 35px;
    background-color: #10aeff;
    z-index: 999;
  }
  .lineright{
    flex: 1;
  }
  .mapcontent{
    width: 100%;
    height:100% ;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    position: absolute;
    z-index: 2;
  }
  #myChart{
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
