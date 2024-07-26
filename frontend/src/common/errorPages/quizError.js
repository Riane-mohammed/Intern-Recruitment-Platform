import { Box, Typography } from "@mui/material"


function QuizErrorPage({ name, code, description, instructions}) {
    return (
        <Box
            sx={{
                fontFamily: 'poppins',
                pb: '150px'
            }}
        >
            <Typography fontWeight='600' textAlign='center' color='primary' fontSize='3rem'>
                {name}
            </Typography>
            <Typography variant='subtitle1' fontWeight='bold' textAlign='center'>
                Code d'erreur : {code}
            </Typography>
            <Typography textAlign='center' >
                {description}
            </Typography>
            <Box
                sx={{
                    m: 4,
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    p: 2,
                    
                }}
            >
                <Typography variant='p' fontWeight='600'>
                    Instructions :
                </Typography>
                <br/>
                <Typography variant='p' textAlign='center' >
                    {instructions}
                </Typography>
            </Box>
        </Box>
    )
}

export default QuizErrorPage;
