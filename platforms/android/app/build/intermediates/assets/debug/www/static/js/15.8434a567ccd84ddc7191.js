webpackJsonp([15],{"Oq+O":function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o("Dd8w"),i=o.n(n),a=o("NYxO"),s=o("Icdr"),c={data:function(){return{totalnum:6e3,xlinename:"",xlineTiem:"",centerId:"",total:"",datacolor:{"传统服务业":"#66d2ff","供应链管理":"#e8e825","其他":"#8a66ff","加工制造":"#eb66ff","整合信息":"#ffaa66","旅游文化创意":"#32b16c","日用制造":"#e565ac","物流采购":"#a98eff","现在服务业":"#6695ff","研发":"#1f4fe9","能源与基础原材料":"#0086d3","装备制造":"#d1c0a5","重化工制造":"#84ccc9"}}},computed:i()({},Object(a.d)({centerpoint:"centerpoint",userMessage:"userMessage"})),watch:{},mounted:function(){this.xlineTiem=this.$route.query.position,this.centerId=this.$route.query.centerId,this.totalnum=this.$route.query.companyCount;this.xlinename=["第一象限","第二象限","第三象限","第四象限"][this.xlineTiem-1],this.getList(1)},methods:i()({goback:function(){this.$router.go(-1)},gocomplist:function(){this.$router.push({path:"companylist",query:{position:this.xlineTiem,centerId:this.centerId}})},setpiechart:function(t,e){var o={tooltip:{trigger:"item",formatter:function(t){return t.name+"："+e[t.name]+"%"}},legend:{show:!0,borderColor:"#eee",formatter:function(t){return t+"("+e[t]+"%)"}},series:[{type:"pie",radius:"50%",center:["50%","60%"],data:t,label:{normal:{}}}]},n=s.init(document.getElementById("listpiechart"));this.myCharts=n,n.setOption(o)},getList:function(t){var e=this;e.companyList=[],e.api(e,"post","信息获取中...","common/company/findQuadrantCount.json",{pointCenterId:e.centerId,pointQuadrant:e.xlineTiem,userAccout:e.userMessage.userAccount},function(t){if(console.log(t),0==t.statusCode&&t.dataInfo.listData){e.total=t.dataInfo.listData[0].total;var o={},n=t.dataInfo.listData[0].types.map(function(t){return o[t.cEconomicsName]=(t.count/e.total*100).toFixed(2),{value:t.count,name:t.cEconomicsName,itemStyle:{color:e.datacolor[t.cEconomicsName]}}});e.setpiechart(n,o)}})}},Object(a.c)(["setcompanyItem"]),{goItem:function(t){console.log(t),this.$router.push({path:"companyItem"}),this.setcompanyItem(t)}})},r={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("yd-layout",{attrs:{id:"conlist"}},[o("yd-navbar",{attrs:{slot:"navbar",title:t.xlinename,bgcolor:"#0FA0FA",color:"#fff"},slot:"navbar"},[o("yd-navbar-back-icon",{attrs:{slot:"left",color:"#fff"},nativeOn:{click:function(e){return t.goback(e)}},slot:"left"}),t._v(" "),o("i",{staticClass:"iconfont icon-yduifenlei",staticStyle:{"font-size":"0.4rem",color:"#ffffff"},attrs:{slot:"right"},on:{click:t.gocomplist},slot:"right"})],1),t._v(" "),o("div",{staticClass:"linetop",attrs:{slot:"top"},slot:"top"},[t._v(" 共计"),o("span",{staticStyle:{"font-size":"0.8rem"}},[t._v(t._s(t.total))]),t._v("家")]),t._v(" "),o("div",{attrs:{id:"listpiechart"}})],1)},staticRenderFns:[]};var l=o("VU/8")(c,r,!1,function(t){o("kGwP")},"data-v-00f1b4e8",null);e.default=l.exports},kGwP:function(t,e){}});