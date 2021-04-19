import Vue from 'vue'
import Vuex from 'vuex'


import Doctors from './modules/Doctors'
Vue.use(Vuex);



export default new Vuex.Store({
  modules: {
      Doctors,
  }
})
// window._ = require('lodash');
