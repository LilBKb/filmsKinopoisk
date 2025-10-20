import { Stack, Typography } from '@mui/material';
import styles from './styles.module.css'


const Footer=()=>{
    return(
        <Stack component="footer" sx={{paddindTop:4,paddingBottom:4,flexDirection:{sm:'row'},justifyContent:{sm:'space-between'},marginTop:'auto'}}>
            <Typography variant='body2' color='text.secondary'>
                    &copy; {new Date().getFullYear()} &laquo;kinopoisk&raquo;18+<br/>
                    Данный сайт создан в обучающих целях<br/>
                    Все права принадлежат правообладателям
            </Typography>
            <Typography color='primaty.main' variant='h4'>Kinopoisk</Typography>
        </Stack>
    )
}
export default Footer;