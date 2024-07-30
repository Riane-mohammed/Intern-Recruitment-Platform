import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";

// Helper function
import { formatTime } from '../../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';

//actions
import { increment, incrementQuestionNumber, setFinished, setQuestionNumber, setStarted } from '../../../../modules/quiz/actions/candidateActions';

function TestPage({ test, time, quizLength}) {
    const dispatch = useDispatch();

    const questionNbr = useSelector( state => state.candidate.questionNbr) || 0;
    const currentPage = useSelector( state => state.candidate.currentPage);

    const [remainingTime, setRemainingTime] = useState(time);
    const [progress, setProgress] = useState(100);
    const questionsLength = test.questions.length;

    const handleAnswer = (isCorrect) => () => {
        if (isCorrect) {
            console.log("yes it's true");
        }

        if (questionNbr === questionsLength - 1) {
            if (currentPage === quizLength) {
                dispatch(setFinished(true));
            } else {
                dispatch(setStarted(false));
            }
            dispatch(setQuestionNumber(0));
            dispatch(increment(quizLength));
            return;
        }

        dispatch(incrementQuestionNumber(questionsLength - 1))
    };

    const handlePass = () => {
        console.log("passe");
        if (questionNbr === questionsLength - 1) {
            if (currentPage === quizLength) {
                dispatch(setFinished(true));
            } else {
                dispatch(setStarted(false));
            }
            dispatch(setQuestionNumber(0));
            dispatch(increment(quizLength));
            return;
        }

        dispatch(incrementQuestionNumber(questionsLength - 1))
    };

    useEffect(() => {
        if (remainingTime <= 0) return;

        const timerId = setInterval(() => {
            setRemainingTime(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timerId);
                    dispatch(setQuestionNumber(0));
                    dispatch(setStarted(false));
                    dispatch(increment(quizLength));
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timerId);
    }, [remainingTime, time, dispatch, quizLength]);

    useEffect(() => {
        setProgress(remainingTime * 100 / time);
    }, [remainingTime, time]);

    return (
        <Box>
            <Box display="flex" alignItems="center" justifyContent="center" position="relative" pt={4}> 
                <CircularProgress
                    variant="determinate"
                    color={remainingTime <= 15 ? 'error' : 'secondary'}
                    value={progress}
                    size={100}
                    thickness={3}
                />
                <Typography
                    variant="h6"
                    component="div"
                    color="textSecondary"
                    style={{
                        position: 'absolute',
                        lineHeight: '100px',
                    }}
                >
                    {formatTime(remainingTime)}
                </Typography>
            </Box>
            <Box
                sx={{
                    py: 5,
                }}
            >
                <Typography align='center' fontWeight={600}>
                    {test.questions[questionNbr].questionText}
                </Typography>
                <Grid container spacing={4} sx={{ py: 5 }}>
                    {test.questions[questionNbr].answers.map((answer) => (
                        <Grid item xs={6} key={answer.id} >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                            >
                                <Button variant='contained' color='secondary' sx={{ width: '75%' }} onClick={handleAnswer(answer.isCorrect)}>
                                    {answer.answerText}
                                </Button>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Button variant='contained' sx={{ width: '40%', backgroundColor: 'red', color: 'white' }} onClick={handlePass}>
                        Passe
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default TestPage;
