import {buildQueryString} from "../utils/url";
import {userService} from "./user.service";
import AuthService from "../helper/authService";

async function fetchCategory(payload){
   return await fetch(`http://localhost:3000/category/get?${buildQueryString(payload)}`).then(userService.handleResponse)

}
async function deleteCategoryService(payload){
    let option ={
        method:"DELETE",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        }
    }
    return await fetch(`http://localhost:3000/category/delete/${payload}`,option).then(userService.handleResponse)
        .then(category=>{
            return category
        })
}

async function createCategoryService(payload){
    let option = {
        method:"POST",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        },
        body:JSON.stringify(payload)
    }
    return await fetch(`http://localhost:3000/category/create`,option).then(userService.handleResponse)
}

async function detailCategoryService(payload){
    return await fetch(`http://localhost:3000/category/get/${payload}`).then(userService.handleResponse)
}

async function updateCategoryService(payload){
    let option = {
        method:"PUT",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        },
        body:JSON.stringify(payload.content)
    }
    return await fetch(`http://localhost:3000/category/update/${payload.id}`,option).then(userService.handleResponse)
}

export const categoryService = {
    fetchCategory,
    deleteCategoryService,
    createCategoryService,
    detailCategoryService,
    updateCategoryService
}