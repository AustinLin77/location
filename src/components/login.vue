<template>
  <div class="login">
    <yd-navbar title="登陆" bgcolor="#0FA0FA" color="#fff"></yd-navbar>
    <div class="content">
      <div class="contitle">
        <div class="titleContent">AIOCOINOF</div>
        <div class="titleSub">我国地方政府国民经济体系产业链上下道工艺顺序两两整合环节企业集聚频谱分析工具
        </div>
      </div>
      <div class="loginform">
        <div class="linecell">
             <div class="cellLeft">
               <!--<yd-icon name="ucenter" color="#888"></yd-icon>-->

               <i  class="iconfont icon-wode"  style="font-size:0.54rem;color: #0FA0FA"></i>
             </div>
             <div class="cellright">
               <yd-input slot="right" required v-model="form.phone" max="20" placeholder="手机号码"></yd-input>
             </div>

           </div>
        <div class="linecell">
          <div class="cellLeft">
            <!--<yd-icon name="setting" color="#888"></yd-icon>-->
            <i  class="iconfont icon-mima"  style="font-size:0.54rem;color: #0FA0FA"></i>
          </div>
          <div class="cellright">
            <yd-input slot="right" type="password" v-model="form.password" placeholder="密码"></yd-input>
          </div>
        </div>
        <div class="rempwd" @click="gorepwd">忘记密码？</div>
        <yd-button size="large" bgcolor="#0FA0FA" color="#FFF" @click.native="sublogin">登录</yd-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
export default {

  name: 'HelloWorld',
  data () {
    return {
      form:{
          phone:"",
          password:""
       }
    }
  },
  created:function () {
     if(localStorage.getItem("wuzhenUser")){
       let userInfo = JSON.parse(localStorage.getItem("wuzhenUser"));
       this.form.phone = userInfo.account;
       this.form.password = userInfo.password;
     }
  },
  methods:{
    sublogin:function () {
      let vm = this;
      if(!vm.form.phone){
        vm.$dialog.toast({mes: '电话号码不能为空', timeout: 1500});
        return
      } if(!vm.form.password){
        vm.$dialog.toast({mes: '密码不能为空', timeout: 1500});
        return
      }
      let pram = {
        account: vm.form.phone,
        password:vm.form.password
      };
      vm.api(vm,'post',"登录中","common/login.json",pram,function (data) {
        console.log(data);
        vm.$dialog.toast({mes: data.message, timeout: 1500});
        if(data.statusCode == 0){
          localStorage.setItem("user",JSON.stringify(data.dataInfo.singleData))
          vm.getcenter();
          localStorage.setItem("wuzhenUser",JSON.stringify(pram));

        }
      });

    },
    getcenter:function () {
      let vm = this;
      vm.api(vm,'post',"加载中","common/company/findCenterList.json",{centerId:1,userAccout:vm.form.phone},function (data) {
        console.log(data);
        if(data.statusCode == 0){
          localStorage.setItem("center",JSON.stringify(data.dataInfo.listData[0]));
console.log(JSON.parse(localStorage.getItem("center")))
          vm.$router.replace({path:"main"})
        }
      });
    },
    ...mapMutations([
      'setUser',
      'setcenter'
    ]),

    gorepwd:function () {
      this.$router.push({path:"repwd"})
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
  .content{
    flex: 1;
    background-color: #fff;
  }
  .titleContent{
    margin-top: 1.34rem;
    height: 0.82rem;
    line-height:  0.82rem;
    color: rgba(15, 160, 250, 1);
    font-size: 0.56rem;
    text-align: center;
    font-family: Arial;
  }
  .titleSub{
     margin-top: 0.45rem;
    color: rgba(179, 179, 179, 1);
    font-size: 0.32rem;
    padding-left: 0.42rem;
    padding-right: 0.42rem;
    text-align: center;
    font-family: Arial;

  }
  .loginform{
    margin-top: 1.2rem;
    padding-left: 0.24rem;
    padding-right: 0.24rem;
  }
.linecell{
   border-bottom: solid 1px #eee;
   display: flex;
   height: 1.2rem;
  font-size: 0.3rem;
  justify-content: center;
  align-items: center;
}
  .linecell .cellLeft{
    width: 1rem;
  }
.linecell .cellright{
  flex:1;
}
  .rempwd{
    margin-top: 0.5rem;
   text-align: right;
    height: 23px;
    line-height: 19px;
    color: rgba(0, 154, 250, 1);
    font-size: 13px;
    font-family: Arial;

  }

</style>
