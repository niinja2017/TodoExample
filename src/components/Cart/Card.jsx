import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { addData } from "../../store/slices/CardSlice"

const Card = () => {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.card.value)
    const card = [
        {
            "title": "Item One",
            "number": 1,
            "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia excepturi assumenda sequi adipisci molestias inventore ullam? Quam minus,placeat, quidem odio, delectus quaerat dicta labore nisi modi provident rem odit!",
            "price": "10000",
            "id": "1"
        },
        {
            "title": "Item Two",
            "number": 1,
            "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia excepturi assumenda sequi adipisci molestias inventore ullam? Quam minus,placeat, quidem odio, delectus quaerat dicta labore nisi modi provident rem odit!",
            "price": "20000",
            "id": "2"
        },
        {
            "title": "Item Three",
            "number": 1,
            "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia excepturi assumenda sequi adipisci molestias inventore ullam? Quam minus,placeat, quidem odio, delectus quaerat dicta labore nisi modi provident rem odit!",
            "price": "30000",
            "id": "3"
        },
        {
            "title": "Item Four",
            "number": 1,
            "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia excepturi assumenda sequi adipisci molestias inventore ullam? Quam minus,placeat, quidem odio, delectus quaerat dicta labore nisi modi provident rem odit!",
            "price": "40000",
            "id": "4"
        },
        {
            "title": "Item Five",
            "number": 1,
            "message": "Lorem ipsum dolor sit amet consectetur adipisicing elit.Quia excepturi assumenda sequi adipisci molestias inventore ullam? Quam minus,placeat, quidem odio, delectus quaerat dicta labore nisi modi provident rem odit!",
            "price": "50000",
            "id": "5"
        }
    ]
    const [loading, setLoading] = useState(false)
    const addCart = async (id) => {
        const findData = card.find(item => item.id === id)
        const validation = data.find(item => item.id == id)
        if (validation) {
            return
        }
        if (!findData) return
        try {
            setLoading(true)
            const res = await fetch('https://6a8eb04ea12b7de8cc0edfbd.mockapi.io/learn-api', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(findData)
            })
            if (!res.ok) {
                throw new Error("Faild Data");
            }
            const data = await res.json()
            dispatch(addData(data))
            toast.success(`create Data ${id}`)
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
    return (
        <div className="w-full min-h-screen bg-gray-400">
            <div className="p-6 w-full grid grid-cols-4 gap-5">
                {card.map(item =>
                    <div key={item.id} className="border p-4 space-y-6 rounded bg-blue-950 text-white">
                        <h4 className="text-3xl font-bold">{item.title}</h4>
                        <p className="text-justify">{item.message}</p>
                        <p className="text-2xl text-shadow-2xs">{item.price}</p>
                        <div className="flex justify-between w-full">
                            <button className="px-2 py-1 bg-white text-black rounded font-semibold cursor-pointer" onClick={() => addCart(item.id)}>Add to Cart</button>
                            <p className="bg-white text-black text-2xl rounded-full px-2">{item.number}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card
