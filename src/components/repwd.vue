<template>
  <div class="login">
    <yd-navbar title="忘记密码" bgcolor="#0FA0FA" color="#fff">
      <router-link to="login" slot="left">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="content">

        <div class="linecell">
             <div class="cellLeft">
               <!--<yd-icon name="phone3" color="#888"></yd-icon>-->
               <i  class="iconfont icon-yduidianhua3"  style="font-size:0.54rem;color: #0FA0FA"></i>
             </div>
             <div class="cellright">
               <yd-input slot="right" required regex="mobile" ref="phone" v-model="form.account" max="20" placeholder="手机号码"></yd-input>
             </div>

           </div>
        <div class="linecell">
          <div class="cellLeft">
            <i  class="iconfont icon-mima"  style="font-size:0.54rem;color: #0FA0FA"></i>
          </div>
          <div class="cellright">
            <yd-input   v-model="form.verificationCode" placeholder="输入验证码"></yd-input>
          </div>
          <yd-sendcode
                       v-model="start1"
                       @click.native="sendCode1"
                       type="warning"
          ></yd-sendcode>
        </div>
        <div class="linecell">
          <div class="cellLeft">
            <i  class="iconfont icon-mima"  style="font-size:0.54rem;color: #0FA0FA"></i>
          </div>
          <div class="cellright">
            <yd-input slot="right" type="password" v-model="form.password" placeholder="输入密码"></yd-input>
          </div>

        </div>
        <yd-button size="large" bgcolor="#0FA0FA" color="#FFF" @click.native="subrepwd">确认</yd-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      start1: false,
      form:{
        account:"",
        password:"",
        verificationCode:""

      }
    }
  },
  methods:{
    subrepwd:function () {
      let vm = this;
      if(!vm.form.account){
        vm.$dialog.toast({mes: "电话号码不能为空", timeout: 1500});
        return

      }
      if(!vm.form.password){
        vm.$dialog.toast({mes: "密码不能为空", timeout: 1500});
        return
      }
      if(!vm.form.verificationCode){
        vm.$dialog.toast({mes: "短息验证码不能为空", timeout: 1500});
        return
      }
      let parm ={
        account:vm.form.account,
        password:vm.form.password,
        verificationCode:vm.form.verificationCode
      }
      vm.repwdapi("请求中...","common/forgetPassWord.json",parm,function (data) {
        vm.$dialog.toast({mes: data.message, timeout: 1500});
        if(data.statusCode == 0){
          vm.$router.push({path:"login"});
        }
      })

    },
    sendCode1() {
      let vm = this;
      const input = this.$refs.phone;
      console.log(input.valid);
      if(!vm.form.account){
        vm.$dialog.toast({mes: "电话号码不能为空", timeout: 1500});
        return
      }
      if(input.valid == false){
        this.$dialog.toast({
          mes: input.errorMsg,
          timeout: 1500
        });
      }
      if(input.valid == true) {
        let pram={
          mobilePhone:vm.form.account,
          type:2
        };
        vm.repwdapi("发送中...","common/getVerificationCode.json",pram,function (data) {
              console.log(data);
              vm.start1 = true;
              vm.$dialog.toast({mes:data.message, timeout: 1500});
        })
      }


    },
    repwdapi:function (message,url,pram,fn) {
      let vm = this;
      vm.$dialog.loading.open(message);
      $.ajax({
        type:"post",
        url:vm.path+url,
        dataType:"json",
        data:pram,
        success:fn,
        error:function () {
          vm.$dialog.toast({
            mes: '系统维护中',
            timeout: 1500
          });
        },
        complete:function () {
          vm.$dialog.loading.close();
        }
      });
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
