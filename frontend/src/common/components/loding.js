import { Box, CircularProgress, Typography } from "@mui/material"


const Loding = ({message}) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Typography variant="h6">
                {message}
            </Typography>
            <br/>
            <CircularProgress />
        </Box>
    )
}

export default Loding
