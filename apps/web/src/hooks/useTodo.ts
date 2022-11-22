import { useEffect, useState } from 'react';

export interface ITodo {
    id: string,
    title: string,
    notes?: string,
    done: boolean,
    start?: string,
    end?: string
}

export const useTodo = (id?: string) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<any>([]);
    const [errors, setErrors] = useState({});

    const url = `${process.env.REACT_APP_API_URL}/todos/${id || ''}`;

    useEffect(() => {

        console.log('1.A')

        fetch(url, {
            headers:{
                Authorization: `Bearer ${sessionStorage.getItem("user_jwt_token") || ''}`
            }
            }).then(res => res.json())
            .catch(error => {
                console.log('Error', error);
                setErrors(error)
                setIsLoading(false);
                throw new Error('Fetching error');
            })
            .then(response => {
                console.log('2.AA');
                console.log('ID', id);
                !id ? setData(response.todos) : setData(response.todo);
                setIsLoading(false);
            });
    }, [])

    return {
        isLoading,
        todos: data,
        errors

    }
}