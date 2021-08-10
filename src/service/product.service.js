import {userService} from "./user.service";
import AuthService from "../helper/authService";
import {buildQueryString} from "../utils/url";


async function createProductService(payload){
    let option ={
        method:"POST",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        },
        body:JSON.stringify(payload)
    }
    return await fetch(`http://localhost:3000/product/create`,option).then(userService.handleResponse)
        .then(product=>{
            return product
        })
}

async function getProductService(payload){
    let option ={
        method:"GET",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        },
    }
    return await fetch(`http://localhost:3000/product/get?${buildQueryString(payload)}`,option).then(userService.handleResponse)
        .then(product=>{
            return product
        })
}
async  function  deleteProductService(payload){
    let option = {
        method:"POST",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        },
    }
    return await fetch(`http://localhost:3000/product/delete/${payload}`,option).then(userService.handleResponse)
        .then(product=>{
            return product
        })

}
async  function  detailProductService(payload){
    let option = {
        method:"GET",
        headers:{
            "Content-type": "application/json",
        },
    }
    return await fetch(`http://localhost:3000/product/detail/${payload}`,option).then(userService.handleResponse)
        .then(product=>{
            return product
        })

}
async  function  updateProductService(payload){
    let option = {
        method:"PUT",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        },
        body:JSON.stringify(payload)
    }
    return await fetch(`http://localhost:3000/product/update/${payload.id}`,option).then(userService.handleResponse)
        .then(product=>{
            return product
        })

}

async  function  getAllFile(){
    let option = {
        method:"GET",
        headers:{
            "Content-type": "application/json",
        },
    }
    return await fetch(`http://localhost:3000/upload/files`,option).then(userService.handleResponse)
        .then(product=>{
            return product
        })
}

export const productService = {
    createProductService,
    getProductService,
    deleteProductService,
    detailProductService,
    updateProductService,
    getAllFile
}