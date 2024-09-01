import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

function LoadingOverlay({ isLoading }) {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 2000 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default LoadingOverlay;