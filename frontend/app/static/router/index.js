import Vue from 'vue';
import Router from 'vue-router';
import App from 'components/App';
import Consumer from 'components/Consumer';
import Consumers from 'components/Consumers';

Vue.use(Router);

export default new Router({
	mode: 'history',
  routes: [
  	{
  		path: '/',
  		redirect: '/consumers'
  	},
  	{
  		path: '/consumers',
  		name: 'Consumers',
  		component: Consumers
  	},
    {
      path: '/consumer/:id',
      name: 'Consumer',
      component: Consumer
    }
  ]
});
