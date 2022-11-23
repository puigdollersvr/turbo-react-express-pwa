import { useNavigate } from "react-router-dom";

export interface ILogin {
    email: string,
    password: string
}

export const useLogin = () => {

    const navigate = useNavigate()
    
    const isLoggedIn =  () => sessionStorage.getItem("user_jwt_token");

    const login = ({email, password}: ILogin) => {

        var url = `${process.env.REACT_APP_API_URL}/auth`;
        var data = { email, password };

        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            sessionStorage.setItem("user_jwt_token", response.token);
            navigate('/todos')
        });
    }

    const logout = () => {
        sessionStorage.removeItem("user_jwt_token");
    }

    return {
        isLoggedIn,
        login,
        logout
    }
}