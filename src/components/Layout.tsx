import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./UI/Navbar/Navbar";
import Footer from "./UI/Footer/Footer";



const Layout = ()=>{
    return(
        <Container fixed sx={{display:'flex',flexDirection:'column',minHeight:'100vh'}}>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </Container>
    )
}
export default Layout;