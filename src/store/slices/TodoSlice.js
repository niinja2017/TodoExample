import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
    loadingId : null
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        getData: (state, action) => {
            state.value = action.payload
        },
        deleteData: (state, action) => {
            state.loadingId = action.payload
            state.value = state.value.filter(item => item.id !== action.payload)
        },
        createData: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        statusData: (state, action) => {
            state.loadingId = action.payload.id
            state.value = state.value.map(item =>
                item.id === action.payload.id
                    ? { ...item, status: action.payload.newStatus }
                    : item
            )
        },
        editData: (state, action) => {
            state.loadingId = action.payload.id
            state.value = state.value.map(item =>
                item.id === action.payload.id
                    ? { ...item, title: action.payload.newTitle }
                    : item
            )
        },
    }
})

export const { getData, deleteData, createData, statusData, editData } = todoSlice.actions
export default todoSlice.reducer
