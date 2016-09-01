import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'
import filters from './filters'

Vue.use(VueRouter)

// 实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

let router = new VueRouter()

let app = Vue.extend({})

// 路由配置
import Home from './views/index.vue'
import List from './views/list.vue'
import Topic from './views/topic.vue'
import New from './views/new.vue'
import About from './views/about.vue'
import Message from './views/message.vue'
import Login from './views/login.vue'
import User from './views/user.vue'

router.map({
	// 404 路由
	'*': {
		component: Home
	},
	'/': {
		name: 'home',   //首页
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

