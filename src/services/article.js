import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const rapidApiKey = import.meta.env.VITE_RAPID_AI_KEY;

const options = {
    method: 'GET',
    url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
    params: {
      url: 'https://time.com/6266679/musk-ai-open-letter/',
      length: '3'
    },
    headers: {
      'X-RapidAPI-Key': '4ce83cf952mshde4ccb61a41c919p1379dejsnc2babba89ddd',
      'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
    }
  };

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key','4ce83cf952mshde4ccb61a41c919p1379dejsnc2babba89ddd'),
            headers.set('X-RapidAPI-Host','article-extractor-and-summarizer.p.rapidapi.com')

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        })
    })
});

export const {useLazyGetSummaryQuery} = articleApi; // Lazy fires hook on demand 