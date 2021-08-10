import {departmentService} from "../../../service/department.service";
export const FETCH_DEPARTMENT = 'fetchDepartment'
export const ADD_DEPARTMENT = 'addDepartment'
export const UPDATE_DEPARTMENT = 'updateDepartment'
export const ADD_DETAIL_DEPARTMENT = 'addDetailDepartment'
export const COUNT_DEPARTMENT = 'countDepartment'
export const DELETE_DEPARTMENT = 'deleteDepartment'
export const CREATE_DEPARTMENT = 'createDepartment'
export const DETAIL_DEPARTMENT = 'detailDepartment'
export const state = {
    department:[],
    count:0,
    detail_department:[]
}

export const mutations ={
    [ADD_DEPARTMENT](state, payload) {
        state.department = payload
    },
    [ADD_DETAIL_DEPARTMENT](state, payload) {
        state.detail_department = payload
    },
    [COUNT_DEPARTMENT](state, payload) {
        state.count = payload
    },
}

export const actions = {
    // eslint-disable-next-line
    async fetchDepartment({commit},payload){
        let response =  await  departmentService.fetchDepartment(payload)
        if(!response || !response.department){
            return {success:false,message:response.message}
        }
        commit(ADD_DEPARTMENT,response.department)
        commit(COUNT_DEPARTMENT,response.pages)
        return {success:true,}

    },
    // eslint-disable-next-line
    async deleteDepartment({commit},payload){
        let response = await departmentService.deleteDepartmentService(payload)
        return response
    },

    // eslint-disable-next-line
    async createDepartment({commit},payload){
        let response = await departmentService.createDepartmentService(payload)
        if(!response || !response.department){
            return {success:false,message:response.message}
        }
        return {success:true}
    },

    // eslint-disable-next-line
    async detailDepartment({commit},payload){
        let response = await departmentService.detailDepartmentService(payload)
        if(!response || !response.department){
            return {success:false,message:response.message}
        }
        commit(ADD_DETAIL_DEPARTMENT,response.department)
        return {success:true}
    },
    // eslint-disable-next-line
    async updateDepartment({commit},payload){
        let response = await departmentService.updateDepartmentService(payload)
        if(!response || !response.department){
            return {success:false,message:response.message}
        }
        return {success:true}
    },
}

export const department ={
    state,
    actions,
    mutations,
    namespaced: true
}