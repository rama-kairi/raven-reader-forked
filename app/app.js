const app = require('remote').require('app')
const jetpack = require('fs-jetpack').cwd(app.getAppPath())
const fs = require('fs')
const useDataDir = jetpack.cwd(app.getPath("userData"))
const $ = require('jquery')
const select2 = require('select2')
import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import Main from './components/Main.vue'
import AddArticle from './components/AddArticle.vue'
import Article from './components/Article.vue'

// Check if directory for storing article exists or not
var dirYes = jetpack.exists(useDataDir.path('streams'))

if(dirYes){
  fs.mkdir(useDataDir.path('streams'))
}

Vue.use(Router);

var router = new Router({
  hashbang:false,
  abstract:true
})

router.map({
  '/':{
    component: Main,
    subRoutes: {
      'article/:id':{
        component: Article
      }
    }
  },
  '/article/add':{
    component: AddArticle
  }
})

router.start(App,'#app')
