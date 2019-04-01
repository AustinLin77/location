<template>
  <div class="me">
      <div class="photo">
         <img src="../../assets/head_woman.png" v-if="user.sex=='女'">
         <img src="../../assets/head_man.png" v-if="user.sex=='男'">
         <div class="name">{{user.userName}}</div>
      </div>
      <div>
        <div class="listItem" @click="goItem('personMess')">
          <span>个人资料</span>
          <span>
              <yd-navbar-next-icon color="#888"></yd-navbar-next-icon>
          </span>
        </div>
        <div class="listItem"  @click="goItem('personWalk')">
          <span>我的走访记录</span>
          <span>
              <yd-navbar-next-icon color="#888"></yd-navbar-next-icon>
          </span>
        </div>
        <div class="listItem" @click="goItem('setapp')">
          <span>设置</span>
          <span>
              <yd-navbar-next-icon color="#888"></yd-navbar-next-icon>
          </span>
        </div>

      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      user:{}
    }
  },
  computed: {
//    ...mapGetters({
//      user:"getuserMessage"
//    })
  },
  mounted: function(){
    console.log(this.user);
    this.user=JSON.parse(localStorage.getItem("user"))
  },
  methods:{
    goItem:function (item) {
       this.$router.push({path:item})
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
