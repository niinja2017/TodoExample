const AddTodo = ({newTitle , addTodo , todoHandleAdd}) => {
    return (
        <div className="relative">
            <input value={newTitle} onKeyDown={addTodo} onChange={todoHandleAdd} type="text" placeholder="What needs to be done today?"
                className="w-full px-2 py-3 border rounded outline-none border-grey-600" />
        </div>
    )
}

export default AddTodo
