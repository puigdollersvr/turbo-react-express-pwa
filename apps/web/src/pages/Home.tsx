import TodoList from "../components/TodoList"
import { useLogin } from "../hooks/useLogin"
import Login from './Login';

const Home = () => {
    const { isLoggedIn } = useLogin();
    return  isLoggedIn() ? <TodoList /> : <Login />
}

export default Home