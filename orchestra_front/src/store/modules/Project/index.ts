import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
      return {
        projects: [],
        project: null,
        templates: [],
        template: null,
        user: null,
        organizations: [],
      };
    },
    mutations,
    actions,
    getters,
  };