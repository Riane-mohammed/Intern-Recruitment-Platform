import { Box } from '@mui/material'
import React from 'react'

//logo
import logo from '../../../assets/images/logoPortNetWeb.png'
import ProgressBar from '../../../common/components/bars/progressBar'
import { Outlet } from 'react-router-dom'

function QuizLayout() {
    return (
        <Box
            sx={{
                bgcolor: 'grey.light',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative'
                }}
        >
            <Box
                sx={{
                    width: '240px',
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            >
                <img 
                    src={logo} 
                    alt='portnet logo'
                    style={{
                    maxWidth: '80%',
                    }}
                />
            </Box>
            <Box
                sx={{
                    // bgcolor: 'white',
                    width: '85vw',
                    height: '80vh',
                }}
            >
                <ProgressBar />
                <Box 
                    sx={{
                        bgcolor: 'white',
                        border: '1px solid rgba(0, 0, 0, 0.12)',
                        borderRadius: 5,
                        minHeight: '70vh',
                        boxShadow: 2
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default QuizLayout
