import { Box, Typography } from '@mui/material'
import React from 'react'

function ProgressBar(){

    const pageNames = [
        "CONDITIONS",
        "FORMULAIRE",
        "RÈGLES"
    ];

    const currentPageNumber= 1;

    const nbrList = [];
    for (let i = 0; i < pageNames.length; i++) {
        nbrList.push(i+1);
    }

    return (
        <Box 
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: 2,
                pt: 0,
                mb: 3,
                
            }}
        >
            {pageNames.map((name, index) =>(
                <>
                    <Box 
                        key={name}
                        sx={{
                            bgcolor: `${index + 1 < currentPageNumber ? 'primary.main' : '' }`,
                            border: `${index + 1 === currentPageNumber? '4' : '2'}px solid`,
                            borderColor: `${index + 1 <= currentPageNumber ? 'primary.main' : 'secondary.main' }`,
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                                '&::after': {
                                    content: `"${name}"`,
                                    position: 'absolute',
                                    top: 'calc(100% + 10px)',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontWeight: `${index + 1 <= currentPageNumber ? 'bold' : '' }`,
                                    color: `${index + 1 <= currentPageNumber ? 'primary.main' : 'secondary.main' }`,
                                },
                        }}
                    >
                        <Typography 
                            fontWeight='bold' 
                            fontSize='20px' 
                            color={index + 1 < currentPageNumber ? 'white' : 'primary.main' } 
                            fontFamily='Times new roman' 
                            >
                            {nbrList[index]}
                        </Typography>
                    </Box>
                    {index < nbrList.length - 1 && (
                        <Box
                            sx={{
                                bgcolor: `${index + 1 < currentPageNumber ? 'primary.main' : 'secondary.main'}`,
                                width: '175px', height: `${index + 1 < currentPageNumber ? '4' : '2'}px`,
                                mx: '3px'
                            }}>
                        </Box>
                    )}
                </>
        ))}

        </Box>
    )
}

export default ProgressBar
