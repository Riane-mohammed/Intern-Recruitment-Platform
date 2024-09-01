import { Box, Typography, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { getLatestQuiz, getResultById } from '../../../api/admin';
import { NavLink } from 'react-router-dom';

const CardInfo = ({ name, value }) => {
    return (
        <Card
            sx={{
                width: '100%',
                borderRadius: 3,
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
            }}>
            <CardContent sx={{ py: '2px !important', px: 1 }}>
                <Typography fontWeight={500} fontSize='16px'>{value}</Typography>
                <Typography variant='body2' fontWeight={500} color='textSecondary' fontSize='12px'>{name}</Typography>
            </CardContent>
        </Card>
    )
}

function LastQuizCard({ data }) {
    const [lastQuiz, setLastQuiz] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [results, setResults] = useState([]);
    const [candidatesScores, setCandidatesScores] = useState([]);
    const [topScore, setTopScore ]= useState(0);
    const [averageScore, setAverageScore ]= useState(0);
    const [numberOfPassed, setNumberOfPassed ]= useState(0);

    const getQuiz = async () => {
        try {
            const QuizData = await getLatestQuiz();
            setLastQuiz(QuizData);
            try {
                const ResultsData = await getResultById(QuizData.id);
                setResults(ResultsData);
                computeScores(QuizData, ResultsData);
            } catch (error) {
                console.error("Failed to fetch Results:", error);
            }
        } catch (error) {
            console.error("Failed to fetch Quiz:", error);
        }
    };

    const computeScores = (quizData, resultsData) => {
        const testScores = {};
        quizData.quizTests.forEach(test => {
            testScores[test.test.id] = {
                title: test.test.title,
                percentage: test.percentage,
                scores: []
            };
        });

        const candidates = {};
        resultsData.forEach(result => {
            if (!candidates[result.candidateId]) {
                candidates[result.candidateId] = {
                    email: result.candidateId,
                    scores: {},
                    globalScore: 0
                };
            }
            const testId = result.testId;
            if (!candidates[result.candidateId].scores[testId]) {
                candidates[result.candidateId].scores[testId] = 0;
            }
            candidates[result.candidateId].scores[testId] += result.score;
        });

        const computedCandidates = Object.keys(candidates).map(candidateId => {
            const candidate = candidates[candidateId];
            let globalScore = 0;
            Object.keys(candidate.scores).forEach(testId => {
                const score = candidate.scores[testId];
                const percentage = testScores[testId].percentage;
                globalScore += score * (percentage / 100);
            });
            candidate.globalScore = globalScore;
            return candidate;
        });

        setTopScore(computedCandidates.length > 0 ? Math.max(...computedCandidates.map(result => result.globalScore)) : 0);
        setAverageScore(computedCandidates.length > 0 ? (computedCandidates.reduce((sum, result) => sum + result.globalScore, 0) / computedCandidates.length).toFixed(2) : 0);
        setNumberOfPassed(computedCandidates.length);
        setCandidatesScores(computedCandidates.sort((a, b) => b.globalScore - a.globalScore).slice(0, 3));
    };

    useEffect(() => {
        getQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        <Box
            component={NavLink}
            to={`/admin/Quiz/id=${lastQuiz ? lastQuiz.id : 0}`}
            sx={{
                width: '100%',
                height: '100%',
                p: 2,
                borderRadius: 3,
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: '#F4F9F9',
                },
            }}>
            <Typography fontWeight={500} fontSize='16px' color='primary'>Dernier Quiz - {lastQuiz ? lastQuiz.title : 'Loading...'}</Typography>
            <Divider sx={{ my: 1 }} />
            <Grid container spacing={2} mt={1}>
                
                {/* Left side with individual cards */}
                <Grid item xs={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <CardInfo name="Nombre de Participants" value={numberOfPassed} />
                        </Grid>
                        <Grid item xs={12}>
                            <CardInfo name="Meilleur Score" value={topScore} />
                        </Grid>
                        <Grid item xs={12}>
                            <CardInfo name="Score Moyen" value={averageScore} />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={8}>
                    <Typography fontWeight={600} fontSize='16px' gutterBottom>Top 3 scores</Typography>
                    <TableContainer sx={{ maxHeight: 300, border: '1px solid', borderColor: 'primary.main', borderRadius: '10px', overflow: 'hidden', boxShadow: 1 }}>
                        <Table>
                            <TableHead sx={{ bgcolor: 'primary.main' }}>
                                <TableRow sx={{ bgcolor: 'primary.main' }}>
                                    <TableCell sx={{ fontWeight: 600, py: 1, color: 'white' }}>Email</TableCell>
                                    <TableCell sx={{ fontWeight: 600, py: 1, color: 'white' }}>Score</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {candidatesScores.map(candidate => (
                                    <TableRow key={candidate.email}>
                                        <TableCell sx={{ py: 0 }}>{candidate.email}</TableCell>
                                        <TableCell sx={{ py: 0 }}>{candidate.globalScore.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    );
}

export default LastQuizCard;
