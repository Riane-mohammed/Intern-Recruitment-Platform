import { Box, Button, Typography } from "@mui/material"
import { useDispatch } from "react-redux"

//helper functions
import { formatTime } from "../../../utils/helpers"

//actions
import { setStarted } from "../../../../modules/quiz/actions/candidateActions";

function HomeTest({ title, time, numberOfQuestions }) {
    const dispatch = useDispatch();

    const handleStart = () => {
        dispatch(setStarted(true));
    };

    return (
        <Box
            sx={{
                py: 5,
                minHeight: '70vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}
        >
            <Typography variant="h5" align="center" textTransform="uppercase" fontWeight={600} color="primary" >
                test de {title}
            </Typography>
            <Typography align="center">
                Cette partie contient des questions de {title}, le but est de répondre correctement et le plus rapidement possible.
                <br/>
                Vous avez {formatTime(time)} pour répondre aux {numberOfQuestions} questions
            </Typography>
            <Button variant="contained" sx={{ width: '400px'}} onClick={handleStart}>Commencer</Button>
        </Box>
    )
}

export default HomeTest
