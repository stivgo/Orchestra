import {LOGIN_SESSION, LOGOUT_SESSION, SET_USER, SET_ORGANIZATION,
        CREATE_USER, CREATE_ORGANIZATION, GET_ORGANIZATIONS       
} from './mutation-types'
import State from './state'

export default {
    [LOGIN_SESSION] (state: State, token: string):void {
        state.token = token
    },
    [SET_USER] (state: State, data: any):void {
        state.user = data
    },
    //Refactor after log out in back-end
    [LOGOUT_SESSION] (state: State, payload: any):void {
        state.user = payload
    },
    [SET_ORGANIZATION] (state: State, payload: any) {
        state.user.organizations = payload
    },
    [CREATE_USER] (state: State, payload: any){
        state.user = payload;
    },
    [CREATE_ORGANIZATION] (state: State, payload: any) {
        state.user.organizations!.push(payload);
    },
    [GET_ORGANIZATIONS] (state: State, payload: any) {
        state.organizations = payload;
    }
}