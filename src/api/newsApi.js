// newsAPI.js
import axios from 'axios';

const apiKey = process.env.REACT_APP_NEWS_API;

export const fetchNews = async (category) => {
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apiKey}`;
    return axios.get(url);
};


export const searchNews = async (searchTerm) => {
    const url = `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=popularity&apiKey=${apiKey}`
    return axios.get(url);

}