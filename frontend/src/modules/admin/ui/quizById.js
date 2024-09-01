import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Paper, Divider, TablePagination, IconButton, Checkbox, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Snackbar, Alert } from '@mui/material';
import DataByIdNotFound from '../../../common/errorPages/dataByIdNotFound';

//apis
import { getQuizById, getResultById, hasAccepted, setAccepted } from '../../../common/api/admin';

//helpers
import { parseEmailString } from '../../../common/utils/helpers';

//icons
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded';
import ReplyIcon from '@mui/icons-material/Reply';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoadingOverlay from '../../../common/components/loadingOverlay';

function QuizById() {
    const { id } = useParams();

    const [quiz, setQuiz] = useState();
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(0);
    const [success, setSuccess] = useState('');
    const [testDetails, setTestDetails] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [replyModalOpen, setReplyModalOpen] = useState(false);
    const [replyMessage, setReplyMessage] = useState({
        subject: '',
        response: '',
        candidateId: [],
        quizId: id ? id : null
    });
    const rowsPerPage = 7;

    const getResultsById = async () => {
        try {
            const ResultsData = await getResultById(id);

            const groupedResults = ResultsData.reduce((acc, result) => {
                const { candidateId } = result;

                if (!acc[candidateId]) {
                    acc[candidateId] = {
                        candidateId,
                        results: []
                    };
                }

                acc[candidateId].results.push(result);

                return acc;
            }, {});

            const candidates = Object.values(groupedResults);

            // Fetch the isAccepted status for each candidate
            const statuses = await Promise.all(
                candidates.map(async (candidate) => {
                    const accepted = await isAccepted(candidate.candidateId);
                    return {
                        ...candidate,
                        isAccepted: accepted
                    };
                })
            );

            setResults(statuses);
        
        } catch (error) {
            console.error("Failed to fetch Results:", error);
        }
    };

    const sendReply = async () => {
        setIsLoading(true);
        try {
            await setAccepted(replyMessage)
            getQuiz();
            getResultsById();
        } catch (error) {
            console.error("faild to send message : ", error)
        } finally {
            setIsLoading(false);
        }
    };

    const getQuiz = async () => {
        try {
            const QuizData = await getQuizById(id);
            setQuiz(QuizData);
            const tests = QuizData.quizTests.map(test => ({
                id: test.test.id,
                title: test.test.title,
                percentage: test.percentage
            }));
            setTestDetails(tests);
        } catch (error) {
            console.error("Failed to fetch Quiz:", error);
        }
    };

    const isAccepted = async (candId) => {
        try {
            return await hasAccepted(candId, id);
        } catch (error) {
            console.error("Failed to fetch status:", error);
        }
    };

    useEffect(() => {

        getQuiz();
        getResultsById();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleOpenReplyModal = (candidateId) => {
        setReplyMessage(prevState => ({
            ...prevState,
            candidateId: [...prevState.candidateId, candidateId],
        }));
        setReplyModalOpen(true);
    };

    const handleSendReply = async () => {
        sendReply();

        setReplyMessage({
            subject: '',
            response: '',
            candidateId: [],
        });
        setSuccess('Messages envoyés avec succès!');
        setReplyModalOpen(false);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = results
                .filter((candidate) => !candidate.isAccepted) // Filter out accepted candidates
                .map((candidate) => candidate.candidateId);   // Map remaining candidates to their IDs
            setSelectedRows(newSelecteds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleClick = (id) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1),
            );
        }

        setSelectedRows(newSelected);
    };

    const handleReplyAll = async () => {
        setReplyMessage(prevState => ({
            ...prevState,
            candidateId: selectedRows,
        }));

        setReplyModalOpen(true);
    };

    if (!quiz) return <DataByIdNotFound name='Quiz' />;


    return (
        <>
            {/* Loading Overlay */}
            <LoadingOverlay isLoading={isLoading} />
            <Box sx={{ p: '10px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5' fontWeight={500} color='primary'>
                        Classement
                    </Typography>
                </Box>
                {quiz &&
                    <Box component={Paper} sx={{ maxWidth: '100%', minHeight: '600px', my: 2, p: '15px 20px', borderRadius: 5, border: '1px solid rgba(0, 0, 0, 0.12)', bgcolor: '#fff' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Link to='/admin/Quiz'>
                                <IconButton aria-label="back">
                                    <ArrowBackIcon />
                                </IconButton>
                            </Link>
                            <Typography variant='h6' fontWeight={500} color='primary'>
                                {quiz.title}
                            </Typography>
                        </Box>
                        <Typography variant='div' fontWeight={500} color='secondary' gutterBottom>
                            Nombre de Tests: <Typography variant='span' color='textSecondary'>{quiz.quizTests.length}</Typography> |
                            Invitations Totales: <Typography variant='span' color='textSecondary'>{parseEmailString(quiz.emails).length}</Typography> |
                            Nombre passés : <Typography variant='span' color='textSecondary'>{quiz.candidates.length}</Typography>
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <TableContainer sx={{ maxWidth: '100%', my: 2, borderRadius: 5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant='h6' fontWeight={500} color='primary'>
                                    Résultats
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {selectedRows.length > 0 && (
                                        <>
                                            <Typography fontWeight={500} color='primary'>
                                                sélectionné : {selectedRows.length}
                                            </Typography>
                                            <IconButton sx={{ width: '45px', height: '45px' }} onClick={handleReplyAll} aria-label="delete">
                                                <MarkEmailReadRoundedIcon color='primary' />
                                            </IconButton>
                                        </>
                                    )}
                                    <TablePagination
                                        component="div"
                                        count={results.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        rowsPerPageOptions={[rowsPerPage]}
                                        labelDisplayedRows={({ from, to, count }) => `${from}–${to} sur ${count !== -1 ? count : `plus de ${to}`}`}
                                    />
                                </Box>
                            </Box>
                            <Table sx={{ border: '1px solid', borderColor: 'primary.main', borderRadius: '10px', overflow: 'hidden', boxShadow: 1 }}>
                                <TableHead sx={{ bgcolor: 'blue.light' }}>
                                    <TableRow>
                                        <TableCell sx={{ width: '42px', p: 0, pl: 2 }}>
                                            <Checkbox
                                                indeterminate={selectedRows.length > 0 && selectedRows.length < results.length}
                                                checked={results.length > 0 && selectedRows.length === results.length}
                                                onChange={handleSelectAllClick}
                                                inputProps={{ 'aria-label': 'Select all candidates' }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                        {quiz.quizTests.map((test) => (
                                            <TableCell sx={{ fontWeight: 600, textAlign: 'center' }} key={test.test.id}>{test.test.title}</TableCell>
                                        ))}
                                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Total</TableCell>
                                        <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                {results &&
                                    <TableBody>
                                        {results
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((candidate) => {
                                                const isItemSelected = selectedRows.includes(candidate.candidateId);
                                                const isAccepted = candidate.isAccepted;

                                                // Create a score map for easy access
                                                const scoreMap = candidate.results.reduce((map, result) => {
                                                    map[result.testId] = result.score;
                                                    return map;
                                                }, {});

                                                // Calculate the total score for the candidate
                                                const totalScore = testDetails.reduce((total, { id, percentage }) => {
                                                    const score = scoreMap[id] || 0;
                                                    return total + (score * percentage / 100);
                                                }, 0);

                                                return (
                                                    <TableRow key={candidate.candidateId} selected={isItemSelected}>
                                                        <TableCell sx={{ p: 0, pl: 2 }}>
                                                            <Checkbox
                                                                checked={isItemSelected || isAccepted}
                                                                disabled={isAccepted}
                                                                onChange={() => handleClick(candidate.candidateId)}
                                                                inputProps={{ 'aria-label': `select ${candidate.candidateId}` }}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ py: 0 }}>{candidate.candidateId}</TableCell>
                                                        {testDetails.map(({ id, title }) => (
                                                            <TableCell key={id} sx={{ py: 0, textAlign: 'center' }}>
                                                                {scoreMap[id] ? scoreMap[id] : 'N/A'}
                                                            </TableCell>
                                                        ))}
                                                        <TableCell sx={{ p: 0, textAlign: 'center' }}>{totalScore.toFixed(2)}</TableCell>
                                                        <TableCell sx={{ p: 0 }}>
                                                            <Box sx={{ textAlign: 'center' }}>
                                                                {isAccepted ? (
                                                                    <IconButton aria-label="accepted" disabled>
                                                                        <CheckBoxRoundedIcon color='green' />
                                                                    </IconButton>
                                                                ) : (
                                                                    <IconButton aria-label="Reply" onClick={() => handleOpenReplyModal(candidate.candidateId)}>
                                                                        <HourglassBottomRoundedIcon />
                                                                    </IconButton>
                                                                )}
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>

                                }
                            </Table>
                        </TableContainer>
                    </Box>
                }

                {/* Reply Modal */}
                <Dialog open={replyModalOpen} onClose={() => setReplyModalOpen(false)}>
                    <DialogTitle>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <ReplyIcon />
                            <Typography variant="h6">Répondre</Typography>
                        </Box>
                    </DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Sujet"
                            fullWidth
                            variant="outlined"
                            value={replyMessage.subject}
                            onChange={(e) => setReplyMessage({ ...replyMessage, subject: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            label="Message"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            value={replyMessage.response}
                            onChange={(e) => setReplyMessage({ ...replyMessage, response: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setReplyModalOpen(false)} color="primary">
                            Annuler
                        </Button>
                        <Button onClick={handleSendReply} color="primary">
                            Envoyer
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Success Snackbar */}
                <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={() => setSuccess('')} severity="success">
                        {success}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}

export default QuizById;
