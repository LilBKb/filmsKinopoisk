import { Skeleton, Stack } from "@mui/material"

const MoviesListSkeleton = ()=>{
    return(
        <Stack direction={'row'} justifyContent={'center'} flexWrap={'wrap'} gap={'40px'}>
            {Array(15).fill(null).map((_,index)=>(
                <Stack>
                    <Skeleton variant="rectangular" animation={'wave'} height={'315px'} width={'215px'}/>
                    <Skeleton animation={'wave'} variant={'text'}/>
                    <Skeleton animation={'wave'} variant="rectangular" height={'16px'} width={'215px'}/>
                </Stack>
            ))}

        </Stack>
    )
}
export default MoviesListSkeleton