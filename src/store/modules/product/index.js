import {productService} from "../../../service/product.service";
export const CREATE_PRODUCT = "createProduct"

export const state={
    products:[]
}
export const mutations={

}
export const actions={
    // eslint-disable-next-line
    async createProduct({commit},payload){
        let response =  await  productService.createProductService(payload)
        if(!response || !response.product){
            return {success:false,message:response.message}
        }
        return {success:true}

    },
}

export const product ={
    state,
    actions,
    mutations,
    namespaced: true
}