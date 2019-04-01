<template>
  <div id="zhuye" >
    <yd-navbar :title="areaName"bgcolor="#0FA0FA" color="#fff">
      <i class="iconfont icon-yduifenlei" slot="right" style="font-size:0.4rem;color: #ffffff"  @click="gocompChart"></i>
    </yd-navbar>
    <div  class="mapcontent">
      <div style="position: absolute;top:calc(50% - 13px) ;left: calc(50% - 13px);width: 26px;height: 26px;z-index: 98;background-color: deepskyblue;border-radius: 50%" v-show="!showSearch"></div>
      <div style="position: absolute;width: 100%;height: 1px;top: 50%;background-color:#f66;z-index: 97" v-show="!showSearch"></div>
      <div style="position: absolute;width: 1px;height: 100%;left:50%;background-color: #f66;z-index: 97" v-show="!showSearch"></div>
      <div id="myChart" style="width: 100%;height: 100%;overflow: hidden"></div>
      <div class="search bar" v-show="showSearch">

        <form>

          <input placeholder="请输入搜索地点" type="text" v-model="search">

          <button   @click="searchzuobiao"></button>

        </form>
        <div class="searchcont" v-if="searchPlace">
          <li v-for="searitem in searchPlace" @click.self="searitemtap(searitem)">{{searitem.province}} {{searitem.city}} {{searitem.title}}
          </li></div>
      </div>
      <div id="searchResultPanel" style="border:1px solid #C0C0C0;width:150px;height:auto; display:none;overflow:scroll" ></div>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  import { mapMutations } from 'vuex'
  let echarts = require('echarts/lib/echarts')
  require('echarts/extension/bmap/bmap');
