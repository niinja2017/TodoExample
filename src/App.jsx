import { ToastContainer } from "react-toastify"
import Todo from "./components/Todos/Todo"
import Card from "./components/Cart/Card"
import Cart from "./components/Cart/Cart"

function App() {
    return (
        <>
            <Card/>
            <Cart/>
            {/* <Todo /> */}
            <ToastContainer />
        </>
    )
}

export default App
