import { Commit, Dispatch } from 'vuex';
import axios from 'axios';
import { GET_ELEMENT_BY_ID } from './mutation-types';
import actions from '../Editor/actions';
import State from './state'
const server = 'http://localhost:3000';

export default{

    async getElementById({commit}:{commit: Commit}, payload:any) :Promise<any> {
        try {
            const idProject = payload.idProject,
                    idElement = payload.idElement;
            const url = server+'/projects/'+idProject+'/elements/'+idElement;
            const response = await axios.get(url);

            commit('GET_ELEMENT_BY_ID', response.data);

        } catch (error) {
            return error;
        }
    },

    async getElementsByPage({commit}:{commit: Commit}, payload:any) :Promise<any> {
        try {
            const {idProject,idPage} = payload
            const url = server+'/projects/'+idProject+'/elements/?page='+idPage;
            const response = await axios.get(url);

            commit('GET_ELEMENTS_BY_PAGE', response.data);
        } catch (error) {
            return error;
        }
    },

    async getStyles({commit}:{commit: Commit}) :Promise<any> {
        try {
            const url = server+'/resources/styles';
            const response = await axios.get(url);
            commit('SET_STYLES', response.data.styles);
        } catch (error) {
            return error;
        }
    },

    async createElement({commit, dispatch}: {dispatch: Dispatch, commit: Commit}, payload:any) :Promise<any> {
        try {
            const {idProject,element} = payload
            const url = server+'/projects/'+idProject+'/elements/';
            const response = await axios.post(url, element);

            commit('CREATE_ELEMENT', response.data);
            const payloadUpdate = {
                idProject: idProject,
                idPage: element.pageId
            }
            dispatch('getElementsByPage', payloadUpdate)
        } catch (error) {
            return error;
        }
    },

    async updateElement({commit, dispatch}:{commit: Commit, dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const {idProject,element} = payload
            const url = server+'/projects/'+idProject+'/elements/';
            const response = await axios.put(url, element);

            commit('UPDATE_ELEMENT', response.data);

            const payloadUpdate = {
                idProject: idProject,
                idPage: element.pageId
            }
            dispatch('getElementsByPage', payloadUpdate)
            dispatch('getTimeLine', element.pageId)
        } catch (error) {
            return error;
        }
    },

    async deleteElement({commit,dispatch}:{commit: Commit, dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const {idProject,idElement, idPage} = payload
            const url = server+'/projects/'+idProject+'/elements/'+idElement;
            const response = await axios.delete(url);
            commit('DELETE_ELEMENT', idElement);
            const payloadUpdate = {
                idProject: idProject,
                idPage:idPage
            }
            dispatch('getElementsByPage', payloadUpdate)
            dispatch('getTimeLine', idPage)
        } catch (error) {
            return error;
        }
    },

    async updateElementPosition({dispatch}:{dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const {left, top, elementId, idProject} = payload
            const url = server+'/projects/'+idProject+'/elements/'+elementId;
            const response = await axios.get(url);
            const element = response.data            
            element.xPosition = left
            element.yPosition = top
            const payloadUpdate = {
                idProject: idProject,
                element: element
            }
            dispatch('updateElement', payloadUpdate)
        } catch (error) {
            return error;
        }
    },
    async updateElementSize({dispatch}:{dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const {width, height,left, top, elementId, idProject} = payload
            const url = server+'/projects/'+idProject+'/elements/'+elementId;
            const response = await axios.get(url);
            const element =  response.data
            element.width = width
            element.height = height
            element.xPosition = left
            element.yPosition = top
            const payloadUpdate = {
                idProject: idProject,
                element: element
            }
            dispatch('updateElement', payloadUpdate)
            
        } catch (error) {
            return error;
        }
    },

    async updateElementStatic({dispatch}:{dispatch: Dispatch}, payload:any) :Promise<any> {

        try {
            const {elementId, idProject} = payload
            const url = server+'/projects/'+idProject+'/elements/'+elementId;
            const response = await axios.get(url);
            const element =  response.data
            element.isStatic = !element.isStatic
            const payloadUpdate = {
                idProject: idProject,
                element: element
            }
            dispatch('updateElement', payloadUpdate)
            
        } catch (error) {
            return error;
        }

    },    
    async updateLayerVisible({dispatch}:{dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const {state, elementId, idProject} = payload
            const url = server+'/projects/'+idProject+'/elements/'+elementId;
            const response = await axios.get(url);
            const element =  response.data
            element.isVisible = state
            const payloadUpdate = {
                idProject: idProject,
                element: element
            }
            dispatch('updateElement', payloadUpdate)
            
        } catch (error) {
            return error;
        }
    },
    async updateLayerLocked({dispatch}:{dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const {state, elementId, idProject} = payload
            const url = server+'/projects/'+idProject+'/elements/'+elementId;
            const response = await axios.get(url);
            const element =  response.data
            element.isLocked = state
            const payloadUpdate = {
                idProject: idProject,
                element: element
            }
            dispatch('updateElement', payloadUpdate)
            
        } catch (error) {
            return error;
        }
    },

    /*------------------------------Custom Components------------------------------*/
    async getCustomComponents({commit}:{commit: Commit}, payload:any) :Promise<any> {
        try {
            const url = server+'/customcomponents/?project='+payload;
            const response = await axios.get(url);
            commit('SET_CUSTOM_COMPONENTS', response.data);
        } catch (error) {
            return error;
        }
    },

    async createCustomComponent({dispatch}: {dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const url = server+'/customcomponents/';
            const response = await axios.post(url, payload);
            dispatch('getCustomComponents', payload.projectId)
        } catch (error) {
            return error;
        }
    },

    async updateCustomComponent({dispatch}: {dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const url = server+'/customcomponents/';
            const response = await axios.put(url, payload);
            dispatch('getCustomComponents', payload.projectId)
        } catch (error) {
            return error;
        }
    },

    async deleteCustomComponent({dispatch}: {dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const url = server+'/customcomponents/'+payload._id;
            const response = await axios.delete(url, payload);
            dispatch('getCustomComponents', payload.projectId)
        } catch (error) {
            return error;
        }
    },

    async getCustomById({commit}:{commit: Commit}, payload:any) :Promise<any> {
        try {
            const url = server+'/customcomponents/'+payload;
            const response = await axios.get(url);
            const data =response.data
            data.childComponents.map((element: any,index: any)=>{
                element.index = index
                element.indexS = index.toString()
            })
            commit('SET_CUSTOM_COMPONENT', data);
        } catch (error) {
            return error;
        }
    },
    async updateElementCustomSize({dispatch, commit}: {dispatch: Dispatch, commit: Commit}, payload:any) :Promise<any> {
        try {
            commit('SET_CUSTOM_COMPONENT', payload);
            delete payload.widthE
            delete payload.heightE
            for (const child of payload.childComponents){
                delete child.heightE
                delete child.widthE
                delete child.xPositionE
                delete child.yPositionE
                delete child.index
                delete child.indexS
            } 
            await dispatch('updateCustomComponent', payload)
            await dispatch('getCustomById', payload._id)
        } catch (error) {
            return error;
        }
    },

    /*--------------------------------------Custom Elements -----------------------*/
    async createCustomElement({dispatch}: {dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const {idProject,element} = payload
            const urlCustom = server+'/customcomponents/'+element.templateId;
            const responseCustom = await axios.get(urlCustom);
            const url = server+'/projects/'+idProject+'/elements/';
            element.childComponents = responseCustom.data.childComponents
            element.width = responseCustom.data.defaultWidth
            element.height = responseCustom.data.defaultHeight
            const response = await axios.post(url, element);
            const payloadUpdate = {
                idProject: idProject,
                idPage: element.pageId
            }
            dispatch('getElementsByPage', payloadUpdate)
        } catch (error) {
            return error;
        }
    },


    /*--------------------------------------TimeLine -----------------------*/

    async getTimeLine({commit}:{commit: Commit}, payload:any) :Promise<any> {
        try {
            const url = server+'/timelines/'+payload;
            const response = await axios.get(url);
            console.log("Time Line",response.data)
            commit('SET_TIME_LINE', response.data);
        } catch (error) {
            return error;
        }

    },

    async createTimeLine({dispatch}: {dispatch: Dispatch}, payload:any) :Promise<any> {

        try {
            console.log("Create", payload)
            const {pageId, element, idProject} = payload
            const url = server+'/timelines/'+ pageId;
            const response = await axios.post(url, element);
            dispatch('getTimeLine', pageId)

            const payloadUpdate = {
                idProject: idProject,
                elementId: element._id,
            }

            dispatch('updateElementStatic', payloadUpdate)
        } catch (error) {
            return error;
        }
    },

    async updateTimeLine({dispatch}: {dispatch: Dispatch}, payload:any) :Promise<any> {

        try {
            const {pageId, element} = payload
            const url = server+'/timelines/'+ pageId;
            const response = await axios.put(url, element);
            dispatch('getTimeLine', pageId)
        } catch (error) {
            return error;
        }
    },

    async deleteTimeLine({dispatch}: {dispatch: Dispatch}, payload:any) :Promise<any> {

        try {
            const {pageId, elementId, idProject} = payload
            const url = server+'/timelines/'+ pageId+'/'+elementId;
            const response = await axios.delete(url);
            dispatch('getTimeLine', pageId)
            const payloadUpdate = {
                idProject: idProject,
                elementId: elementId,
            }

            dispatch('updateElementStatic', payloadUpdate)
        } catch (error) {
            return error;
        }
    },

    /*--------------------------------------Page -----------------------*/

    async getPage({commit}:{commit: Commit}, payload:any) :Promise<any> {
        try {
            const {idProject,idSection,idPage} = payload;
            const url = server+'/projects/'+idProject+'/sections/'+idSection+'/pages/'+idPage;
            const response = await axios.get(url);
            const pageData = response.data;
            console.log("Info Page", pageData)
            commit('SET_PAGE', pageData);
        } catch (error) {
            return error;
        }
    }


}
