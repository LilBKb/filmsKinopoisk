import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { useGetGenresAndCountriesQuery } from "../../../services/api";
import type { countriesType, genreType } from "../../../interfaces/movies";
import { useDispatch } from "react-redux";
import { resetQuery, selectQuery } from "../../../store/slices/movieSlice";



interface Props{
    countriesList:countriesType[],
    genresList:genreType[],
    countries:string,
    order:string,
    page:number,
    genreId:string
}
const SelectMovies =({countriesList,genresList,countries,order,page,genreId}:Props)=>{
    
const orderList=[
    {
        title:'По рейтингу',
        value:'RATING'
    },
    {
        title:'По оценкам',
        value:'NUM_VOTE'
    }
]

const dispatch = useDispatch()
    return(
        <Stack sx={{flexDirection:{sm:'column',md:'row'}}} marginTop={'80px'} gap={'16px'}>
            <FormControl fullWidth size='small'>
                <InputLabel>Сортировка по</InputLabel>
                <Select value={order} onChange={(e)=>dispatch(selectQuery({order:e.target.value}))}>
                    {orderList.map((item)=>(
                        <MenuItem value={item.value} key={item.value}>{item.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth size='small'>
                <InputLabel>Жанр</InputLabel>
                <Select value={genreId} onChange={(e)=>dispatch(selectQuery({genreId:e.target.value}))}>
                    {genresList.map((item)=>(
                        <MenuItem key={item.id} value={item.id}>{item.genre}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth size='small'>
                <InputLabel>Страна</InputLabel>
                <Select value={countries} onChange={(e)=>dispatch(selectQuery({countries:e.target.value}))}>
                    {countriesList.map((item)=>(
                        <MenuItem key={item.id} value={item.id}>{item.country}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button onClick={()=>dispatch(resetQuery())}>Сбросить</Button>


        </Stack>
    )
}
export default SelectMovies;