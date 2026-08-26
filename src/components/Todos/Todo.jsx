import { useEffect, useState } from "react"
import TodoList from "./TodoList"
import AddTodo from "./AddTodo";
import axios from "axios";

const Todo = () => {

    const [list, setList] = useState([])

    const [newTitle, setNewTitle] = useState('')

    // اضافه کردن Todo
    const todoHandleAdd = (e) => {
        setNewTitle(e.target.value)
    }

    const addTodo = async (e) => {
        try {
            if (e.key == "Enter" && newTitle.trim().length > 0) {
                let data = {
                    title: newTitle.trim(),
                    status: false
                }
                const res = await axios.post('https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/TodoExample', data)

                setList([
                    ...list,
                    res.data
                ])
                setNewTitle('')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // دیلیت Todo
    const todoHandleDelete = async (id) => {
        try {
            await axios.delete(`https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/TodoExample/${id}`)
            setList(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    // ویرایش Todo
    const editTodo = async (id, newTitle) => {
        try {
            await axios.put(`https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/TodoExample/${id}`, { title: newTitle })
            setList(prev =>
                prev.map(item =>
                    item.id === id
                        ? newTodo
                        : item
                )
            )
        } catch (error) {
            console.log(error)
        }
    }

    // وضعیت Todo
    const statusHandle = async (id) => {
        try {
            const currentTodo = list.find(item => item.id === id)

            const newStatus = !currentTodo.status

            await axios.put(
                `https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/TodoExample/${id}`, { status: newStatus })
            setList(prev =>
                prev.map(item =>
                    item.id === id
                        ? { ...item, status: newStatus }
                        : item
                )
            )
        } catch (error) {
            console.log(error)
        }
    }

    const getData = async () => {
        try {
            const res = await axios.get('https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/TodoExample')
            setList(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex items-center justify-center h-screen">
                    <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3  bg-white">
                        <div className="flex items-center mb-6">
                            <h1 className="mr-6 text-4xl font-bold text-purple-600">TO DO APP</h1>
                        </div>
                        <AddTodo
                            newTitle={newTitle}
                            addTodo={addTodo}
                            todoHandleAdd={todoHandleAdd}
                        />
                        <TodoList
                            list={list}
                            handleDelete={todoHandleDelete}
                            editTodo={editTodo}
                            statusHandle={statusHandle}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