export default {

  data () {
    return {
      showSearch:false,
      search:'',
      addComp:{ },
      gkshow:true,
      mapdata: {},
      searchPlace:[],
      areaName:"",
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
        "现代服务业":"#6695ff",
        "研发":"#1f4fe9",
        "能源与基础原材料":"#0086d3",
        "装备制造":"#d1c0a5",
        "重化工制造":"#84ccc9",
      },
      seriesdata:[],
      showlegend:false,
      gkshows:false,
      asd:null,
      cishu:1,
      Bmap:null,
      qsd:null,
      phoneNum:'',
      user:{},
      center:{},
      selectAll:false,
      point:{ },
      myStyleJson:[
        {
          "featureType": "background",
          "elementType": "geometry",
          "stylers": {
            "color": "#fefeee"
          }
        }]
    }
  },

  computed:{
//    ...mapState({
//      centerpoint:"centerpoint",
//      userMessage:"userMessage"
//    })

  },
  watch:{
    search:function (val,old) {
      let vm =this;
      function myFun(){
        console.log(local.getResults())
        if(local.getResults()){
          vm.searchPlace = local.getResults().Dq;
        }else {
          vm.searchPlace = []
        }

      }
      var local = new BMap.LocalSearch(vm.Bmap, { //智能搜索
        onSearchComplete: myFun
      });
      local.search(val);
    }

  },
  mounted: function(){
    this.getpoints();
    this.user=JSON.parse(localStorage.getItem("user"))
    this.center=JSON.parse(localStorage.getItem("center"))
    this.areaName=this.center.areaName
    console.log(this.center)
  },

  methods:{

    searitemtap:function(searitem){
      let vm = this;
      let rpoint =  new BMap.Point(searitem.point.lng, searitem.point.lat);
      vm.Bmap.panTo(rpoint);
      vm.searchPlace = [];
      vm.showSearch = false;
      vm.search = '';
      let pram ={
        centerId:vm.center.centerId,
        pageSize:4000,
        centerName:searitem.title,
        userAccout:vm.phoneNum,
        longitude:searitem.point.lng,
        latitude: searitem.point.lat
      };
      vm.api(vm,'post',"重置中...","common/company/recordCenter.json",pram,function (data) {
        if(data.statusCode == 0){
          console.log(data)
          localStorage.setItem("center",JSON.stringify(data.dataInfo.listData[0]));
          vm.areaName=searitem.title;
          vm.$dialog.toast({mes: '重置中心点成功', timeout: 1500});

        }
      });
    },

    ...mapMutations([
      'setcenter'
    ]),
    searchzuobiao(){
      let vm =this;
      function myFun(){
        console.log(local.getResults())
        if(local.getResults()){
          vm.searitemtap(local.getResults().Dq[0]);
        }else {
          vm.$dialog.toast({mes: '您选择地址没有解析到结果', timeout: 500});
        }
      }
      var local = new BMap.LocalSearch(vm.Bmap, {
        onSearchComplete: myFun
      });
      local.search(vm.search);
    },
    gocompChart:function () {
      localStorage.setItem("AA",'13')
      this.$router.push({path:"compChart",query:{centerId:this.center.centerId}});
    },
    //    初始化数据点 中心点经纬度 地图缩放层级
    init:function () {
      let vm = this;
      console.log(vm.center);
      console.log(vm.mapdata);
      console.log(vm.user)
      vm.phoneNum=vm.user.userAccount
      vm.centerdata.name=vm.center.centerName;
      vm.centerdata.lng=vm.center.centerLongitude;
      vm.centerdata.lat=vm.center.centerLatitude;
      vm.point={"lng":vm.centerdata.lng,"lat":vm.centerdata.lat}
      vm.drawChinaMap(vm.centerdata.lng,vm.centerdata.lat,13);

    },
    getpoints:  function () {
      let vm = this;
      vm.api(vm,'post',"信息获取中...","common/company/findCompanyByObj.json",{centerId:vm.center.centerId,pageSize:6000},function (data) {
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
      console.log(vm.centerdata.lng+"aaa"+vm.centerdata.lat)
      let res = [{
        name: '中心点',
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: [
//          {
//          name: "中心点",
//          value:[vm.centerdata.lng,vm.centerdata.lat]}
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
          orient: 'vertical',
          right: 10,
          top: 80,
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
            "现在服务业":false,
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
      myChart.clear();
      // 绘制图表
      myChart.setOption(option);
      var bmap = myChart.getModel().getComponent('bmap').getBMap();
      console.log(bmap)
      vm.Bmap=bmap
//      bmap.setMapStyle({styleJson: vm.myStyleJson });
//      vm.drawline(bmap);
//      var point = new BMap.Point(vm.point.lng, vm.point.lat); //将标注点转化成地图上的点
//      var marker = new BMap.Marker(point); //将点转化成标注点
//      bmap.addOverlay(marker)
//      marker.setAnimation(BMAP_ANIMATION_BOUNCE)
      vm.addControl(bmap,"第二象限",BMAP_ANCHOR_TOP_LEFT,10,10,function () {
        vm.topcontrol(2)
      });
      vm.addControl(bmap,"第一象限",BMAP_ANCHOR_TOP_RIGHT,10,10,function () {
        vm.topcontrol(1)
      });
      vm.addControl(bmap,"第四象限",BMAP_ANCHOR_BOTTOM_RIGHT,10,40,function () {
        vm.topcontrol(4)
      });
      vm.addControl(bmap,"第三象限",BMAP_ANCHOR_BOTTOM_LEFT,10,40,function () {
        vm.topcontrol(3)
      });
      vm.addControl(bmap,"图例显隐",BMAP_ANCHOR_TOP_RIGHT,10,50,function () {
        vm.showlegend = !vm.showlegend;
        myChart.setOption({
          legend: {
            show:vm.showlegend
          },
        });
//        显示还是隐藏这些操作
        if(vm.showlegend == true){
          vm.addControl(bmap,"全选",BMAP_ANCHOR_TOP_RIGHT,80,50,function () {
            vm.selectAll = !vm.selectAll
            vm.setlengthsele(myChart,vm.selectAll)
          });
        }else {
          vm.deletecontrol(bmap);
        }

      });
      vm.addControl(bmap,"搜索地址",BMAP_ANCHOR_TOP_RIGHT,10,90,function () {
        console.log(vm.gkshows)
        vm.gkshow=!vm.gkshow
        vm.gkshows= !vm.gkshows;
        vm.showSearch=!vm.showSearch

        console.log(vm.gkshow)

      });

      bmap.addEventListener("dragend", function showInfo(){
        let offsetPoint = bmap.getZoom();
        localStorage.setItem("AA",offsetPoint)
        var x=bmap.getCenter().lng;
        var y=bmap.getCenter().lat;
        var myGeo = new BMap.Geocoder();
        var adds =  new BMap.Point(x,y)
        myGeo.getLocation(adds, function(rs){
          vm.addComp = rs.addressComponents;
          console.log(vm.addComp)
          var name=vm.addComp.province+vm.addComp.city+vm.addComp.district
          console.log(name)
          vm.api(vm,'post',"重置中...","common/company/recordCenter.json",{centerId:vm.center.centerId,pageSize:4000,centerName:name,userAccout:vm.phoneNum,longitude:bmap.getCenter().lng,latitude: bmap.getCenter().lat},function (data) {
            if(data.statusCode == 0){
              console.log(data)

              localStorage.setItem("center",JSON.stringify(data.dataInfo.listData[0]));
              vm.areaName=name
              vm.$dialog.toast({mes: '重置中心点成功', timeout: 1500});

            }
          });
        })

      });
    },
    topcontrol:function (position) {
      this.$router.push({path:"companylistchart",query:{companyCount:this.center.companyCount,position:position,centerId:this.center.centerId}})
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
      map.addControl(myZoomCtrl);
  },


    deletecontrol:function (map) {
      let vm = this;
      map.removeControl(vm.asd);
    },

  }
}
</script>

<style scoped>
 #zhuye{
   display: flex;
   flex-direction: column;
   position: absolute;
   width: 100%;
   height: 100%;
   box-sizing: border-box;
 }
  .mapcontent{
    flex: 1;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    position: relative;
  }
  #myChart{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  #zhuye .Controlfour,.BMap_noprint,.anchorTL{
    background-color: #555;
    color: red;
  }

  /*.selectall{*/
    /*position: fixed;*/
    /*top*/
    /*cursor : pointer;*/
    /*border:1px solid #ccc;*/
    /*backgroundColor :rgba(255,255,255,.5);*/
    /*borderRadius :3px;*/
    /*padding: 5px;*/
    /*boxShadow:1px 1px 2px rgba(0,0,0,.4)*/
  /*}*/
 * {
   box-sizing:border-box;
 }
 div.search {
   z-index: 999;
   padding:10px 0;
   position: absolute;
   top:200px;
   left:50px;

 }
 form {
   position:relative;
   width:300px;
   margin:0 auto;
 }
 input,button {
   border:none;
   outline:none;
 }
 input {
   width:100%;
   height:42px;
   padding-left:13px;
 }
 button {
   height:42px;
   width:42px;
   cursor:pointer;
   position:absolute;
 }
 .bar input {
   border:2px solid deepskyblue;
   border-radius:5px;
   background:white;
   top:0;
   right:0;
 }
 .bar button {
   background:deepskyblue;
   border-radius:0 5px 5px 0;
   width:60px;
   top:0;
   right:0;
 }
 .bar button:before {
   content:"搜索";
   font-size:13px;
   color:#F9F0DA;
 }
  .searchResult{
    height: 200px;
  }
  .searchcont{
    background-color: #fff;
    color: #555;
    padding-left: 0.3rem;
    border-bottom: solid 1px #ddd;
    border-left: solid 1px #ddd;
    border-right: solid 1px #ddd;
    padding-bottom: 5px;
  }
 .searchcont li{
   padding-top: 5px;
 }
</style>
