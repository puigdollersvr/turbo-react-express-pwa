import TodoList from "../components/TodoList"
import Login from './Login';
import { useLogin } from '../hooks/useLogin';

const Home = () => {
    const { isLoggedIn } = useLogin();
    return isLoggedIn() ? <TodoList /> : <Login />
}

export default Home