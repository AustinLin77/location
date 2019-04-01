<template>
  <yd-layout id="conlist" >
    <yd-navbar slot="navbar" :title="cEconomicsName"bgcolor="#0FA0FA" color="#fff">
        <yd-navbar-back-icon color="#fff" @click.native="goback" slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <div class="linetop" slot="top"> 共计<span style="font-size: 0.8rem;">{{total}}</span>家</div>
    <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
       <div slot="list">
         <div v-for="(item,n) in companyList" class="companylist" @click="goItem(item)">
           <span>{{n+1}}</span>
           <span class="conterName">{{item.companyName}}</span>
           <span>{{item.companyNumber}}</span>
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
  import { mapMutations } from 'vuex'
export default {

  data () {
    return {
      companyEconomicsType:"",
      cEconomicsName:"",
      pointCenterId:"",
      companyEconomicsLevel:"",
       totalPage:0,
       total:"",
       companyList:[],
       page:1
    }
  },
  watch:{

  },
  mounted: function(){
      this.cEconomicsId = this.$route.query.cEconomicsId;
      this.cEconomicsName = this.$route.query.cEconomicsName;
      this.pointCenterId = this.$route.query.pointCenterId;
      this.getList();
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
      vm.api(vm,'post',"信息获取中...","common/company/findCompanyByType.json",{
        cEconomicsId:vm.cEconomicsId,
        pageSize:20,
        page:page,
      },function (data) {
        console.log(data);
        if(data.statusCode == 0){
          vm.companyList = vm.companyList.concat(data.dataInfo.listData);
          vm.totalPage = data.dataInfo.pageInfo.totalPage;
          vm.total = data.dataInfo.pageInfo.totalRecord;
          vm.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
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
