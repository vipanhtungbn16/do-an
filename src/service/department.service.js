import {buildQueryString} from "../utils/url";
import {userService} from "./user.service";
import AuthService from "../helper/authService";

async function fetchDepartment(payload){
    return await fetch(`http://localhost:3000/department/get?${buildQueryString(payload)}`).then(userService.handleResponse)

}
async function deleteDepartmentService(payload){
    let option ={
        method:"DELETE",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        }
    }
    return await fetch(`http://localhost:3000/department/delete/${payload}`,option).then(userService.handleResponse)
        .then(department=>{
            return department
        })
}

async function createDepartmentService(payload){
    let option = {
        method:"POST",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        },
        body:JSON.stringify(payload)
    }
    return await fetch(`http://localhost:3000/department/create`,option).then(userService.handleResponse)
}

async function detailDepartmentService(payload){
    return await fetch(`http://localhost:3000/department/get/${payload}`).then(userService.handleResponse)
}

async function updateDepartmentService(payload){
    let option = {
        method:"PUT",
        headers:{
            "Content-type": "application/json",
            "x-access-token": AuthService.getAccessToken(),
        },
        body:JSON.stringify(payload.content)
    }
    return await fetch(`http://localhost:3000/department/update/${payload.id}`,option).then(userService.handleResponse)
}

export const departmentService = {
    fetchDepartment,
    deleteDepartmentService,
    createDepartmentService,
    detailDepartmentService,
    updateDepartmentService
}