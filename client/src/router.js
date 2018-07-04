import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Add from './views/Add.vue'
import Detail from './views/Detail.vue'
import Edit from './views/Edit.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/add',
      name: 'add',
      component: Add
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    }
  ]
})
