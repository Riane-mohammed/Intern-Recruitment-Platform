import { Box, Button, Modal, Typography } from "@mui/material"


const AlertModal = ({ open, title, handleClose, color, icon, message }) => {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                bgcolor: 'background.paper',
                border: '2px solid',
                borderColor: color,
                borderRadius: 4,
                boxShadow: 24,
                p: 4,
                outline: 'none',
            }}>
                <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="div"
                    display='flex'
                    alignItems='center'>
                    {icon}{title}
                </Typography>
                <Typography
                    id="modal-modal-description"
                    sx={{
                        mt: 2,
                        ml: 4
                    }}>
                    {message}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        mt: 2
                    }}
                >
                    <Button
                        variant='contained'
                        onClick={handleClose}
                        sx={{
                            bgcolor: color,
                            '&:hover': {
                                bgcolor: color,
                            },
                        }}>Je comprends</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default AlertModal
