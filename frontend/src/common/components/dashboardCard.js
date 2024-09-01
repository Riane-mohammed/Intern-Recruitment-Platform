import { Box, Card, IconButton, Typography } from '@mui/material'
import React from 'react'

function DashboardCard({ nombre, title, icon }) {
    return (
        <Card sx={{
            width: 250,
            p: 2,
            borderRadius: 3,
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
                backgroundColor: '#F4F9F9',
                '& .icon-button': {
                    bgcolor: 'secondary.main',
                },
            },
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h5' fontWeight={700} color='textPrimary'>
                    {nombre}
                </Typography>
                <IconButton
                    aria-label="user-icon"
                    className="icon-button"
                    sx={{
                        bgcolor: 'primary.main',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    {icon}
                </IconButton>
            </Box>
            <Typography variant='body2' fontWeight={500} color='textSecondary' mt={1}>
                {title}
            </Typography>
        </Card>
    )
}

export default DashboardCard
