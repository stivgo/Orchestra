import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'


import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Editor from '../views/Editor.vue'
import FAQ from '../views/FAQ.vue'
import MyProjects from '../views/MyProjects.vue'
import PreviewProject from '../views/PreviewProject.vue'
import store from '@/store'
import Render from '../views/Render.vue'
import CustomComponentEditor from '../views/CustomComponentEditor.vue'
import CustomComponent from '../views/CustomComponent.vue'
import Template from '../views/Template.vue'
import Organization from '../views/Organization.vue'
import PreviewTemplate from '../views/PreviewTemplate.vue'
import TemplateEditor from '../views/TemplateEditor.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [  
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if(!store.getters['session/authenticated']){
        return next({
          name: 'Login'
        })
      }

      next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(!store.getters['session/authenticated']){
        return next()
      }

      next({
        name: 'Home'
      });
    }
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/editor/project/:projectId/section/:sectionId/page/:pageId',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/render/project/:projectId/section/:sectionId/page/:pageId',
    name: 'Render',
    component: Render
  },
  {
    path: '/FAQ',
    name: 'FAQ',
    component: FAQ
  },
  {
    path: '/myProjects',
    name: 'MyProjects',
    component: MyProjects
  },
  {
    path: '/previewProject/:id',
    name: 'PreviewProject',
    component: PreviewProject
  },
  {
    path: '/previewTemplate/:id',
    name: 'PreviewTemplate',
    component: PreviewTemplate
  },
  {
    path: '/customComponent/:projectId',
    name: 'customComponent',
    component: CustomComponent
  },
  {
    path: '/editor/project/:projectId/custom/:customId',
    name: 'customComponentEditor',
    component: CustomComponentEditor
  },
  {
    path: '/template',
    name: 'Template',
    component: Template
  },
  {
    path: '/templateEditor',
    name: 'TemplateEditor',
    component: TemplateEditor
  },
  {
    path: '/organization',
    name: 'Organization',
    component: Organization
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // if the route is not public
      // if the user authenticated
      if(to.name === 'SignUp' && !store.getters['session/authenticated']){
        next();
      } else if(to.name !== 'Login' &&  !store.getters['session/authenticated']) { 
          // continue to the route
          next({name: 'Login'});
      } else {
          // redirect to login
          next();
      }
  next();
})

export default router
