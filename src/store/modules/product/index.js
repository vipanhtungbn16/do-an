import {productService} from "../../../service/product.service";
export const CREATE_PRODUCT = "createProduct"
export const DELETE_PRODUCT = "deleteProduct"
export const GET_PRODUCT = "getProduct"
export const GET_FILE = "getFile"
export const GET_DETAIL_PRODUCT = "getDetailProduct"
export const FETCH_PRODUCT = "fetchProduct"
export const FETCH_DETAIL_PRODUCT = "FetchDetailProduct"
export const UPDATE_PRODUCT = "updateProduct"
export const FETCH_COUNT = "fetchCount"
export const GET_PRODUCT_BY_SLUG = "getProductBySlug"


export const state={
    products:[],
    product:{},
    files:[],
    count:0
}
export const mutations={
    [FETCH_PRODUCT](state, payload) {
        state.products = payload
    },
    [FETCH_COUNT](state, payload) {
        state.count = payload
    },
    [FETCH_DETAIL_PRODUCT](state, payload) {
        state.product = payload
    },
    [GET_FILE](state, payload) {
        state.files = payload
    },

}

export const actions={
    // eslint-disable-next-line
    async createProduct({commit},payload){
        let response =  await  productService.createProductService(payload)
        if(!response || !response.product){
            return {success:false,message:response}
        }
        return {success:true}

    },
    // eslint-disable-next-line
    async getProduct({commit},payload){
        let response =  await  productService.getProductService(payload)
        if(!response || !response.products){
            return {success:false,message:response.message}
        }
        commit(FETCH_PRODUCT,response.products)
        commit(FETCH_COUNT,response.pages)
        return {success:true}
    },

    // eslint-disable-next-line
    async getProductBySlug({commit},payload){
        let response =  await  productService.getProductSlugService(payload)
        if(!response || !response.products){
            return {success:false,message:response.message}
        }
        commit(FETCH_PRODUCT,response.products)
        commit(FETCH_COUNT,response.pages)
        return {success:true,products:response.products,page:response.pages,description:response.description,breadcum:response.breadcum}
    },
    // eslint-disable-next-line
    async getDetailProduct({commit},payload){
        let response =  await  productService.detailProductService(payload)
        if(!response || !response.product){
            return {success:false,message:response.message}
        }
        commit(FETCH_DETAIL_PRODUCT,response.product)
        return {success:true}
    },
    // eslint-disable-next-line
    async deleteProduct({commit},payload){
        let response =  await  productService.deleteProductService(payload)
        if(!response || !response.products){
            return {success:false,message:response.message}
        }
        return {success:true}
    },
    // eslint-disable-next-line
    async updateProduct({commit},payload){
        let response =  await  productService.updateProductService(payload)
        if(!response || !response.product){
            return {success:false,message:response.message}
        }
        return {success:true}
    },

    // eslint-disable-next-line
    async getFile({commit},payload){
        let response =  await  productService.getAllFile()
        if(!response || !response.files){
            return {success:false,message:response.message}
        }
        commit(GET_FILE,response.files)
        return {success:true}
    },
}


export const product ={
    state,
    actions,
    mutations,
    namespaced: true
}