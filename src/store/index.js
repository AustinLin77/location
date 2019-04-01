import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
      userMessage:{},
      centerpoint:{},
      companyItem:{},
      isActive:'chart2'
  },
  getters:{
    getuserMessage:function (state) {
          return state.userMessage
    }
  },
  mutations: {
    setUser (state, user) {
      state.userMessage = user;
    },
    setcenter(state, item){
      state.centerpoint = item;
    },
    setcompanyItem(state,item){
      state.companyItem = item;
    },
    setisActive(state,item){
      state.isActive = item
    }
  },
  actions: {

  }
})
