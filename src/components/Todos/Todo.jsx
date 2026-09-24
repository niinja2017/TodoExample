import { useEffect, useState } from "react"
import TodoList from "./TodoList"
import AddTodo from "./AddTodo";
import { toast } from "react-toastify";
import TodoService from "../../services/TodoService";
import { TodoContext } from "../../contexts/TodoContext";
import { useDispatch, useSelector } from "react-redux";
import { createData, deleteData, editData, getData, statusData } from "../../store/slices/TodoSlice";

const Todo = () => {
    const todos = useSelector((state) => state.todo.value)
    const dispatch = useDispatch()
    const [newTitle, setNewTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingId, setLoadingId] = useState(null)
    const toastOptions = {
        theme: 'dark',
        position: 'top-right',
        autoClose: 5000
    }
    const { getTodo, PostTodo, DeleteTodo, StatusTodo, EditTodo } = TodoService()


    // دیلیت Todo
    const todoHandleDelete = async (id) => {
        try {
            setLoadingId(id)
            await DeleteTodo(id)
            dispatch(deleteData(id))
            toast.success(`Todo Deleted`, toastOptions)
        } catch (error) {
            toast.error(`error Handleing : ${error.message}`, toastOptions)
        } finally {
            setLoadingId(null)
        }
    }

    // اضافه کردن Todo
    const handleTitleChange = (e) => {
        setNewTitle(e.target.value)
    }

    const addTodo = async (e) => {
        try {
            if (e.key === "Enter" && newTitle.trim().length > 0) {
                setLoading(true)
                const data = {
                    title: newTitle.trim(),
                    status: false
                }

                const newTodo = await PostTodo(data)

                dispatch(createData(newTodo))
                setNewTitle('')
                toast.success(`Todo Created`, toastOptions)
            }
        } catch (error) {
            toast.error(`error Handleing : ${error.message}`, toastOptions)
        } finally {
            setLoading(false)
        }
    }

    // ویرایش Todo
    const editTodo = async (id, newTitle) => {
        try {
            setLoadingId(id)
            await EditTodo(id, newTitle)
            dispatch(editData({id , newTitle}))
            toast.success(`Todo Change Title`, toastOptions)
        } catch (error) {
            toast.error(`error Handleing : ${error.message}`, toastOptions)
        } finally {
            setLoadingId(null)
        }
    }

    // وضعیت Todo
    const statusHandle = async (id) => {
        try {
            setLoadingId(id)
            const data = todos.find(item => item.id === id)
            if (!data) {
                toast.error('Todo not found', toastOptions)
                return
            }
            const newStatus = !data.status
            await StatusTodo(id, newStatus)
            dispatch(statusData({id , newStatus}))
        } catch (error) {
            toast.error(`error Handleing : ${error.message}`, toastOptions)
        } finally {
            setLoadingId(null)
        }
    }

    useEffect(() => {
        const loadTodos = async () => {
            try {
                setLoading(true)

                const data = await getTodo()

                dispatch(getData(data))
            } catch (error) {
                toast.error(error.message, toastOptions)
            } finally {
                setLoading(false)
            }
        }

        loadTodos()
    }, [])

    if (loading) {
        return <div className="w-full min-h-screen flex items-center justify-center">
            <h2 className="text-7xl font-bold">loading...</h2>
        </div>
    }

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex items-center justify-center h-screen">
                    <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                        <div className="flex items-center mb-6">
                            <h1 className="mr-6 text-4xl font-bold text-purple-600">TO DO APP</h1>
                        </div>

                        <TodoContext.Provider value={{
                            loadingId,
                            todos,
                            todoHandleDelete,
                            editTodo,
                            statusHandle,
                            newTitle,
                            addTodo,
                            handleTitleChange
                        }}>
                            <AddTodo />
                            <TodoList />
                        </TodoContext.Provider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
