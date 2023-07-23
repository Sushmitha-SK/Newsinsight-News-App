import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newsData: [],
    loading: false,
    error: null,
    category: ''
};

export const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        fetchNewsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchNewsSuccess: (state, action) => {
            state.loading = false;
            state.newsData = action.payload;
        },
        fetchNewsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchCategory: (state, action) => {
            state.category = action.payload;
        }
    }

});

export const { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure, fetchCategory } = newsSlice.actions;

export default newsSlice.reducer;