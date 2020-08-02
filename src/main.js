import Vue from 'vue'
import App from './App.vue'
import Amplify from '@aws-amplify/core';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Amplify.configure(aws_exports);
Vue.config.productionTip = false

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
