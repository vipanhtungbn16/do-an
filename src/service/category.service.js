import {buildQueryString} from "../utils/url";
import {userService} from "./user.service";

async function fetchCategory(payload){
   return await fetch(`http://localhost:3000/category/get?${buildQueryString(payload)}`).then(userService.handleResponse)
       .then(category=>{
          return category
       })
}

export const categoryService = {
    fetchCategory
}