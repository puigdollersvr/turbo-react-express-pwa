import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Detail from '../pages/Detail';
import List from '../pages/List';
import Login from '../pages/Login';
import Home from '../pages/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1>Error</h1>,
    children:[
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/todos',
            element: <List />,
        },
        {
            path: '/todos/:id',
            element: <Detail />,
        },
    ],
  },
])
