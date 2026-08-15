import { useEffect, useState } from "react"
import TodoList from "./TodoList"
import { v4 as uuidv4 } from 'uuid';
import AddTodo from "./AddTodo";

const Todo = () => {

    const [list, setList] = useState(JSON.parse(localStorage.getItem('list')) || [
        {
            id: uuidv4(),
            title: 'TailwindCss One',
            status: false
        },
        {
            id: uuidv4(),
            title: 'TailwindCss Two',
            status: false
        },
        {
            id: uuidv4(),
            title: 'TailwindCss Three',
            status: false
        }
    ])

    const [newTitle, setNewTitle] = useState('')

    // دیلیت Todo
    const todoHandleDelete = (id) => {
        let deleteTodo = list.filter(item => item.id !== id)
        setList(deleteTodo)
    }

    // اضافه کردن Todo
    const todoHandleAdd = (e) => {
        setNewTitle(e.target.value)
    }

    const addTodo = (e) => {
        if (e.key == "Enter" && newTitle.trim().length > 0) {
            setList([
                ...list,
                {
                    id: uuidv4(),
                    title: newTitle.trim(),
                    status: false
                }
            ])
            setNewTitle('')
        }
    }

    // ویرایش Todo
    const editTodo = (id, newTitle) => {
        let editTodo = list.map(item =>
            item.id === id
                ? { ...item, title: newTitle }
                : item
        )
        setList(editTodo)
    }

    // وضعیت Todo
    const statusHandle = (id) => {
        let newStatus = list.map(item => {
            return item.id === id
                ? { ...item, status: !item.status }
                : item
        })
        console.log(newStatus)
        setList(newStatus)
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])

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
