const TodoService = () => {
    const API_URL = 'https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/TodoExample'

    // GET Todo
    const getTodo = async () => {
        const res = await fetch(`${API_URL}`, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })

        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`)
        }

        return res.json()
    }

    // POST Todo
    const PostTodo = async (data) => {
        const res = await fetch(`${API_URL}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`)
        }
        return res.json()
    }

    // DELETE Todo
    const DeleteTodo = async (id) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`)
        }
        return res.json()
    }

    // PUT status Todo
    const StatusTodo = async (id, newStatus) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`)
        }
        return res.json()
    }

    // PUT Edit Todo
    const EditTodo = async (id, newTitle) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        })
        if (!res.ok) {
            throw new Error(`Request failed: ${res.status}`)
        }
        return res.json()
    }



    return { getTodo, PostTodo, DeleteTodo, StatusTodo , EditTodo }
}

export default TodoService
