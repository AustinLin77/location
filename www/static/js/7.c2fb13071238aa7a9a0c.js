webpackJsonp([7],{CoL7:function(t,o,c){"use strict";Object.defineProperty(o,"__esModule",{value:!0});c("NYxO");var n={data:function(){return{isActive:!0,centerId:"",companyList:[],cEconomicsName:"",cEconomicsId:"",pointCenterId:""}},watch:{},mounted:function(){this.pointCenterId=this.$route.query.pointCenterId,this.cEconomicsId=this.$route.query.cEconomicsId,this.cEconomicsName=this.$route.query.cEconomicsName,this.getList()},methods:{goback:function(){this.$router.go(-1)},changetype:function(t){"list"==t&&(this.isActive=!0),"chart"==t&&(this.isActive=!1)},getList:function(t){var o=this;o.api(o,"post","信息获取中...","common/company/findEconomicslevelAndCompany.json",{cEconomicsId:o.cEconomicsId,pointCenterId:o.pointCenterId},function(t){console.log(t),0==t.statusCode&&(o.companyList=o.companyList.concat(t.dataInfo.listData))})},goItem:function(t,o){this.$router.push({path:"ecCompanylist",query:{companyEconomicsType:this.cEconomicsId,companyEconomicsName:o,pointCenterId:this.pointCenterId,companyEconomicsLevel:t}})}}},e={render:function(){var t=this,o=t.$createElement,c=t._self._c||o;return c("yd-layout",{attrs:{id:"conlist"}},[c("yd-navbar",{attrs:{slot:"navbar",title:t.cEconomicsName,bgcolor:"#0FA0FA",color:"#fff"},slot:"navbar"},[c("yd-navbar-back-icon",{attrs:{slot:"left",color:"#fff"},nativeOn:{click:function(o){return t.goback(o)}},slot:"left"})],1),t._v(" "),c("div",t._l(t.companyList,function(o,n){return c("div",{staticClass:"companylist",on:{click:function(c){t.goItem(o.cEconomicsLevelId,o.cEconomicsLevelName)}}},[c("div",{staticStyle:{"border-bottom":"solid 1px #eee"}},[c("yd-cell-item",[c("span",{attrs:{slot:"left"},slot:"left"},[t._v(t._s(o.cEconomicsLevelName))]),t._v(" "),c("span",{attrs:{slot:"right"},slot:"right"},[t._v(t._s(o.countCompany)+"个企业")])])],1)])}))],1)},staticRenderFns:[]};var i=c("VU/8")(n,e,!1,function(t){c("Gjlu")},"data-v-b5a445a0",null);o.default=i.exports},Gjlu:function(t,o){}});