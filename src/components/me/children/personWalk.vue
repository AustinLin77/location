<template>

    <yd-layout class="me">
      <yd-navbar slot="navbar" title="走访记录" bgcolor="#0FA0FA" color="#fff">
        <span slot="left">
          <yd-navbar-back-icon color="#fff" @click.native="goback"></yd-navbar-back-icon>
        </span>
      </yd-navbar>
      <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
      <div slot="list">
        <div v-for="(item,n) in walkList" class="wolklist" @click="goItem(item)">
          <div class="comName">
            <span>{{item.companyName}}</span>
            <span> <i class="iconfont icon-yduidingwei"  style="font-size:0.28rem"></i> {{item.pointLatitude}},{{item.pointLongitude}}</span></div>
          <div class="comtype">行业类型：{{item.companyEconomicsTypeStr}}</div>
          <div class="comtype">行业产业链：{{item.companyEconomicsLevelStr}}</div>
        </div>
      </div>
      <!-- 数据全部加载完毕显示 -->
      <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>
      <!-- 加载中提示，不指定，将显示默认加载中图标 -->
      <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
    </yd-infinitescroll>
    </yd-layout>

</template>

<script>
  import  { mapState,mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
         walkList:[],
         totalPage:0,
         page:1,
      user:{},
      centerpoint:{}
    }
  },
  mounted: function(){
    this.user=JSON.parse(localStorage.getItem("user"))
    this.centerpoint=JSON.parse(localStorage.getItem("center"))
    this.getList(1);
  },
  computed:{
//    ...mapState({
//      user:"userMessage",
//      centerpoint:"centerpoint"
//    })
  },
  methods:{
    goback:function () {
      this.$router.go(-1)
    },
    loadList() {
      console.log("aaaaaa");
      let vm = this;
      vm.page++;
      if(vm.page>vm.totalPage){
        vm.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
        return;
      }
      vm.getList(vm.page);
    },
    getList:function (page) {
      let vm = this;
      vm.api(vm,'post',"信息获取中...","common/company/findUserOfPoint.json",{
        pointCenterId:vm.centerpoint.centerId,
        uId:vm.user.userId,
        pageSize:15,
        page:page,
      },function (data) {
        console.log(data);
        if(data.statusCode == 0){
          vm.walkList = vm.walkList.concat(data.dataInfo.listData);
          vm.totalPage = data.dataInfo.pageInfo.totalPage;
          vm.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
        }
      });
    },
    ...mapMutations([
      'setcompanyItem',
    ]),
    goItem:function (item) {
      console.log(item);
//      this.$router.push({path:"companyItem"})
//      this.setcompanyItem(item)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .me{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .wolklist{
    border-bottom: solid 8px #eee;
    padding-left: 0.32rem;
    padding-right: 0.32rem;
    padding-top: 0.16rem;
    padding-bottom: 0.16rem;
  }
  .wolklist .comName{
    display: flex;
    justify-content: space-between;
    line-height: 0.6rem;
    color: rgba(16, 16, 16, 1);
    font-size: 0.28rem;
  }
  .wolklist .comtype{
    min-height: 0.46rem;
    line-height: 0.46rem;
    color: rgba(111, 111, 111, 1);
    font-size: 0.26rem;


  }
</style>
