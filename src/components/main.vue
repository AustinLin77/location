<template>
  <yd-layout>

    <router-view ></router-view>

    <yd-tabbar slot="tabbar" active-color="#888">
      <yd-tabbar-item title="首页" link="zhuye" :active="true">
        <!--<yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>-->
        <i  slot="icon" class="iconfont icon-yduizhuyexuanzhong"  style="font-size:0.54rem"></i>
      </yd-tabbar-item>
      <yd-tabbar-item title="记录" link="localtion" :active="true">
        <!--<yd-icon name="location" slot="icon" size="0.54rem"></yd-icon>-->
        <i  slot="icon" class="iconfont icon-yduidingwei"  style="font-size:0.54rem"></i>
      </yd-tabbar-item>
      <yd-tabbar-item title="我" link="me" :active="true">
        <!--<yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>-->
        <i  slot="icon" class="iconfont icon-wode"  style="font-size:0.54rem"></i>
      </yd-tabbar-item>
    </yd-tabbar>

  </yd-layout>
</template>

<script>
export default {

  data () {
    return {
    }
  },
  mounted: function(){

  },

  watch:{

  },
  methods:{
    getdots:function () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .router-link-active{
    color:#0FA0FA;
  }
</style>
