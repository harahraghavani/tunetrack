// src/store/searchSlice.js
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchVal: '',
        searchResults: null,
    },
    reducers: {
        setSearchVal: (state, action) => {
            state.searchVal = action.payload;
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
    },
});

export const { setSearchVal, setSearchResults } = searchSlice.actions;
export default searchSlice.reducer;
