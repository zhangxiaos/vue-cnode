import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'
import filters from './filters'

Vue.use(VueRouter)
Vue.use(VueResource)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.mixin({
	http: {
		root: 'https://cnodejs.org/api/v1'
	}
})

// Vue.http.interceptors.push((request, next) => {
//     next((response) => {        
//     	if (response.statusText === 'OK') {
//     	}
//     	return response;
//     })
// })

let router = new VueRouter()

let app = Vue.extend({})

import Home from './views/index.vue'
import List from './views/list.vue'
import Topic from './views/topic.vue'
import New from './views/new.vue'
import About from './views/about.vue'
import Message from './views/message.vue'
import Login from './views/login.vue'
import User from './views/user.vue'

router.map({
	'*': {
		component: Home
	},
	'/': {
		name: 'home',
		component: Home
	},
	'/list': {
		name: 'list',
		component: List
	},
	'/topic/:id': {
		name: 'topic',
		component: Topic
	},
	'/add': {
		name: 'add',
		component: New
	},
	'/about': {
		name: 'about',
		component: About
	},
	'/message': {
		name: 'message',
		component: Message
	},
	'/login': {
		name: 'login',
		component: Login
	},
	'/user/:loginname': {
		name: 'user',
		component: User
	}
})

router.start(app, '#app')

