// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import VueCookie from 'vue-cookie/src/vue-cookie.js'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import vueXlsxTable from 'vue-xlsx-table'
Vue.use(vueXlsxTable, { rABS: false })

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {});

Vue.config.productionTip = false;

import VueMathjax from 'vue-mathjax'
Vue.use(VueMathjax);
window.VueMathJax = { MathML: { extensions: ["mml3.js", "content-mathml.js"]}};

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/* eslint-disable no-new */

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8088';
// axios.defaults.baseURL = 'https://test.examsdaily.in:8088';
// if (this.$session.exists("access_token")) {
//   axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$session.get("access_token");
// }
window.axios = axios;

import VueSession from 'vue-session';
Vue.use(VueSession, {
  persist: true
});

import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

Vue.use(VueMoment, {
    moment,
})

import VueAuthImage from 'vue-auth-image';

// register vue-auth-image directive
Vue.use(VueAuthImage);

// import wysiwyg from "vue-wysiwyg";
Vue.use(wysiwyg, {});
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.config.productionTip = false;

Vue.mixin({
  data: function() {
    return {
      get resourceLocation() {
        // return "https://test.examsdaily.in:8088/uploads/images/";
        return "http://localhost:8088/uploads/images/";
      },
      get oauthServerLocation(){
        // return 'https://test.examsdaily.in:9088';
        return "http://localhost:9088";
      }
    }
  }
});

// import VueMathjax from 'vue-mathjax'
// Vue.use(VueMathjax)
import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(FBSignInButton)

import VueAnalytics from 'vue-analytics'
Vue.use(VueAnalytics, {
  id: 'UA-115769816-4'
});

new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
