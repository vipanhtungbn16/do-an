import {categoryService} from "../../../service/category.service";
export const FETCH_CATEGORY = 'fetchCategory'
export const ADD_CATEGORY = 'addCategory'
export const COUNT_CATEGORY = 'countCategory'
export const state = {
    category:[],
    count:0
}

export const mutations ={
    [ADD_CATEGORY](state, payload) {
        state.category = payload
    },
    [COUNT_CATEGORY](state, payload) {
        state.count = payload
    },
}

export const actions = {
    // eslint-disable-next-line
    async fetchCategory({commit},payload){
        await categoryService.fetchCategory(payload).then(response=>{
            console.log(response)
            commit(ADD_CATEGORY,response.category)
            commit(COUNT_CATEGORY,response.pages)
            return {success:true}
        }).catch(err=>{
            return {success:false,message:err}
        })
    }
}

export const category ={
    state,
    actions,
    mutations,
    namespaced: true
}