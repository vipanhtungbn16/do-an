import {userService} from "./user.service";
import AuthService from "../helper/authService";

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


export const productService = {
    createProductService
}