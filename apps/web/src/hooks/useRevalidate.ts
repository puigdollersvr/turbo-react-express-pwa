import { useEffect, useState } from 'react';

export const useRevalidate = (id?: string) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>([]);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const [errors, setErrors] = useState({});

    const url = `${process.env.REACT_APP_API_URL}/auth/revalidate`;
    const tokenExists = !!localStorage.getItem("token");

    useEffect(() => {
        tokenExists ? fetch(url, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token") || ''}`
            }
            }).then(res => res.json())
            .catch(error => {
                console.log('Error', error);
                setErrors(error)
                setIsLoading(false);
                throw new Error('Fetching error');
            })
            .then(response => {
                setIsValidated(response.ok)
                if (isValidated) {
                    localStorage.setItem("token", response.token);
                    localStorage.setItem("token-init-date", `${new Date().getTime()}` );
                    setData(response);
                } else {
                    setErrors(response);
                }
                setIsLoading(false);
            }) : setIsValidated(false);
            setIsLoading(false);
    }, [])

    return {
        isLoading,
        isValidated,
        todos: data,
        errors
    }
}