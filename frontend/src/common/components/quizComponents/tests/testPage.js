import React, { useState, useEffect } from 'react';
import { Box, Button, Checkbox, CircularProgress, Grid, Radio, Typography, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { increment, incrementQuestionNumber, setFinished, setQuestionNumber, setRemainingTime, setStarted, updatePoints } from '../../../../modules/quiz/actions/candidateActions';

// Helper functions
import { formatTime } from '../../../utils/helpers';

// APIs 
import { assignQuiz, assignResult, hasPassed, hasResultSaved } from '../../../api/quiz';

// Function to render answers based on the question type
const renderAnswers = (question, selectedAnswers, handleAnswer) => {
    const isMultipleChoice = question.type === 'MULTIPLE_CHOICE';
    
    return question.answers.map((answer) => (
        <Grid
            item
            xs={question.image ? 12 : 6}
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
                {isMultipleChoice ? (
                    <>
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
                                    display: 'block'
                                }}
                            />
                        ) : (
                            answer.answer
                        )}
                    </>
                ) : (
                    <>
                        <Radio
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
                                    display: 'block'
                                }}
                            />
                        ) : (
                            answer.answer
                        )}
                    </>
                )}
            </Box>
        </Grid>
    ));
};

function TestPage({ test, time, quizLength }) {
    const dispatch = useDispatch();
    const questionNbr = useSelector(state => state.candidate.questionNbr) || 0;
    const currentPage = useSelector(state => state.candidate.currentPage);
    const email = useSelector(state => state.candidate.candidate.email);
    const quizId = useSelector(state => state.candidate.quiz.id);
    const quizResult = useSelector(state => state.candidate.quizResult);
    const remainingTime = useSelector(state => state.candidate.remainingTime) || time;

    const [isAssigning, setIsAssigning] = useState(false);
    const [progress, setProgress] = useState(100);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [error, setError] = useState(''); // New state for error message
    const questionsLength = test.questions.length;

    useEffect(() => {
        if (!remainingTime && time) {
            dispatch(setRemainingTime(time));
        }
    }, [time, remainingTime, dispatch]);

    const assign = async () => {
        if (isAssigning) return;
        setIsAssigning(true);

        try {
            const alreadyAssigned = await hasPassed(email, quizId);

            if (!alreadyAssigned) {
                await assignQuiz(email, quizId);

                try {
                    for (const [testId, score] of Object.entries(quizResult)) {
                        const resultDTO = {
                            score,
                            quizId,
                            testId: parseInt(testId),
                            candidateId: email
                        };

                        const isTestSaved = await hasResultSaved(email, quizId, testId);

                        if (!isTestSaved) {
                            await assignResult(resultDTO);
                        }
                    }
                } catch (error) {
                    console.error('Error assigning results:', error);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (remainingTime > 0) {
            const timerId = setInterval(() => {
                const newTime = remainingTime - 1;

                if (newTime <= 0) {
                    clearInterval(timerId);
                    dispatch(setQuestionNumber(0));
                    dispatch(setStarted(false));
                    dispatch(increment(quizLength));
                } else {
                    dispatch(setRemainingTime(newTime));
                }
            }, 1000);

            return () => clearInterval(timerId);
        }
    }, [remainingTime, dispatch, quizLength]);

    useEffect(() => {
        setProgress((remainingTime * 100) / time);
    }, [remainingTime, time]);

    const currentQuestion = test.questions[questionNbr]; // Get the current question based on the question number

    const nextQuestion = () => {
        if (questionNbr === questionsLength - 1) {
            if (currentPage === quizLength) {
                assign();
                dispatch(setFinished(true));
            } else {
                dispatch(setStarted(false)); // Mark the current test as finished
            }
            if (remainingTime > 20) {
                dispatch(updatePoints(test.id, 1)); // Bonus points for finishing early
            }
            dispatch(setQuestionNumber(0)); // Reset question number for the next test
            dispatch(setRemainingTime(null));
            dispatch(increment(quizLength)); // Increment the page number
            return;
        }
        dispatch(incrementQuestionNumber(questionsLength - 1)); // Move to the next question
        setSelectedAnswers([]); // Reset selected answers
    };

    const handleAnswer = (answer) => () => {
        if (currentQuestion.type === 'MULTIPLE_CHOICE') {
            setSelectedAnswers(prev => {
                if (prev.includes(answer)) {
                    return prev.filter(a => a !== answer); // Deselect answer if already selected
                } else {
                    return [...prev, answer]; // Select answer
                }
            });
        } else {
            setSelectedAnswers([answer]); // Single selection for radio buttons
        }
    };

    const handleSubmit = () => {
        if (currentQuestion.type === 'MULTIPLE_CHOICE') {
            handleSubmitMultipleChoice();
        } else {
            if (selectedAnswers.length === 0) {
                setError('Veuillez sélectionner une réponse avant de soumettre.');
                return;
            }
            handleSubmitRadioChoice();
        }
    };

    const handleSubmitMultipleChoice = () => {
        const correctAnswers = currentQuestion.answers.filter(answer => answer.correct);
        const selectedAnswerIds = selectedAnswers.map(answer => answer.id);
        const correctSelected = correctAnswers.filter(answer => selectedAnswerIds.includes(answer.id));
        const incorrectSelected = selectedAnswers.filter(answer => !answer.correct);

        const point = currentQuestion.point / (correctAnswers.length || 1);

        if (correctAnswers.length === 0) {
            if (selectedAnswers.length === 0) {
                dispatch(updatePoints(test.id, currentQuestion.point));
            } else {
                dispatch(updatePoints(test.id, currentQuestion.point * -1));
            }
        } else {
            const totalPoints = correctSelected.length * point - incorrectSelected.length * point;
            dispatch(updatePoints(test.id, totalPoints));
        }

        setTimeout(nextQuestion, 0);
    };

    const handleSubmitRadioChoice = () => {
        const selectedAnswer = selectedAnswers[0];
        if (selectedAnswer.correct) {
            dispatch(updatePoints(test.id, currentQuestion.point));
        } else {
            dispatch(updatePoints(test.id, (currentQuestion.point / 2) * -1));
        }
        setTimeout(nextQuestion, 0);
    };

    // New handler for passing a question
    const handlePass = () => {
        nextQuestion();
    };

    return (
        <Box>
            <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>
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
                                    p: 2,
                                }}
                            >
                                <Typography variant="h6">{currentQuestion.question}</Typography>
                                <Box
                                    component="img"
                                    src={currentQuestion.image}
                                    alt="question"
                                    sx={{
                                        maxWidth: '400px',
                                        maxHeight: '300px',
                                        objectFit: 'contain'
                                    }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={6}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid container spacing={1}>
                                    {renderAnswers(currentQuestion, selectedAnswers, handleAnswer)}
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                    :
                    <Box sx={{ pt: 5 }}>
                        <Typography align='center' fontWeight={600}>
                            {currentQuestion.question}
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
                        mt: 2,
                        gap: 2, // Add spacing between buttons
                    }}
                >
                    {/* New Pass Button */}
                    <Button
                        variant="outlined"
                        color="red"
                        onClick={handlePass}
                        sx={{ width: '40%' , mr: 2 }}
                    >
                        Passer
                    </Button>

                    {/* Existing Submit/Next Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ width: '40%' }} 
                    >
                        {questionNbr === questionsLength - 1 ? 'Terminer' : 'Soumettre'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default TestPage;
