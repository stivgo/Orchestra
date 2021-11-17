import { Commit, Dispatch } from 'vuex';
import axios from 'axios'
import State from './state'
import router from '@/router'

const server = 'http://localhost:3000';


export default{

    async loginSession({dispatch}: {dispatch: Dispatch}, payload: {email:string, password:string}) :Promise<any>{
        try {
            const response = await axios.post(server+'/authentication/login', payload);
            return dispatch('attemptLoginSession', response.data);
        } catch (e) {
            return dispatch('attemptLoginSession', null);
        }
    },

    async attemptLoginSession({commit, state, dispatch}: {commit: Commit, state:any, dispatch: Dispatch}, data: any) :Promise<any>{
        if(data.token){
            commit('LOGIN_SESSION', data.token)
        }
 
        if(!state.token){
            return
        }
        try {
            const responseUser = await axios.get(server+'/users/'+data.userId);
            //const responseOrg = await axios.get(server+'/organizations/users/');
            dispatch('attemptSetOrganization', responseUser.data);
            //commit('SET_USER', responseUser.data);
            //commit('SET_ORGANIZATION', {hola: 100});
            /*router.replace({
                name: "Home"
              })*/
        } catch (e) {
            commit('LOGIN_SESSION', null)
            commit('SET_USER', null)
        }
    },

    async attemptSetOrganization({commit}:{commit: Commit}, payload: string):Promise<any>{
        commit('SET_USER', payload);
        try {
            const response = await axios.get(server+'/organizations/');
            commit('SET_ORGANIZATION', response.data);
        } catch (error) {
            console.log(error)
        }
       
        
    },

    async createUser({commit}:{commit: Commit}, payload: string):Promise<any>{
        try {
            const response = await axios.post(server+'/users/', payload);
            return commit('CREATE_USER', response.data);
        } catch (error) {
            return error;
        }
    },


    async createOrganization({commit, dispatch}: {commit: Commit, dispatch: Dispatch}, payload:any) :Promise<any> {
        try {
            const response = await axios.post(server+'/organizations/', payload);
            commit('CREATE_ORGANIZATION', response.data);
            dispatch('getOrganizations');
        } catch (error) {
            return error;
        }
    },

    async getOrganizations({commit}: {commit: Commit}) :Promise<any> {
        try {
            const response = await axios.get(server+'/organizations/');
            commit('GET_ORGANIZATIONS', response.data);
        } catch (error) {
            return error;
        }
    },

    //Refactor after log out in back-end
    logoutSession({commit}: {commit: Commit}):any{
            commit('LOGIN_SESSION', null)
            commit('SET_USER', null)
    },
}