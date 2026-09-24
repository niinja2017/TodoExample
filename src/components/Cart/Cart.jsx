import { useDispatch, useSelector } from "react-redux"
import { decrease, deleteData, getData, increase } from "../../store/slices/CardSlice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const Cart = () => {
    const card = useSelector((state) => state.card.value)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const data = async () => {
        try {
            setLoading(true)
            const res = await fetch('https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/learn-api', {
                method: 'GET',
                headers: { 'content-type': 'application/json' }
            })
            if (!res.ok) {
                throw new Error("Faild Data");
            }
            const data = await res.json()
            dispatch(getData(data))
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const deleteCard = async (id) => {
        try {
            setLoading(true)
            const res = await fetch(`https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/learn-api/${id}`, { method: 'DELETE', })
            if (!res.ok) throw new Error("Faild Data")
            dispatch(deleteData(id))
            toast.success('DeleteCard')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        data()
    }, [])

    const increaseHandle = async (id) => {
        try {
            setLoading(true)
            let { number } = card.find(item => item.id == id)
            const res = await fetch(`https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/learn-api/${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ number: number + 1 })
            })
            if (!res.ok) throw new Error("Faild Data")
            dispatch(increase(id))
            toast.success('change card')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    const decreaseHandle = async (id) => {
        try {
            let { number } = card.find(item => item.id == id)
            if (number === 1) {
                deleteCard(id)
                return
            }
            setLoading(true)
            const res = await fetch(`https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/learn-api/${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ number: number - 1 })
            })
            if (!res.ok) throw new Error("Faild Data")
            dispatch(decrease(id))
            toast.success('change card')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }

    }

    if (loading) {
        return <div className="w-full min-h-screen flex justify-center items-center">
            <h3 className="text-7xl font-bold">Loading...</h3>
        </div>
    }
    const total = card.reduce((acc, item) => {
        return item.price * item.number + acc
    }, 0)

    return (
        <>
            <div className="w-full min-h-screen bg-gray-400">
                <div className="p-6 w-full grid grid-cols-4 gap-5">
                    {
                        card.map(item =>
                            <div key={item.id} className="border p-4 space-y-6 rounded">
                                <h4 className="text-3xl font-bold">{item.title}</h4>
                                <p className="text-justify">{item.message}</p>
                                <p className="text-2xl text-shadow-2xs">{item.price}</p>
                                <button onClick={() => increaseHandle(item.id)} className="px-2 py-1 bg-white text-black rounded font-semibold cursor-pointer mr-1">increase</button>
                                <button onClick={() => decreaseHandle(item.id)} className="px-2 py-1 bg-white text-black rounded font-semibold cursor-pointer mr-1">decrease</button>
                                <div className="flex justify-between w-full">
                                    <button className="px-2 py-1 bg-white text-black rounded font-semibold cursor-pointer" onClick={() => deleteCard(item.id)}>Delete</button>
                                    <p className="bg-white text-black text-2xl rounded-full px-2">{item.number}</p>
                                </div>
                                <p className="text-2xl text-shadow-2xs">{item.price * item.number}</p>

                            </div>
                        )
                    }
                </div>
                <p className="p-6 text-5xl font-bold">{total}</p>
            </div >
        </>
    )
}

export default Cart
