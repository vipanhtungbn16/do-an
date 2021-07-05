// import {authHeader} from "../helper/auth-header";
import AuthService from "../helper/authService";


async function login(email,password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return await fetch(`http://localhost:3000/user/signin`,requestOptions).then(handleResponse).then(user=>{
            if(user.token){
                AuthService.storage(JSON.stringify(user))
            }
            return user
    })
}




function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                AuthService.clear()
            }
            const error = (data.message);
            return Promise.reject(error);
        }

        return data;
    });
}

export const userService = {
    login,
    handleResponse
}