import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'
import filters from './filters'
import 'assets/scss/CV.scss'
import 'assets/scss/github-markdown.css'

Vue.use(VueRouter)
Vue.use(VueResource)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.mixin({
	http: {
		root: 'https://cnodejs.org/api/v1'
	}
})

// const Home = resolve => require(['./views/index'], resolve)
// const List = resolve => require(['./views/list'], resolve)
// const Topic = resolve => require(['./views/topic'], resolve)
// const New = resolve => require(['./views/new'], resolve)
// const About = resolve => require(['./views/about'], resolve)
// const Message = resolve => require(['./views/message'], resolve)
// const Login = resolve => require(['./views/login'], resolve)
// const User = resolve => require(['./views/user'], resolve)

import Home from './views/index'
import List from './views/list'
import Topic from './views/topic'
import New from './views/new'
import About from './views/about'
import Message from './views/message'
import Login from './views/login'
import User from './views/user'

const scrollBehavior = (to, from, savedPosition) => {
	if (savedPosition) {
		return savedPosition;
	} else {
		const position = {};

		if (to.hash) {
			position.selector = to.hash;
		}

		if (to.matched.some(m => m.meta.scrollToTop)) {
			position.x = 0;
			position.y = 0;
		}

		return position;
	}
}

const router = new VueRouter({
	mode: 'history',
	scrollBehavior,
	routes: [
		{ path: '/', component: Home, redirect: '/list' },
		{ path: '/list', component: List },
		{ path: '/topic/:id', name: 'topic', component: Topic },
		{ path: '/add', component: New },
		{ path: '/about', component: About },
		{ path: '/message', component: Message },
		{ path: '/login', component: Login },
		{ path: '/user/:loginname', component: User },
		{ path: '*', component: Home}
	]
})

const app = new Vue({
    router
}).$mount('#app')
