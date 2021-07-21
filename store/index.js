import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

  const store = new Vuex.Store({
    //state中是需要管理的全局变量
    state:{
        userInfo: {
          phone: '',
          userName: '',
          avatarUrl: '',
          id: 0
        },        
        hasLogin: false
    },
    //mutations 是操作state中变量的方法
    mutations:{
      login(state, info){  //登录成功修改 全局变量
        // console.log(info);
        state.userInfo.phone = info.phone;
        state.userInfo.userName = info.name;
        state.userInfo.avatarUrl = info.avatarUrl;
        state.userInfo.id = info.id;
        state.hasLogin= true;
      },
      logout(state){     //退出登录修改 全局变量
        state.userInfo.phone = '';
        state.userInfo.userName = '';
        state.userInfo.avatarUrl = '';
        state.userInfo.id = 0;
        state.hasLogin= false;
      }
    }
  })
  
  export default store
