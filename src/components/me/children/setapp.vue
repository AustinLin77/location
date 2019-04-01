<template>
  <div class="me">
    <yd-navbar title="设置" bgcolor="#0FA0FA" color="#fff">
       <span slot="left">
          <yd-navbar-back-icon color="#fff" @click.native="goback"></yd-navbar-back-icon>
        </span>
    </yd-navbar>
      <div>
        <div class="listItem">
          <span>清空缓存</span>
          <span>
              3.4M
          </span>
        </div>
        <div class="butpad">
          <yd-button size="large" bgcolor="#0FA0FA" color="#FFF" @click.native="relogin">退出</yd-button>
        </div>

      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  mounted: function(){

  },
  methods:{
    goback:function () {
      this.$router.go(-1)
    },
    relogin:function () {
      this.$router.push({path:"login"})
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
  .listItem{
    border-bottom: solid 1px #eee;
    height: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.32rem;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
  }
  .butpad{
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
</style>
