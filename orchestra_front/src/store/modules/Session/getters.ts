import State from './state'

export default{
    authenticated (state: State){
        return state.token && state.user
    },

    user(state: State){
        return state.user
    }
}