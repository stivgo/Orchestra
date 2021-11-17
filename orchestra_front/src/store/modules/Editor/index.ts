import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
    namespaced: true,
    state() {
      return {
        sectionSelected: 0,
        listText: [],
        listImages: [],
        listButtons: [],
        listQR: [],
        listVideo: []
      };
    },
    mutations,
    actions,
    getters,
  };
  