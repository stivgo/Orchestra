import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
      return {
        elements: [],
        element: null,
        layer: null,
        styles: [],
        customComponents: [],
        customComponent: null,
        timeLine: null,
        page: null,
        template: null,
      };
    },
    mutations,
    actions,
    getters,
  };