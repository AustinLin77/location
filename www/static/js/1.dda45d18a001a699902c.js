webpackJsonp([1],{"/66K":function(e,t,o){var n=o("XLwt"),a=o("YCip");o("nuAP"),o("QdU8"),n.registerCoordinateSystem("bmap",a),n.registerAction({type:"bmapRoam",event:"bmapRoam",update:"updateLayout"},function(e,t){t.eachComponent("bmap",function(e){var t=e.getBMap(),o=t.getCenter();e.setCenterAndZoom([o.lng,o.lat],t.getZoom())})});t.version="1.0.0"},"5rKY":function(e,t){},QdU8:function(e,t,o){var n=o("XLwt").extendComponentView({type:"bmap",render:function(e,t,o){var n=!0,a=e.getBMap(),r=o.getZr().painter.getViewportRoot(),i=e.coordinateSystem,s=function(t,a){if(!n){var s=r.parentNode.parentNode.parentNode,c=[-parseInt(s.style.left,10)||0,-parseInt(s.style.top,10)||0];r.style.left=c[0]+"px",r.style.top=c[1]+"px",i.setMapOffset(c),e.__mapOffset=c,o.dispatchAction({type:"bmapRoam"})}};function c(){n||o.dispatchAction({type:"bmapRoam"})}a.removeEventListener("moving",this._oldMoveHandler),a.removeEventListener("zoomend",this._oldZoomEndHandler),a.addEventListener("moving",s),a.addEventListener("zoomend",c),this._oldMoveHandler=s,this._oldZoomEndHandler=c;var l=e.get("roam");l&&"scale"!==l?a.enableDragging():a.disableDragging(),l&&"move"!==l?(a.enableScrollWheelZoom(),a.enableDoubleClickZoom(),a.enablePinchToZoom()):(a.disableScrollWheelZoom(),a.disableDoubleClickZoom(),a.disablePinchToZoom());var p=e.__mapStyle,d=e.get("mapStyle")||{},m=JSON.stringify(d);JSON.stringify(p)!==m&&(Object.keys(d).length&&a.setMapStyle(d),e.__mapStyle=JSON.parse(m)),n=!1}});e.exports=n},YCip:function(e,t,o){var n,a=o("XLwt"),r=a.util,i=a.graphic,s=a.matrix;function c(e,t){this._bmap=e,this.dimensions=["lng","lat"],this._mapOffset=[0,0],this._api=t,this._projection=new BMap.MercatorProjection}function l(e,t){return t=t||[0,0],r.map([0,1],function(o){var n=t[o],a=e[o]/2,r=[],i=[];return r[o]=n-a,i[o]=n+a,r[1-o]=i[1-o]=t[1-o],Math.abs(this.dataToPoint(r)[o]-this.dataToPoint(i)[o])},this)}c.prototype.dimensions=["lng","lat"],c.prototype.setZoom=function(e){this._zoom=e},c.prototype.setCenter=function(e){this._center=this._projection.lngLatToPoint(new BMap.Point(e[0],e[1]))},c.prototype.setMapOffset=function(e){this._mapOffset=e},c.prototype.getBMap=function(){return this._bmap},c.prototype.dataToPoint=function(e){var t=new BMap.Point(e[0],e[1]),o=this._bmap.pointToOverlayPixel(t),n=this._mapOffset;return[o.x-n[0],o.y-n[1]]},c.prototype.pointToData=function(e){var t=this._mapOffset;return[(e=this._bmap.overlayPixelToPoint({x:e[0]+t[0],y:e[1]+t[1]})).lng,e.lat]},c.prototype.getViewRect=function(){var e=this._api;return new i.BoundingRect(0,0,e.getWidth(),e.getHeight())},c.prototype.getRoamTransform=function(){return s.create()},c.prototype.prepareCustoms=function(e){var t=this.getViewRect();return{coordSys:{type:"bmap",x:t.x,y:t.y,width:t.width,height:t.height},api:{coord:r.bind(this.dataToPoint,this),size:r.bind(l,this)}}},c.dimensions=c.prototype.dimensions,c.create=function(e,t){var o,a=t.getDom();e.eachComponent("bmap",function(e){var r=t.getZr().painter,i=r.getViewportRoot();if("undefined"==typeof BMap)throw new Error("BMap api is not loaded");if(n=n||function(){function e(e){this._root=e}return e.prototype=new BMap.Overlay,e.prototype.initialize=function(e){return e.getPanes().labelPane.appendChild(this._root),this._root},e.prototype.draw=function(){},e}(),o)throw new Error("Only one bmap component can exist");if(!e.__bmap){var s=a.querySelector(".ec-extension-bmap");s&&(i.style.left="0px",i.style.top="0px",a.removeChild(s)),(s=document.createElement("div")).style.cssText="width:100%;height:100%",s.classList.add("ec-extension-bmap"),a.appendChild(s);var l=e.__bmap=new BMap.Map(s),p=new n(i);l.addOverlay(p),r.getViewportRootOffset=function(){return{offsetLeft:0,offsetTop:0}}}l=e.__bmap;var d=e.get("center"),m=e.get("zoom");if(d&&m){var h=new BMap.Point(d[0],d[1]);l.centerAndZoom(h,m)}(o=new c(l,t)).setMapOffset(e.__mapOffset||[0,0]),o.setZoom(m),o.setCenter(d),e.coordinateSystem=o}),e.eachSeries(function(e){"bmap"===e.get("coordinateSystem")&&(e.coordinateSystem=o)})};var p=c;e.exports=p},caIY:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("mvHQ"),a=o.n(n),r=o("Dd8w"),i=o.n(r),s=o("NYxO"),c=o("Icdr");o("/66K");var l={data:function(){return{showSearch:!1,search:"",addComp:{},gkshow:!0,mapdata:{},searchPlace:[],areaName:"",centerdata:{},datacolor:{"传统服务业":"#66d2ff","供应链管理":"#e8e825","其他":"#8a66ff","加工制造":"#eb66ff","整合信息":"#ffaa66","旅游文化创意":"#32b16c","日用制造":"#e565ac","物流采购":"#a98eff","现代服务业":"#6695ff","研发":"#1f4fe9","能源与基础原材料":"#0086d3","装备制造":"#d1c0a5","重化工制造":"#84ccc9"},seriesdata:[],showlegend:!1,gkshows:!1,asd:null,cishu:1,Bmap:null,qsd:null,phoneNum:"",user:{},center:{},selectAll:!1,point:{},myStyleJson:[{featureType:"background",elementType:"geometry",stylers:{color:"#fefeee"}}]}},computed:{},watch:{search:function(e,t){var o=this;var n=new BMap.LocalSearch(o.Bmap,{onSearchComplete:function(){console.log(n.getResults()),n.getResults()?o.searchPlace=n.getResults().Dq:o.searchPlace=[]}});n.search(e)}},mounted:function(){this.getpoints(),this.user=JSON.parse(localStorage.getItem("user")),this.center=JSON.parse(localStorage.getItem("center")),this.areaName=this.center.areaName,console.log(this.center)},methods:i()({searitemtap:function(e){var t=this,o=new BMap.Point(e.point.lng,e.point.lat);t.Bmap.panTo(o),t.searchPlace=[],t.showSearch=!1,t.search="";var n={centerId:t.center.centerId,pageSize:4e3,centerName:e.title,userAccout:t.phoneNum,longitude:e.point.lng,latitude:e.point.lat};t.api(t,"post","重置中...","common/company/recordCenter.json",n,function(o){0==o.statusCode&&(console.log(o),localStorage.setItem("center",a()(o.dataInfo.listData[0])),t.areaName=e.title,t.$dialog.toast({mes:"重置中心点成功",timeout:1500}))})}},Object(s.c)(["setcenter"]),{searchzuobiao:function(){var e=this;var t=new BMap.LocalSearch(e.Bmap,{onSearchComplete:function(){console.log(t.getResults()),t.getResults()?e.searitemtap(t.getResults().Dq[0]):e.$dialog.toast({mes:"您选择地址没有解析到结果",timeout:500})}});t.search(e.search)},gocompChart:function(){localStorage.setItem("AA","13"),this.$router.push({path:"compChart",query:{centerId:this.center.centerId}})},init:function(){var e=this;console.log(e.center),console.log(e.mapdata),console.log(e.user),e.phoneNum=e.user.userAccount,e.centerdata.name=e.center.centerName,e.centerdata.lng=e.center.centerLongitude,e.centerdata.lat=e.center.centerLatitude,e.point={lng:e.centerdata.lng,lat:e.centerdata.lat},e.drawChinaMap(e.centerdata.lng,e.centerdata.lat,13)},getpoints:function(){var e=this;e.api(e,"post","信息获取中...","common/company/findCompanyByObj.json",{centerId:e.center.centerId,pageSize:6e3},function(t){if(0==t.statusCode){e.gkshow=!0,console.log(t);for(var o=0;o<t.dataInfo.listData.length;o++)e.mapdata[t.dataInfo.listData[o].cEconomicsName]=t.dataInfo.listData[o].data;e.init()}})},convertData:function(e){for(var t=this,o=[],n=0;n<t.mapdata[e].length;n++)t.mapdata[e][n].ponitLongitude&&t.mapdata[e][n].ponitLatitude&&o.push({name:t.mapdata[e][n].companyName,value:[t.mapdata[e][n].ponitLongitude,t.mapdata[e][n].ponitLatitude]});return o},setpointserise:function(e){var t=this;console.log(t.centerdata.lng+"aaa"+t.centerdata.lat);var o=[{name:"中心点",type:"effectScatter",coordinateSystem:"bmap",data:[],symbolSize:20,showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!1,itemStyle:{normal:{color:"#00a8ff",shadowBlur:10,shadowColor:"#333"}},zlevel:1}];for(var n in t.datacolor)o.push({name:n,type:"scatter",coordinateSystem:"bmap",data:t.convertData(n),symbolSize:e,hoverAnimation:!1,itemStyle:{normal:{color:t.datacolor[n],show:!1}}});return o},drawChinaMap:function(e,t,o){var n=this,r={title:{text:""},tooltip:{trigger:"item",formatter:"{a}<br>{b}",position:["5%","50%"]},legend:{show:n.showlegend,orient:"vertical",right:10,top:80,backgroundColor:"rgba(255,255,255,.8)",borderColor:"#eee",selected:{"传统服务业":!0,"供应链管理":!0,"其他":!1,"加工制造":!0,"整合信息":!0,"旅游文化创意":!0,"日用制造":!0,"物流采购":!1,"现在服务业":!1,"研发":!1,"能源与基础原材料":!1,"装备制造":!1,"重化工制造":!1}},bmap:{center:[e,t],zoom:o,roam:!0},series:n.setpointserise(7),animation:!1},i=c.init(document.getElementById("myChart"));i.clear(),i.setOption(r);var s=i.getModel().getComponent("bmap").getBMap();console.log(s),n.Bmap=s,n.addControl(s,"第二象限",BMAP_ANCHOR_TOP_LEFT,10,10,function(){n.topcontrol(2)}),n.addControl(s,"第一象限",BMAP_ANCHOR_TOP_RIGHT,10,10,function(){n.topcontrol(1)}),n.addControl(s,"第四象限",BMAP_ANCHOR_BOTTOM_RIGHT,10,40,function(){n.topcontrol(4)}),n.addControl(s,"第三象限",BMAP_ANCHOR_BOTTOM_LEFT,10,40,function(){n.topcontrol(3)}),n.addControl(s,"图例显隐",BMAP_ANCHOR_TOP_RIGHT,10,50,function(){n.showlegend=!n.showlegend,i.setOption({legend:{show:n.showlegend}}),1==n.showlegend?n.addControl(s,"全选",BMAP_ANCHOR_TOP_RIGHT,80,50,function(){n.selectAll=!n.selectAll,n.setlengthsele(i,n.selectAll)}):n.deletecontrol(s)}),n.addControl(s,"搜索地址",BMAP_ANCHOR_TOP_RIGHT,10,90,function(){console.log(n.gkshows),n.gkshow=!n.gkshow,n.gkshows=!n.gkshows,n.showSearch=!n.showSearch,console.log(n.gkshow)}),s.addEventListener("dragend",function(){var e=s.getZoom();localStorage.setItem("AA",e);var t=s.getCenter().lng,o=s.getCenter().lat,r=new BMap.Geocoder,i=new BMap.Point(t,o);r.getLocation(i,function(e){n.addComp=e.addressComponents,console.log(n.addComp);var t=n.addComp.province+n.addComp.city+n.addComp.district;console.log(t),n.api(n,"post","重置中...","common/company/recordCenter.json",{centerId:n.center.centerId,pageSize:4e3,centerName:t,userAccout:n.phoneNum,longitude:s.getCenter().lng,latitude:s.getCenter().lat},function(e){0==e.statusCode&&(console.log(e),localStorage.setItem("center",a()(e.dataInfo.listData[0])),n.areaName=t,n.$dialog.toast({mes:"重置中心点成功",timeout:1500}))})})})},topcontrol:function(e){this.$router.push({path:"companylistchart",query:{companyCount:this.center.companyCount,position:e,centerId:this.center.centerId}})},setlengthsele:function(e,t){1==t?e.setOption({legend:{selected:{"传统服务业":!0,"供应链管理":!0,"其他":!0,"加工制造":!0,"整合信息":!0,"旅游文化创意":!0,"日用制造":!0,"物流采购":!0,"现代服务业":!0,"研发":!0,"能源与基础原材料":!0,"装备制造":!0,"重化工制造":!0}}}):e.setOption({legend:{selected:{"传统服务业":!1,"供应链管理":!1,"其他":!1,"加工制造":!1,"整合信息":!1,"旅游文化创意":!1,"日用制造":!1,"物流采购":!1,"现代服务业":!1,"研发":!1,"能源与基础原材料":!1,"装备制造":!1,"重化工制造":!1}}})},getlinedata:function(e,t,o){return{top:{lng:e,lat:(t+9e-6*o).toFixed(5)},bottom:{lng:e,lat:(t-9e-6*o).toFixed(5)},left:{lng:(e-1e-5*o).toFixed(5),lat:t},right:{lng:(e+1e-5*o).toFixed(5),lat:t}}},addControl:function(e,t,o,n,a,r){function i(){this.defaultAnchor=o,this.defaultOffset=new BMap.Size(n,a)}i.prototype=new BMap.Control,i.prototype.initialize=function(e){var o=document.createElement("div");return o.appendChild(document.createTextNode(t)),o.classList.add("Controlfour"),o.style.cursor="pointer",o.style.border="1px solid #ccc",o.style.backgroundColor="rgba(255,255,255,.5)",o.style.borderRadius="3px",o.style.padding="5px",o.style.boxShadow="1px 1px 2px rgba(0,0,0,.4)",o.onclick=r,e.getContainer().appendChild(o),o};var s=new i;this.asd=s,e.addControl(s)},deletecontrol:function(e){e.removeControl(this.asd)}})},p={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{attrs:{id:"zhuye"}},[o("yd-navbar",{attrs:{title:e.areaName,bgcolor:"#0FA0FA",color:"#fff"}},[o("i",{staticClass:"iconfont icon-yduifenlei",staticStyle:{"font-size":"0.4rem",color:"#ffffff"},attrs:{slot:"right"},on:{click:e.gocompChart},slot:"right"})]),e._v(" "),o("div",{staticClass:"mapcontent"},[o("div",{directives:[{name:"show",rawName:"v-show",value:!e.showSearch,expression:"!showSearch"}],staticStyle:{position:"absolute",top:"calc(50% - 13px)",left:"calc(50% - 13px)",width:"26px",height:"26px","z-index":"98","background-color":"deepskyblue","border-radius":"50%"}}),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:!e.showSearch,expression:"!showSearch"}],staticStyle:{position:"absolute",width:"100%",height:"1px",top:"50%","background-color":"#f66","z-index":"97"}}),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:!e.showSearch,expression:"!showSearch"}],staticStyle:{position:"absolute",width:"1px",height:"100%",left:"50%","background-color":"#f66","z-index":"97"}}),e._v(" "),o("div",{staticStyle:{width:"100%",height:"100%",overflow:"hidden"},attrs:{id:"myChart"}}),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.showSearch,expression:"showSearch"}],staticClass:"search bar"},[o("form",[o("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],attrs:{placeholder:"请输入搜索地点",type:"text"},domProps:{value:e.search},on:{input:function(t){t.target.composing||(e.search=t.target.value)}}}),e._v(" "),o("button",{on:{click:e.searchzuobiao}})]),e._v(" "),e.searchPlace?o("div",{staticClass:"searchcont"},e._l(e.searchPlace,function(t){return o("li",{on:{click:function(o){if(o.target!==o.currentTarget)return null;e.searitemtap(t)}}},[e._v(e._s(t.province)+" "+e._s(t.city)+" "+e._s(t.title)+"\n        ")])})):e._e()]),e._v(" "),o("div",{staticStyle:{border:"1px solid #C0C0C0",width:"150px",height:"auto",display:"none",overflow:"scroll"},attrs:{id:"searchResultPanel"}})])],1)},staticRenderFns:[]};var d=o("VU/8")(l,p,!1,function(e){o("5rKY")},"data-v-e5c380fe",null);t.default=d.exports},mvHQ:function(e,t,o){e.exports={default:o("qkKv"),__esModule:!0}},nuAP:function(e,t,o){var n=o("XLwt").extendComponentModel({type:"bmap",getBMap:function(){return this.__bmap},setCenterAndZoom:function(e,t){this.option.center=e,this.option.zoom=t},centerOrZoomChanged:function(e,t){var o,n,a=this.option;return o=e,n=a.center,!(o&&n&&o[0]===n[0]&&o[1]===n[1]&&t===a.zoom)},defaultOption:{center:[104.114129,37.550339],zoom:5,mapStyle:{},roam:!1}});e.exports=n},qkKv:function(e,t,o){var n=o("FeBl"),a=n.JSON||(n.JSON={stringify:JSON.stringify});e.exports=function(e){return a.stringify.apply(a,arguments)}}});