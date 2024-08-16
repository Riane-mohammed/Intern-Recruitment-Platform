import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, CircularProgress, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

//actions
import { increment, incrementQuestionNumber, setFinished, setQuestionNumber, setStarted, updatePoints } from '../../../../modules/quiz/actions/candidateActions';
import logo from '../../../../Assets/images/logoPortNetWeb.png';

//helper functions
import { formatTime } from '../../../utils/helpers';

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
        console.log(quizLength)
        console.log(currentPage)
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
                dispatch(updatePoints(test.id, 1)); // Update points for correct answer
            } else {
                dispatch(updatePoints(test.id, -0.5)); // Deduct points for incorrect answer
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

    // Function to render answers based on the question type
    const renderAnswers = (question) => {
        switch (question.answerType) {
            case 'MULTIPLE_CHOICE':
                return question.answers.map((answer) => (
                    <Grid
                        item xs={6}
                        key={answer.id}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Box
                            sx={{
                                minWidth: '40%',
                            }}
                        >
                            <Checkbox
                                checked={selectedAnswers.includes(answer)}
                                onChange={handleAnswer(answer)}
                            />
                            {answer.answerText}
                        </Box>
                    </Grid>
                ));
            default:
                return question.answers.map((answer) => (
                    <Grid item xs={6} key={answer.id} >
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
                    pb: currentQuestion.image ? 1 : 4,
                    pt: currentQuestion.image ? 0 : 8,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: currentQuestion.image ? '150px' : 0,
                    }}
                >
                    {currentQuestion.image && <img src={logo} alt='question' />}
                </Box>
                <Typography align='center' fontWeight={600}>
                    {currentQuestion.questionText}
                </Typography>
                <Grid container spacing={4} sx={{ py: 5 }}>
                    {renderAnswers(currentQuestion)}
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {currentQuestion.answerType === 'MULTIPLE_CHOICE' && (
                        <Button variant='contained' sx={{ width: '40%', mr: 2 }} onClick={handleSubmitMultipleChoice}>
                            Submit
                        </Button>
                    )}
                    <Button variant='contained' sx={{ width: '40%', backgroundColor: 'red', color: 'white' }} onClick={handlePass}>
                        Pass
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default TestPage;
