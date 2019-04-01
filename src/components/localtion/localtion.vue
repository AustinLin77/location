<template>
  <div id="loction" >
    <yd-navbar title="走访记录" bgcolor="#0FA0FA" color="#fff" style="width: 100%">

      <!--<yd-icon class="iconfont icon-yduifenlei" slot="right" size="0.4rem" color="#fff"  @click.native="gocompChart"></yd-icon>-->
    </yd-navbar>
    <div class="topmess">当前位置： {{pointdata.lng}} , {{ pointdata.lat}}</div>
    <div  class="mapcontent">

      <div id="container" style="width: 100%;height: 100%;overflow: hidden"></div>

    </div>
    <div class="bottbut" @click="addcompany">
      <yd-tabbar fontsize="0.28rem" color="#0FA0FA">
      <yd-tabbar-item title="记录" link="#">
        <i slot="icon"  class="iconfont icon-yduifankui"  style="font-size:0.54rem;color: #0FA0FA"></i>
        <!--<yd-icon name="feedback" slot="icon" size="0.54rem" color="#0FA0FA"></yd-icon>-->
      </yd-tabbar-item>
      </yd-tabbar>
    </div>
  </div>
</template>

<script>
 import icon from "@/assets/locl.png"
 import {mapState} from "vuex"
  export default {

    data () {
      return {
          pointdata:{
            lng:"",
            lat:""
          },
      centerpoint:{}
      }
    },
    watch:{

    },
    mounted: function(){
//      this.user=JSON.parse(localStorage.getItem("user"))
      this.centerpoint=JSON.parse(localStorage.getItem("center"))
      console.log(this.centerpoint);
       let lng=this.centerpoint.centerLongitude;
       let lat=this.centerpoint.centerLatitude;
       this.initMap(lng,lat);
    },
    computed:{
//      ...mapState({
//        centerpoint:"centerpoint"
//      })
    },
    methods:{

//      初始化地图
      initMap:function (lng,lat) {
        let vm = this;
        let map = new BMap.Map("container");          // 创建地图实例
        let point = new BMap.Point(lng, lat);  // 创建点坐标
        map.centerAndZoom(point, 14);
        map.enableScrollWheelZoom(true);
        map.addControl(new BMap.NavigationControl());//比例尺
        vm.setlocation(map);
        vm.addControl(map,"乌镇",BMAP_ANCHOR_BOTTOM_LEFT,10,50,function () {
          map.clearOverlays();
          let rpoint =  new BMap.Point(vm.centerpoint.centerLongitude, vm.centerpoint.centerLatitude);
          map.panTo(rpoint);
          vm.addmarker(vm.centerpoint.centerLongitude,vm.centerpoint.centerLatitude,map,true);
        });
        vm.addControl(map,"定位",BMAP_ANCHOR_BOTTOM_LEFT,10,100,function () {
           map.clearOverlays();
           vm.setlocation(map);
        });
      },
//      进行定位，如果定位成功标记点移到定位地方，定位失败标记点移到中心点
      setlocation:function (map) {
        let vm = this;
        vm.$dialog.loading.open('获取定位中...');
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          vm.$dialog.loading.close();
          if(this.getStatus() == BMAP_STATUS_SUCCESS){//定位成功

            map.panTo(r.point);
            vm.addmarker(r.point.lng,r.point.lat,map,true);
          } else {//定位失败
            vm.addmarker(vm.centerpoint.centerLongitude,vm.centerpoint.centerLatitude,map,true);
            vm.$dialog.toast({
              mes: '获取定位失败',
              timeout: 1500
            });
          }
        },{enableHighAccuracy: true})
      },
      addcompany:function () {
          this.$router.push({path:"addcompany",query:{
            lng:this.pointdata.lng,
            lat:this.pointdata.lat
          }})
      },
//      keytool -genkey -v -keystore wuzhenApp.keystore -alias wuyi -keyalg RSA -keysize 2048 -validity 10000
//      添加标记点 （经度，纬度，地图，是否可拖拽）
      addmarker:function (lng,lat,map,ebleDragging) {
        let vm = this;

        let point = new BMap.Point(lng,lat);
        vm.pointdata.lng = parseFloat(lng).toFixed(6);
        vm.pointdata.lat = parseFloat(lat).toFixed(6);
        var myIcon = new BMap.Icon(icon, new BMap.Size(50,50));
        let marker = new BMap.Marker(point,{icon:myIcon});
        map.addOverlay(marker);
        if(ebleDragging==true){
          marker.enableDragging();
          marker.addEventListener("dragend", function(e){
            vm.pointdata.lng = e.point.lng;
            vm.pointdata.lat = e.point.lat;
          })
        }
      },
      addControl:function (map,content,off,top,left,fn) {
        // 定义一个控件类，即function
        function ZoomControl(){
          // 设置默认停靠位置和偏移量
          this.defaultAnchor = off;
          this.defaultOffset = new BMap.Size(top, left);
        }
// 通过JavaScript的prototype属性继承于BMap.Control
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
          // 绑定事件，点击一次放大两级
          div.onclick = fn
          // 添加DOM元素到地图中
          map.getContainer().appendChild(div);
          // 将DOM元素返回
          return div;
        }

// 创建控件实例
        var myZoomCtrl = new ZoomControl();
// 添加到地图当中
        map.addControl(myZoomCtrl);


      }
    }
  }
</script>

<style scoped>
  #loction{
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    align-items: center;
    position: absolute;
    width: 100%;

  }
  .mapcontent{
    flex: 1;
    background-color: #fff;
    overflow: hidden;
    width: 100%;
  }
  .topmess{
    margin: 0 auto;
    position: absolute;
    top:70px;
    width: 80%;
    height: 0.8rem;
    background-color: rgba(255,255,255,.8);
    z-index: 999;
    border-radius: 20px;
    box-shadow:1px 1px 2px rgba(0,0,0,.4);
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.28rem;
  }
  .bottbut{
    display:flex ;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
    background-color: rgba(255,255,255,.8);
    border-radius: 50%;
    z-index: 999;
    width: 1.6rem;
    height: 1.6rem;
    background-color: #fff;
    box-shadow: 0px 1px 10px 0px rgba(0, 154, 250, 0.5);
  }
</style>
