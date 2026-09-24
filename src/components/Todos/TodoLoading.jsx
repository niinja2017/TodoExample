import Delete from "../../svg/Delete"
import Edit from "../../svg/Edit"

const TodoLoading = () => {
    return (
        <li className="relative flex items-center justify-between px-2 py-6 border-b">
            <div className="flex items-center w-full">
                <div>
                    <input type="checkbox" className="" disabled={true} />
                    <p className={'inline-block mt-1 ml-2 text-gray-600'}>loading...</p>
                </div >
                <button type="button" className="absolute right-0 flex items-center space-x-1">
                    <span>
                        <Edit />
                    </span>
                    <span>
                        <Delete />
                    </span>
                </button>
            </div>
        </li>
    )
}

export default TodoLoading
