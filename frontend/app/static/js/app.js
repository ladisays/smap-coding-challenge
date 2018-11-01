// applications.js
import Vue from 'vue';
import Notifications from 'vue-notification';

import router from 'router';
import AppComponent from 'components/App';

Vue.use(Notifications);

new Vue({
	router,
  render: h => h(AppComponent)
}).$mount('#app')