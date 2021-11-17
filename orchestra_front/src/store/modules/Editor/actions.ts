//import axios from 'axios';
import { Commit } from 'vuex';

export default{
    changeSectionSelected({commit}: {commit: Commit}, payload: number):void{
        commit('CHANGE_SECTION_SELECTED', payload)
    },
    addElementListText({commit}: {commit: Commit}, payload: string):void{
        commit('ADD_ELEMENT_LIST_TEXT', payload)
    },
    deleteElementListText({commit}: {commit: Commit}, payload: number):void{
        commit('DELETE_ELEMENT_LIST_TEXT', payload)
    },
    addElementListImages({commit}: {commit: Commit}, payload: string):void{
        commit('ADD_ELEMENT_LIST_IMAGES', payload)
    },
    deleteElementListImages({commit}: {commit: Commit}, payload: number):void{
        commit('DELETE_ELEMENT_LIST_IMAGES', payload)
    },
    addElementListButton({commit}: {commit: Commit}, payload: string):void{
        commit('ADD_ELEMENT_LIST_BUTTON', payload)
    },
    deleteElementListButton({commit}: {commit: Commit}, payload: number):void{
        commit('DELETE_ELEMENT_LIST_BUTTON', payload)
    },
    addElementListQR({commit}: {commit: Commit}, payload: string):void{
        commit('ADD_ELEMENT_LIST_QR', payload)
    },
    deleteElementListQR({commit}: {commit: Commit}, payload: number):void{
        commit('DELETE_ELEMENT_LIST_QR', payload)
    },
    addElementListVideo({commit}: {commit: Commit}, payload: string):void{
        commit('ADD_ELEMENT_LIST_VIDEO', payload)
    },
    deleteElementListVideo({commit}: {commit: Commit}, payload: number):void{
        commit('DELETE_ELEMENT_LIST_VIDEO', payload)
    },
    
}
