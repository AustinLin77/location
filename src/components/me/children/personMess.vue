<template>
  <div class="me">
    <yd-navbar title="个人资料" bgcolor="#0FA0FA" color="#fff">
      <yd-navbar-back-icon color="#fff"  @click.native="goback" slot="left"></yd-navbar-back-icon>
    </yd-navbar>
      <div>
        <div class="listItem">
          <span>姓名</span>
          <span>
              {{user.userName}}
          </span>
        </div>
        <div class="listItem">
          <span>性别</span>
          <span>
              {{user.sex}}
          </span>
        </div>
        <div class="listItem">
          <span>电话</span>
          <span>
              {{user.userAccount}}
          </span>
        </div>

      </div>
  </div>
</template>

<script>
  import  { mapState } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      user:{}
    }
  },
  mounted: function(){
    this.user=JSON.parse(localStorage.getItem("user"))
  },
  computed:{
//    ...mapState({
//      user:"userMessage"
//    })
  },
  methods:{
    goback:function () {
      this.$router.go(-1)
    },
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
  .photo{
    height: 3.4rem;
    border-bottom: solid 8px #eee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .photo img{
    width: 1.2rem;
    height: 1.2rem;
    background-color: #eee;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
  .name{
    color: rgba(16, 16, 16, 1);
    font-size: 0.28rem;
    font-family: Arial;
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
</style>
