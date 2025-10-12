import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { apiQuery } from '../interfaces/movies';


const apiKey=import.meta.env.VITE_KINOPOISK_KEY;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `https://kinopoiskapiunofficial.tech/`,
    prepareHeaders:headers=>{
        headers.set('X-API-KEY',`${apiKey}`);
        headers.set('Content-Type','application/json');
        return headers;
    },
  }),
  endpoints: (builder) => ({
    getFilmsTop:builder.query({
        query:({type,page}:{type:string,page:number})=>
            `/api/v2.2/films/collections?type=${type}&page=${page}`
    }),
    getFilms: builder.query({
      query:({countries,genreId,order,type,page}:apiQuery)=>
          `/api/v2.2/films?countries=${countries}&genres=${genreId}&order=${order}&type=${type}&page=${page}`


    }),
    getGenresAndCountries: builder.query({
      query:()=>
        `/api/v2.2/films/filters`
    }),
    getFilm:builder.query({
      query:id=>`/api/v2.2/films/${id}`,
    }),
    getSequelsandPrequels:builder.query({
      query:id=>`/api/v2.1/films/${id}/sequels_and_prequels`,
      transformResponse:response =>response.map((el:any)=>({...el,kinopoiskId:el.filmId}))
    }),
    getStaff:builder.query({
      query:id=>`/api/v1/staff?filmId=${id}`,
    })
  }),
})

export const {useGetFilmsTopQuery,useGetFilmsQuery ,useGetGenresAndCountriesQuery,useGetFilmQuery,useGetSequelsandPrequelsQuery,useGetStaffQuery} = movieApi