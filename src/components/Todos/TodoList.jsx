import TodoItem from "./TodoItem"

const TodoList = ({ list, handleDelete, editTodo , statusHandle}) => {
    return (
        <ul className="list-reset">
            {list.map(item =>
                <TodoItem
                    key={item.id}
                    {...item}
                    handleDelete={handleDelete}
                    editTodo={editTodo}
                    statusHandle={statusHandle}
                />
            )}
        </ul>
    )
}

export default TodoList
