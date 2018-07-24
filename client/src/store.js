import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginForm: false,
    userId: null,
    articles: null,
    profile: null,
    detail: null,
    isLogin: false,
    dataEdit: null
  },
  mutations: {
    loginFormActive (state, activeLogin) {
      state.loginForm = true
    },
    loginFormNonactive (state, nonactiveLogin) {
      state.loginForm = false
    },
    userInfo (state, profileInfo) {
      state.userId = profileInfo
    },
    articles (state, getAllArticle) {
      state.articles = getAllArticle
    },
    userInfo (state, profile) {
      state.profile = profile
    },
    detail (state, openDetail) {
      state.detail = openDetail
    },
    closeDetail (state, closeDetail) {
      state.detail = null
    },
    logout (state, logout) {
      state.profile = null
    },
    isLoginData (state, isLogin) {
      state.isLogin = isLogin
    },
    edit (state, edit) {
      state.dataEdit = edit
    }
  },
  actions: {
    activeLogin ({ commit }, payload) {
      commit('loginFormActive')
    },
    nonactiveLogin ({ commit }, payload) {
      commit('loginFormNonactive')
    },
    profileInfo ({ commit }, payload) {
      commit('userInfo', payload)
    },
    getAllArticle ({ commit }, payload) {
      axios({
        method: 'get',
        url: 'http://35.240.214.13 /article'
      }).then(response => {
        commit('articles', response.data)
      }).catch(err => {
        console.log(err);
      })
    },
    profile ({ commit }, payload) {
      const id = localStorage.getItem('authorization').split('*#$_.')[1]
      axios({
        method: 'get',
        url: `http://35.240.214.13 /users/${id}`
      }).then(response => {
        commit('userInfo', response.data[0])
      }).catch(err => {
        console.log(err);
      })
    },
    openDetail ({ commit }, payload) {
      commit('detail', payload)
    },
    closeDetail ({ commit }, payload) {
      commit('closeDetail', payload)
    },
    logout ({ commit }, payload) {
      commit('logout')
    },
    login ({ commit }, payload) {
      if (!localStorage.getItem('authorization')) {
        commit('isLoginData', false)
      } else {
        commit('isLoginData', true)
      }
    },
    edit ({ commit }, payload) {
      commit('edit', payload)
    }
  }
})
