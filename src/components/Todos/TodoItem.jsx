import { useContext, useState } from "react"
import Delete from "../../svg/Delete"
import Edit from "../../svg/Edit"
import { TodoContext } from "../../contexts/TodoContext"

const TodoItem = ({ title, id, status}) => {

    const {todoHandleDelete , editTodo , statusHandle} = useContext(TodoContext)
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(title)

    const handleEdit = (e) => {
        setEditTitle(e.target.value)
    }

    const saveEdit = (e) => {
        if (e.key === "Enter") {

            if (!editTitle.trim()) return

            editTodo(id, editTitle)

            setIsEditing(false)
        }
    }

    return (
        <li className="relative flex items-center justify-between px-2 py-6 border-b">
            <div className="flex items-center w-full">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={handleEdit}
                            onKeyDown={saveEdit}
                            autoFocus
                            className="block mt-1 ml-2 px-2 py-1 border rounded w-11/12"
                        />
                        <button className="absolute right-0 flex items-center space-x-1" onClick={() => setIsEditing(false)}>
                            <Delete />
                        </button>
                    </>
                ) : (
                    <>
                        < div >
                            <input onClick={() => statusHandle(id)} type="checkbox" defaultChecked={status} className="" />
                            <p className={`${status ? 'inline-block mt-1 ml-2 line-through text-green-700' : 'inline-block mt-1 ml-2 text-gray-600'}`}>{title}</p>
                        </div >
                        <button type="button" className="absolute right-0 flex items-center space-x-1">
                            <span onClick={() => setIsEditing(true)}>
                                <Edit />
                            </span>
                            <span onClick={() => todoHandleDelete(id)}>
                                <Delete />
                            </span>

                        </button>
                    </>
                )}
            </div>
        </li>
    )
}

export default TodoItem
