export default function (vm,gop,message,url,pram,fn) {
  vm.$dialog.loading.open(message);
  $.ajax({
    type:gop,
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
}
