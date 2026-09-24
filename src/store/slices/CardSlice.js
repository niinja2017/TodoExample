import { createSlice } from "@reduxjs/toolkit";

const CardSlice = createSlice({
    name: 'Card',
    initialState: {
        value: []
    },
    reducers: {
        getData: (state, action) => {
            state.value = action.payload
        },
        deleteData: (state, action) => {
            state.value = state.value.filter(item => item.id !== action.payload)
        },
        addData: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        increase: (state, action) => {
            state.value = state.value.map(item =>
                item.id == action.payload
                    ? { ...item, number: item.number + 1 }
                    : item
            )
        },
        decrease: (state, action) => {
            state.value = state.value.map(item =>
                item.id == action.payload
                    ? { ...item, number: item.number - 1 }
                    : item
            )
        },
    }
})

export const { getData, deleteData, addData , increase, decrease } = CardSlice.actions
export default CardSlice.reducer
