import {Outlet} from 'react-router-dom'
import Sidebar from './Sidebar'
import {Box, Container} from '@mui/material'

export const Layout = () => {
    return (
        <>
            <Sidebar />
            <main style={{marginLeft: '200px'}}>
                <Container maxWidth='xl' sx={{paddingTop: '50px'}}>
                    <Outlet />
                </Container>
                {/* <Box sx={{marginLeft: '270px'}}>
                    <Outlet />
                </Box> */}
            </main>
        </>
    )
}