import { Commit, Dispatch } from 'vuex';
import axios from 'axios';

const server = 'http://localhost:3000';

export default {
    async getProjectById({commit}:{commit: Commit}, payload:any) :Promise<any>{
        try {
            const response = await axios.get(server+'/projects/'+payload);
            commit('GET_PROJECT_BY_ID', response.data);
        } catch (error) {
            return error;
        }
    },

    async getUserProject({commit}: {commit: Commit}) :Promise<any>{
        try {
            const response = await axios.get(server+'/projects/');
            commit('GET_USER_PROJECTS', response.data);
        } catch (e) {
            commit('GET_USER_PROJECTS', null);
        }
    },

    async createProject({commit}: {commit: Commit}, payload:any) :Promise<any> {
        try {
            const response = await axios.post(server+'/projects/', payload);
            commit('CREATE_PROJECT', response.data);
        } catch (error) {
            return error;
        }
    },

    async createProjectTemplate({commit}: {commit: Commit}, payload:any) :Promise<any> {
        try {
            const {idTemplate, project} = payload;
            const response = await axios.post(server+'/templates/'+idTemplate+'/projects', project);
            console.log("Se envio el proyecto", response.data);
            commit('CREATE_PROJECT', response.data);
        } catch (error) {
            return error;
        }
    },

    async updateProject({commit}: {commit: Commit}, payload:any) :Promise<any> {
        try {
            const response = await axios.put(server+'/projects/', payload);
            commit('UPDATE_PROJECT', response.data);
        } catch (error) {
            return error;
        }
    },

    async delete_project({dispatch}: {dispatch: Dispatch}, id: string) :Promise<any> {
        try {
            const response = await axios.delete(server+'/projects/'+id);
            dispatch('getUserProject');
        } catch (error) {
            return error;
        }
    },

    //Actions for sections
    async get_section({commit}: {commit: Commit}, payload:any) :Promise<any> {
        try {
            const idProject = payload.idProject,
                    idSection = payload.idSection;
            const response = await axios.get(server+'/projects/'+idProject+'/sections/'+idSection);
            const section = response.data;
            commit('GET_SECTION', {section, idProject});
        } catch (error) {
            return error;
        }
    },

    async create_section({commit}:{commit: Commit}, payload:any) :Promise<any> {
        try {
            const {idProject,sectionData} = payload
            const response = await axios.post(server+'/projects/'+idProject+'/sections/', sectionData);
            const section = response.data;
            commit('CREATE_SECTION', {section , idProject});
        } catch (error) {
            return error;
        }
    },

    async update_section({commit}:{commit: Commit}, payload:any) :Promise<any> {
        try {
            const {idProject, sectionData} = payload
            const response = await axios.put(server+'/projects/'+idProject+'/sections/', sectionData);
            const section = response.data;
            commit('UPDATE_SECTION', {sectionData , idProject});
        } catch (error) {
            return error;
        }
    },

    async delete_section({commit}:{commit: Commit}, payload:any /*project:any, payload:any*/) :Promise<any> {
        try {
            const {idProject,idSection} = payload
            const response = await axios.delete(server+'/projects/'+idProject+'/sections/'+idSection);
            commit('DELETE_SECTION', payload);
        } catch (error) {
            return error;
        }
    },


    //Actions for pages
    async get_page({commit}:{commit: Commit}, payload:any) :Promise<any> {
        try {
            const idProject = payload.idProject,
                    idSection = payload.idSection,
                    idPage = payload.idPage;
            const url = server+'/projects/'+idProject+'/sections/'+idSection+'/pages/'+idPage;
            const response = await axios.get(url);
            const pageData = response.data;
            commit('GET_PAGE', {idProject, idSection, idPage, pageData});
        } catch (error) {
            return error;
        }
    },

    async create_page({commit}:{commit:Commit}, payload:any) :Promise<any> {
        try {
            const {idProject, idSection, page} = payload
            const url = server+'/projects/'+idProject+'/sections/'+idSection+'/pages/';
            const response = await axios.post(url, page);
            const pageData = response.data;
            commit('CREATE_PAGE', {idProject, idSection, pageData});
        } catch (error) {
            return error;
        }
    },

    async update_page({commit, dispatch}:{commit:Commit, dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const {idProject, idSection, page} = payload
            const url = server+'/projects/'+idProject+'/sections/'+idSection+'/pages/';
            const response = await axios.put(url, page);
            payload.idPage =page._id
            dispatch('get_page', payload);
            dispatch('get_section', payload);
        } catch (error) {
            return error;
        }
    },

    async delete_page({commit}:{commit:Commit}, payload:any) :Promise<any> {
        try {
            const {idProject, idSection, idPage} = payload
            const url = server+'/projects/'+idProject+'/sections/'+idSection+'/pages/'+idPage;
            const response = await axios.delete(url);
            commit('DELETE_PAGE', {idProject, idSection, idPage});
        } catch (error) {
            return error;
        }
    },

    /*------------------------------Templates--------------------------------*/
    async getTemplates({commit}:{commit: Commit}) :Promise<any> {
        try {
            const url = server+'/templates/';
            const response = await axios.get(url);
            console.log("info templates",response.data);
            commit('GET_TEMPLATES', response.data);
        } catch (error) {
            return error;
        }
    },

    async getUser({commit}:{commit: Commit}, payload: any) :Promise<any> {
        try {
            const url = server+'/users/'+payload;
            const response = await axios.get(url);
            commit('GET_USER', response.data);
        } catch (error) {
            return error;
        }
    },

    async getOrganizations({commit}:{commit: Commit}) :Promise<any> {
        try {
            const url = server+'/organizations';
            const response = await axios.get(url);
            commit('GET_ORGANIZATIONS', response.data);
        } catch (error) {
            return error;
        }
    },

    async createTemplate({commit, dispatch}: {commit: Commit, dispatch:Dispatch}, payload:any) :Promise<any> {
        try {
            const response = await axios.post(server+'/templates', payload);
            dispatch('getTemplates');
        } catch (error) {
            return error;
        }
    },
    async getTemplateById({commit}:{commit: Commit}, payload:any) :Promise<any>{
        try {
            const response = await axios.get(server+'/templates/'+payload);
            commit('GET_TEMPLATE_BY_ID', response.data);
        } catch (error) {
            return error;
        }
    },

    




}


