import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, CircularProgress, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

//actions
import { increment, incrementQuestionNumber, setFinished, setQuestionNumber, setStarted, updatePoints } from '../../../../modules/quiz/actions/candidateActions';

//helper functions
import { formatTime } from '../../../utils/helpers';

// Function to render answers based on the question type
const renderAnswers = (question, selectedAnswers, handleAnswer) => {
    switch (question.answerType) {
        case 'MULTIPLE_CHOICE':
            return question.answers.map((answer) => (
                <Grid
                    item xs={question.image ? 12 : 6}
                    key={answer.id}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pt: '0 !important',
                        pb: 1,
                    }}
                >
                    <Box
                        sx={{
                            minWidth: '40%',
                            maxHeight: '100px',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Checkbox
                            checked={selectedAnswers.includes(answer)}
                            onChange={handleAnswer(answer)}
                        />
                        {answer.image ? (
                            <Box
                                component="img"
                                src={answer.image}
                                alt="answer"
                                sx={{
                                    maxWidth: '300px',
                                    maxHeight: '100px', 
                                    objectFit: 'contain',
                                    display: 'block',
                                }}
                                onError={(e) => {
                                    e.target.src = 'path_to_default_image'; 
                                }}
                            />
                        ) : (
                            answer.answerText
                        )}
                    </Box>
                </Grid>
            ));

        default:
            return question.answers.map((answer) => (
                <Grid item xs={question.image ? 12 : 6} key={answer.id} >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Button variant='contained' color='secondary' sx={{ width: '75%' }} onClick={handleAnswer(answer)}>
                            {answer.answerText}
                        </Button>
                    </Box>
                </Grid>
            ));
    }
};

function TestPage({ test, time, quizLength }) {
    const dispatch = useDispatch(); 
    const questionNbr = useSelector(state => state.candidate.questionNbr) || 0; 
    const currentPage = useSelector(state => state.candidate.currentPage); 

    const [remainingTime, setRemainingTime] = useState(time);
    const [progress, setProgress] = useState(100);
    const [selectedAnswers, setSelectedAnswers] = useState([]); 
    const questionsLength = test.questions.length; 

    // Effect to handle the countdown timer
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

    // Effect to update the progress bar based on remaining time
    useEffect(() => {
        setProgress(remainingTime * 100 / time);
    }, [remainingTime, time]);

    const currentQuestion = test.questions[questionNbr]; // Get the current question based on the question number

    // Function to move to the next question
    const nextQuestion = () => {
        if (questionNbr === questionsLength - 1) {
            if (currentPage === quizLength) {
                dispatch(setFinished(true)); // Mark the quiz as finished if it's the last page
            } else {
                dispatch(setStarted(false)); // Mark the current test as finished
            }
            if (remainingTime > 20) {
                dispatch(updatePoints(test.id, 2)); // Bonus points for finishing early
            }
            dispatch(setQuestionNumber(0)); // Reset question number for the next test
            dispatch(increment(quizLength)); // Increment the page number
            return;
        }
        dispatch(incrementQuestionNumber(questionsLength - 1)); // Move to the next question
        setSelectedAnswers([]); // Reset selected answers
    };

    // Function to handle answer selection
    const handleAnswer = (answer) => () => {
        if (currentQuestion.answerType === 'MULTIPLE_CHOICE') {
            setSelectedAnswers(prev => {
                if (prev.includes(answer)) {
                    return prev.filter(a => a !== answer); // Deselect answer if already selected
                } else {
                    return [...prev, answer]; // Select answer
                }
            });
        } else {
            if (answer.isCorrect) {
                dispatch(updatePoints(test.id, currentQuestion.point)); // Update points for correct answer
            } else {
                dispatch(updatePoints(test.id, currentQuestion.point / 2 )); // Deduct points for incorrect answer
            }
            setTimeout(nextQuestion, 0); // Move to the next question after current render cycle
        }
    };

    // Function to handle submission of multiple choice answers
    const handleSubmitMultipleChoice = () => {
        const correctAnswers = currentQuestion.answers.filter(answer => answer.isCorrect);
        const selectedAnswerIds = selectedAnswers.map(answer => answer.id);
        const correctSelected = correctAnswers.filter(answer => selectedAnswerIds.includes(answer.id));
        const incorrectSelected = selectedAnswers.filter(answer => !answer.isCorrect);

        const point = 2 / (correctAnswers.length || 1);

        if (correctAnswers.length === 0) {
            if (selectedAnswers.length === 0) {
                dispatch(updatePoints(test.id, 2)); 
            } else {
                dispatch(updatePoints(test.id, -1));
            }
        } else {
            const totalPoints = correctSelected.length * point - incorrectSelected.length * point;
            dispatch(updatePoints(test.id, totalPoints));
        }

        setTimeout(nextQuestion, 0);
    };

    // Function to handle passing a question
    const handlePass = () => {
        setTimeout(nextQuestion, 0);
    };

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
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                </Box>
                {currentQuestion.image ?
                    <>
                        <Grid
                            container
                            spacing={4}
                            sx={{
                                py: 2,
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    pt: currentQuestion.answerType !== 'BOOLEAN' ? '0 !important' : undefined,
                                    pb: currentQuestion.answerType !== 'BOOLEAN' ? undefined : '25px !important',
                                }}
                            
                            >
                                <Typography fontWeight={600} color='primary' gutterBottom>{currentQuestion.questionText}</Typography>
                                <Box
                                    component="img"
                                    src={currentQuestion.image}
                                    alt="question-image"
                                    sx={{
                                        width: '100%',
                                        height: 'auto',
                                        maxHeight: '400px',
                                        objectFit: 'contain',
                                        display: 'block',
                                        margin: '0 auto',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ py: '0 !important' }}>
                                <Grid container spacing={4} sx={{ py: 5 }}>
                                    {renderAnswers(currentQuestion, selectedAnswers, handleAnswer)}
                                </Grid>
                            </Grid>
                        </Grid>

                    </>
                    :
                    <Box sx={{pt: 5}}>
                        <Typography align='center' fontWeight={600}>
                            {currentQuestion.questionText}
                        </Typography>
                        <Grid container spacing={4} sx={{ py: 5 }}>
                            {renderAnswers(currentQuestion, selectedAnswers, handleAnswer)}
                        </Grid>
                    </Box>
                }
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 2 
                    }}
                >
                    {currentQuestion.answerType === 'MULTIPLE_CHOICE' && (
                        <Button variant='contained' sx={{ width: '40%', mr: 2 }} onClick={handleSubmitMultipleChoice}>
                            Submit
                        </Button>
                    )}
                    <Button variant='contained' sx={{ width: '40%', backgroundColor: 'red', color: 'white'}} onClick={handlePass}>
                        Pass
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default TestPage;
