import { Pagination, Stack} from "@mui/material";
import MovieCard from "../MovieCard/MovieCard";
import styles from './styles.module.css'

interface Props{
    setPage:(page:number)=>void,
    page:number,
    movies:any,
    totalPages:any

}

const MoviesList =({setPage,page,movies,totalPages}:Props)=>{
    return(
        <Stack flexWrap='wrap' direction='row' justifyContent='center' className={styles.list}>
            {movies.map((movie:any)=>
            (<MovieCard movie={movie} key={movie.kinopoiskId}/>))}
            <Pagination count={totalPages} 
            color="primary" 
            className={styles.pagination} 
            variant="outlined" 
            page={page} 
            onChange={(_,value)=>setPage(value)} />
        </Stack>
    )
}
export default MoviesList;