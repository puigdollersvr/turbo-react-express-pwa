import { useNavigate } from "react-router-dom";

export interface ILogin {
    email: string,
    password: string
}

export const useLogin = () => {

    const navigate = useNavigate()
    
    const isLoggedIn =  () => localStorage.getItem("token");

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
            localStorage.setItem("token", response.token);
            localStorage.setItem("token-init-date", `${new Date().getTime()}` );
            window.location.reload();
        });
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("token-init-date");
        window.location.reload();
    }

    return {
        isLoggedIn,
        login,
        logout
    }
}