webpackJsonp([6],{SV3O:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e("Dd8w"),i=e.n(n),s=e("NYxO"),a={name:"HelloWorld",data:function(){return{walkList:[],totalPage:0,page:1}},mounted:function(){console.log(this.centerpoint),console.log(this.user),this.getList(1)},computed:i()({},Object(s.d)({user:"userMessage",centerpoint:"centerpoint"})),methods:i()({goback:function(){this.$router.go(-1)},loadList:function(){console.log("aaaaaa");var t=this;t.page++,t.page>t.totalPage?t.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.loadedDone"):t.getList(t.page)},getList:function(t){var o=this;o.api(o,"post","信息获取中...","common/company/findUserOfPoint.json",{pointCenterId:o.centerpoint.centerId,uId:o.user.userId,pageSize:15,page:t},function(t){console.log(t),0==t.statusCode&&(o.walkList=o.walkList.concat(t.dataInfo.listData),o.totalPage=t.dataInfo.pageInfo.totalPage,o.$refs.infinitescrollDemo.$emit("ydui.infinitescroll.finishLoad"))})}},Object(s.c)(["setcompanyItem"]),{goItem:function(t){console.log(t)}})},l={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("yd-layout",{staticClass:"me"},[e("yd-navbar",{attrs:{slot:"navbar",title:"走访记录",bgcolor:"#0FA0FA",color:"#fff"},slot:"navbar"},[e("span",{attrs:{slot:"left"},slot:"left"},[e("yd-navbar-back-icon",{attrs:{color:"#fff"},nativeOn:{click:function(o){return t.goback(o)}}})],1)]),t._v(" "),e("yd-infinitescroll",{ref:"infinitescrollDemo",attrs:{callback:t.loadList}},[e("div",{attrs:{slot:"list"},slot:"list"},t._l(t.walkList,function(o,n){return e("div",{staticClass:"wolklist",on:{click:function(e){t.goItem(o)}}},[e("div",{staticClass:"comName"},[e("span",[t._v(t._s(o.companyName))]),t._v(" "),e("span",[e("i",{staticClass:"iconfont icon-yduidingwei",staticStyle:{"font-size":"0.28rem"}}),t._v(" "+t._s(o.pointLatitude)+","+t._s(o.pointLongitude))])]),t._v(" "),e("div",{staticClass:"comtype"},[t._v("行业类型："+t._s(o.companyEconomicsTypeStr))]),t._v(" "),e("div",{staticClass:"comtype"},[t._v("行业产业链："+t._s(o.companyEconomicsLevelStr))])])})),t._v(" "),e("span",{attrs:{slot:"doneTip"},slot:"doneTip"},[t._v("啦啦啦，啦啦啦，没有数据啦~~")]),t._v(" "),e("img",{attrs:{slot:"loadingTip",src:"http://static.ydcss.com/uploads/ydui/loading/loading10.svg"},slot:"loadingTip"})])],1)},staticRenderFns:[]};var c=e("VU/8")(a,l,!1,function(t){e("vfxI")},"data-v-ec50bb22",null);o.default=c.exports},vfxI:function(t,o){}});