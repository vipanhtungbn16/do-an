import {categoryService} from "../../../service/category.service";
export const FETCH_CATEGORY = 'fetchCategory'
export const ADD_CATEGORY = 'addCategory'
export const UPDATE_CATEGORY = 'updateCategory'
export const ADD_DETAIL_CATEGORY = 'addDetailCategory'
export const COUNT_CATEGORY = 'countCategory'
export const DELETE_CATEGORY = 'deleteCategory'
export const CREATE_CATEGORY = 'createCategory'
export const DETAIL_CATEGORY = 'detailCategory'
export const state = {
    category:[],
    count:0,
    detail_category:[]
}

export const mutations ={
    [ADD_CATEGORY](state, payload) {
        state.category = payload
    },
    [ADD_DETAIL_CATEGORY](state, payload) {
        state.detail_category = payload
    },
    [COUNT_CATEGORY](state, payload) {
        state.count = payload
    },
}

export const actions = {
    // eslint-disable-next-line
    async fetchCategory({commit},payload){
       let response =  await  categoryService.fetchCategory(payload)
        if(!response || !response.category){
            return {success:false,message:response.message}
        }
            commit(ADD_CATEGORY,response.category)
            commit(COUNT_CATEGORY,response.pages)
         return {success:true}

    },
    // eslint-disable-next-line
    async deleteCategory({commit},payload){
         let response = await categoryService.deleteCategoryService(payload)
        return response
    },

    // eslint-disable-next-line
    async createCategory({commit},payload){
        let response = await categoryService.createCategoryService(payload)
        if(!response || !response.category){
            return {success:false,message:response.message}
        }
        return {success:true}
    },

    // eslint-disable-next-line
    async detailCategory({commit},payload){
        let response = await categoryService.detailCategoryService(payload)
        if(!response || !response.category){
            return {success:false,message:response.message}
        }
        commit(ADD_DETAIL_CATEGORY,response.category)
        return {success:true}
    },
    // eslint-disable-next-line
    async updateCategory({commit},payload){
        let response = await categoryService.updateCategoryService(payload)
        if(!response || !response.category){
            return {success:false,message:response.message}
        }
        return {success:true}
    },
}

export const category ={
    state,
    actions,
    mutations,
    namespaced: true
}