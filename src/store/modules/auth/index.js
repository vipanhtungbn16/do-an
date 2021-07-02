import {userService} from "../../../service/user.service";
import AuthService from "../../../helper/authService";
import router from "../../../router";
export const SIGN_IN = 'signIn'
export const LOGIN_SUCCESS = 'loginSuccess'
export const LOGIN_FAIL = 'loginFail'

export const state ={
    user:{},
    message:[]
}
export const mutations = {
    [LOGIN_SUCCESS](state, payload) {
        state.message = payload
    },
    [LOGIN_FAIL](state, payload) {
        state.message = payload
    },
}

export const  actions = {
    // eslint-disable-next-line
    async signIn({commit},payload){
       await  userService.login(payload.email,payload.password)
            .then(response =>{
               commit(LOGIN_SUCCESS,[`Login ${response.user.username} success`])
                AuthService.set(JSON.stringify(response.user))
                router.push('/admin/overview')
                return response.user
            }
                ).catch(err =>{
               commit(LOGIN_FAIL,err)
           })
    }
}
export const auth ={
    state,
    actions,
    mutations,
    namespaced: true
}
