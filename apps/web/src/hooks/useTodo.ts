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
        fetch(url, {
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
                !id ? setData(response.todos) : setData(response.todo);
                setIsLoading(false);
            });
    }, [])

    const createTodo = (data:{}) => {
        console.log('CREATING...')
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token") || ''}`
            }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                return response
            });
    }

    const updateTodo = (data:{}) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token") || ''}`
            }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
               
                return response;
            });
    }

    const removeTodo = () => {
        fetch(url, {
            method: 'DELETE', // or 'PUT'
            headers:{
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token") || ''}`
            }
            }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                return response;
            });
    }

    return {
        isLoading,
        todos: data,
        errors,
        createTodo,
        updateTodo,
        removeTodo

    }
}