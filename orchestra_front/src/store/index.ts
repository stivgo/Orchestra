import Vue from 'vue'
import Vuex from 'vuex'
import EditorModule from './modules/Editor'
import SessionModule from './modules/Session'
import ProjectModule from './modules/Project'
import ElementModule from './modules/Element'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    editor: EditorModule,
    session: SessionModule,
    project: ProjectModule,
    element: ElementModule
  }
})
