import { useContext } from "react"
import TodoItem from "./TodoItem"
import TodoLoading from "./TodoLoading"
import { TodoContext } from "../../contexts/TodoContext"
import { useSelector } from "react-redux"

const TodoList = () => {
    const todos = useSelector((state) => state.todo.value)
    const { loadingId } = useContext(TodoContext)
    return (
        <ul className="list-reset">
            {todos.map(item =>
                loadingId !== item.id ?
                    <TodoItem
                        key={item.id}
                        {...item}
                    />
                    : <TodoLoading key={item.id} />
            )}
        </ul>
    )
}

export default TodoList
