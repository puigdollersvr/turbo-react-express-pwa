import TodoList from "../components/TodoList"
import AddButton from "../components/AddButton";
import Authorization from '../components/Authorization';

const List = () => {
    return  <Authorization>
        <TodoList />
        <AddButton />
    </Authorization>
}

export default List