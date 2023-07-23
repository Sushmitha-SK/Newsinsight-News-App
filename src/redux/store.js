import { configureStore } from "@reduxjs/toolkit";
import newsReducer from './slice/newsSlice';

export const store = configureStore({
    reducer: {
        news: newsReducer,
    }
});

