import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const cryptoApiHeaders = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': 'aef8684983msh3dfd0e4a2c0445cp15cd47jsneaf535350df5',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url)=>({ url, headers : cryptoApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints : (builder) =>({
      getNews : builder.query({
        query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
      })
    })
});

export const { useGetNewsQuery }  = cryptoNewsApi;