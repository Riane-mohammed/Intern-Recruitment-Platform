import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Paper, Avatar, Divider, Button, Checkbox, MenuItem, ListItemText, Select } from '@mui/material';
import { styled } from '@mui/material/styles';

// Style personnalisé pour le tableau
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 500,
    color: theme.palette.text.primary,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    width: 40,
    height: 40,
    fontSize: 16,
}));

// Données des quizzes
const quizzes = [
    { id: 1, name: 'Quiz 1', numberOfTests: 3, totalInvitations: 20, passed: 15 },
    { id: 2, name: 'Quiz 2', numberOfTests: 4, totalInvitations: 25, passed: 18 },
    { id: 3, name: 'Quiz 3', numberOfTests: 5, totalInvitations: 30, passed: 22 },
    { id: 4, name: 'Quiz 4', numberOfTests: 3, totalInvitations: 28, passed: 20 },
    { id: 5, name: 'Quiz 5', numberOfTests: 4, totalInvitations: 32, passed: 25 },
    { id: 6, name: 'Quiz 6', numberOfTests: 5, totalInvitations: 40, passed: 28 },
    { id: 7, name: 'Quiz 7', numberOfTests: 3, totalInvitations: 22, passed: 18 },
    { id: 8, name: 'Quiz 8', numberOfTests: 4, totalInvitations: 27, passed: 19 },
    { id: 9, name: 'Quiz 9', numberOfTests: 5, totalInvitations: 35, passed: 26 },
    { id: 10, name: 'Quiz 10', numberOfTests: 3, totalInvitations: 25, passed: 20 },
    { id: 11, name: 'Quiz 11', numberOfTests: 4, totalInvitations: 30, passed: 22 },
    { id: 12, name: 'Quiz 12', numberOfTests: 5, totalInvitations: 38, passed: 27 },
    { id: 13, name: 'Quiz 13', numberOfTests: 3, totalInvitations: 24, passed: 21 },
    { id: 14, name: 'Quiz 14', numberOfTests: 4, totalInvitations: 29, passed: 23 },
    { id: 15, name: 'Quiz 15', numberOfTests: 5, totalInvitations: 33, passed: 26 },
    { id: 16, name: 'Quiz 16', numberOfTests: 3, totalInvitations: 20, passed: 17 },
    { id: 17, name: 'Quiz 17', numberOfTests: 4, totalInvitations: 26, passed: 19 },
    { id: 18, name: 'Quiz 18', numberOfTests: 5, totalInvitations: 31, passed: 24 },
    { id: 19, name: 'Quiz 19', numberOfTests: 3, totalInvitations: 22, passed: 20 },
    { id: 20, name: 'Quiz 20', numberOfTests: 5, totalInvitations: 30, passed: 22 }
];

// Données des candidats pour chaque quiz
const quizCandidates = {
    1: [
        { id: 1, name: 'John Doe', scores: { 1: 80, 2: 90, 3: 85 }, totalScore: 255 },
        { id: 2, name: 'Jane Smith', scores: { 1: 70, 2: 80, 3: 75 }, totalScore: 225 },
        { id: 3, name: 'Alice Johnson', scores: { 1: 90, 2: 85, 3: 80 }, totalScore: 255 },
        { id: 4, name: 'Bob Brown', scores: { 1: 60, 2: 70, 3: 65 }, totalScore: 195 },
        { id: 5, name: 'Emily Davis', scores: { 1: 85, 2: 90, 3: 80 }, totalScore: 255 }
    ],
    2: [
        { id: 6, name: 'Alice Johnson', scores: { 1: 85, 2: 95, 3: 80, 4: 90 }, totalScore: 350 },
        { id: 7, name: 'Bob Brown', scores: { 1: 75, 2: 85, 3: 70, 4: 80 }, totalScore: 310 },
        { id: 8, name: 'Charlie Wilson', scores: { 1: 80, 2: 85, 3: 80, 4: 85 }, totalScore: 330 },
        { id: 9, name: 'Diana Ross', scores: { 1: 90, 2: 80, 3: 75, 4: 80 }, totalScore: 325 },
        { id: 10, name: 'Eric Clapton', scores: { 1: 70, 2: 75, 3: 70, 4: 70 }, totalScore: 285 }
    ],
    3: [
        { id: 11, name: 'Frank Sinatra', scores: { 1: 78, 2: 82, 3: 88, 4: 90, 5: 85 }, totalScore: 423 },
        { id: 12, name: 'Grace Kelly', scores: { 1: 82, 2: 88, 3: 90, 4: 85, 5: 80 }, totalScore: 425 },
        { id: 13, name: 'Hugh Jackman', scores: { 1: 90, 2: 85, 3: 80, 4: 82, 5: 88 }, totalScore: 425 },
        { id: 14, name: 'Iris Murdoch', scores: { 1: 80, 2: 75, 3: 80, 4: 85, 5: 78 }, totalScore: 398 },
        { id: 15, name: 'Jackie Chan', scores: { 1: 70, 2: 75, 3: 70, 4: 80, 5: 65 }, totalScore: 360 }
    ],
    4: [
        { id: 16, name: 'Ken Rogers', scores: { 1: 82, 2: 85, 3: 78 }, totalScore: 245 },
        { id: 17, name: 'Linda Carter', scores: { 1: 75, 2: 80, 3: 70 }, totalScore: 225 },
        { id: 18, name: 'Michael Scott', scores: { 1: 88, 2: 90, 3: 85 }, totalScore: 263 },
        { id: 19, name: 'Nina Simone', scores: { 1: 70, 2: 75, 3: 80 }, totalScore: 225 },
        { id: 20, name: 'Oscar Isaac', scores: { 1: 85, 2: 80, 3: 90 }, totalScore: 255 }
    ],
    5: [
        { id: 21, name: 'Paul Rudd', scores: { 1: 77, 2: 85, 3: 82, 4: 88 }, totalScore: 332 },
        { id: 22, name: 'Quinn Fabray', scores: { 1: 82, 2: 90, 3: 88, 4: 85 }, totalScore: 345 },
        { id: 23, name: 'Rita Ora', scores: { 1: 90, 2: 85, 3: 80, 4: 90 }, totalScore: 345 },
        { id: 24, name: 'Sam Smith', scores: { 1: 80, 2: 70, 3: 85, 4: 75 }, totalScore: 310 },
        { id: 25, name: 'Tina Fey', scores: { 1: 75, 2: 85, 3: 80, 4: 85 }, totalScore: 325 }
    ],
    6: [
        { id: 26, name: 'Uma Thurman', scores: { 1: 85, 2: 80, 3: 78, 4: 90, 5: 88 }, totalScore: 421 },
        { id: 27, name: 'Vin Diesel', scores: { 1: 80, 2: 75, 3: 70, 4: 85, 5: 80 }, totalScore: 390 },
        { id: 28, name: 'Will Smith', scores: { 1: 90, 2: 85, 3: 80, 4: 82, 5: 88 }, totalScore: 425 },
        { id: 29, name: 'Xena Warrior', scores: { 1: 75, 2: 80, 3: 85, 4: 70, 5: 78 }, totalScore: 388 },
        { id: 30, name: 'Yara Shahidi', scores: { 1: 85, 2: 90, 3: 75, 4: 80, 5: 88 }, totalScore: 418 }
    ],
    7: [
        { id: 31, name: 'Zane Malik', scores: { 1: 80, 2: 75, 3: 85 }, totalScore: 240 },
        { id: 32, name: 'Ava Gardner', scores: { 1: 85, 2: 90, 3: 88 }, totalScore: 263 },
        { id: 33, name: 'Ben Affleck', scores: { 1: 70, 2: 75, 3: 80 }, totalScore: 225 },
        { id: 34, name: 'Claudia Cardinale', scores: { 1: 85, 2: 80, 3: 75 }, totalScore: 240 },
        { id: 35, name: 'David Bowie', scores: { 1: 90, 2: 85, 3: 80 }, totalScore: 255 }
    ],
    8: [
        { id: 36, name: 'Eva Mendes', scores: { 1: 85, 2: 90, 3: 75, 4: 88 }, totalScore: 338 },
        { id: 37, name: 'Frankie Muniz', scores: { 1: 78, 2: 85, 3: 90, 4: 75 }, totalScore: 328 },
        { id: 38, name: 'George Clooney', scores: { 1: 85, 2: 80, 3: 70, 4: 90 }, totalScore: 325 },
        { id: 39, name: 'Helen Mirren', scores: { 1: 90, 2: 75, 3: 80, 4: 85 }, totalScore: 330 },
        { id: 40, name: 'Ian Somerhalder', scores: { 1: 80, 2: 85, 3: 90, 4: 75 }, totalScore: 330 }
    ],
    9: [
        { id: 41, name: 'Jessica Alba', scores: { 1: 85, 2: 90, 3: 80, 4: 75, 5: 88 }, totalScore: 418 },
        { id: 42, name: 'Kurt Russell', scores: { 1: 75, 2: 85, 3: 80, 4: 85, 5: 70 }, totalScore: 395 },
        { id: 43, name: 'Lena Headey', scores: { 1: 90, 2: 85, 3: 75, 4: 80, 5: 85 }, totalScore: 415 },
        { id: 44, name: 'Mark Ruffalo', scores: { 1: 70, 2: 80, 3: 75, 4: 80, 5: 70 }, totalScore: 375 },
        { id: 45, name: 'Natalie Portman', scores: { 1: 85, 2: 90, 3: 85, 4: 80, 5: 85 }, totalScore: 425 }
    ],
    10: [
        { id: 46, name: 'Owen Wilson', scores: { 1: 80, 2: 85, 3: 75 }, totalScore: 240 },
        { id: 47, name: 'Penelope Cruz', scores: { 1: 70, 2: 80, 3: 75 }, totalScore: 225 },
        { id: 48, name: 'Quentin Tarantino', scores: { 1: 85, 2: 90, 3: 80 }, totalScore: 255 },
        { id: 49, name: 'Rachel Weisz', scores: { 1: 75, 2: 85, 3: 80 }, totalScore: 240 },
        { id: 50, name: 'Sofia Vergara', scores: { 1: 90, 2: 80, 3: 75 }, totalScore: 245 }
    ],
    11: [
        { id: 51, name: 'Tom Hardy', scores: { 1: 85, 2: 80, 3: 75, 4: 90 }, totalScore: 330 },
        { id: 52, name: 'Uma Thurman', scores: { 1: 70, 2: 85, 3: 80, 4: 85 }, totalScore: 320 },
        { id: 53, name: 'Vera Farmiga', scores: { 1: 80, 2: 90, 3: 75, 4: 85 }, totalScore: 330 },
        { id: 54, name: 'Will Ferrell', scores: { 1: 85, 2: 75, 3: 80, 4: 70 }, totalScore: 310 },
        { id: 55, name: 'Xander Cage', scores: { 1: 75, 2: 80, 3: 85, 4: 70 }, totalScore: 310 }
    ],
    12: [
        { id: 56, name: 'Yvonne Strahovski', scores: { 1: 85, 2: 90, 3: 80, 4: 75, 5: 88 }, totalScore: 418 },
        { id: 57, name: 'Zach Galifianakis', scores: { 1: 80, 2: 75, 3: 90, 4: 80, 5: 70 }, totalScore: 375 },
        { id: 58, name: 'Angelina Jolie', scores: { 1: 90, 2: 85, 3: 80, 4: 85, 5: 75 }, totalScore: 415 },
        { id: 59, name: 'Brad Pitt', scores: { 1: 70, 2: 80, 3: 75, 4: 85, 5: 70 }, totalScore: 370 },
        { id: 60, name: 'Chris Hemsworth', scores: { 1: 85, 2: 90, 3: 85, 4: 80, 5: 90 }, totalScore: 430 }
    ],
    13: [
        { id: 61, name: 'Dwayne Johnson', scores: { 1: 80, 2: 75, 3: 85 }, totalScore: 240 },
        { id: 62, name: 'Emily Blunt', scores: { 1: 85, 2: 90, 3: 80 }, totalScore: 255 },
        { id: 63, name: 'Felicia Day', scores: { 1: 70, 2: 75, 3: 80 }, totalScore: 225 },
        { id: 64, name: 'Gina Rodriguez', scores: { 1: 80, 2: 85, 3: 75 }, totalScore: 240 },
        { id: 65, name: 'Henry Cavill', scores: { 1: 85, 2: 90, 3: 80 }, totalScore: 255 }
    ],
    14: [
        { id: 66, name: 'Irene Adler', scores: { 1: 85, 2: 90, 3: 75, 4: 80 }, totalScore: 330 },
        { id: 67, name: 'Jack Black', scores: { 1: 75, 2: 85, 3: 80, 4: 70 }, totalScore: 310 },
        { id: 68, name: 'Kate Winslet', scores: { 1: 80, 2: 85, 3: 90, 4: 75 }, totalScore: 330 },
        { id: 69, name: 'Liam Neeson', scores: { 1: 90, 2: 80, 3: 75, 4: 85 }, totalScore: 330 },
        { id: 70, name: 'Meryl Streep', scores: { 1: 85, 2: 90, 3: 80, 4: 75 }, totalScore: 330 }
    ],
    15: [
        { id: 71, name: 'Nina Dobrev', scores: { 1: 80, 2: 75, 3: 85 }, totalScore: 240 },
        { id: 72, name: 'Oscar Isaac', scores: { 1: 85, 2: 90, 3: 80 }, totalScore: 255 },
        { id: 73, name: 'Peyton List', scores: { 1: 70, 2: 80, 3: 75 }, totalScore: 225 },
        { id: 74, name: 'Quinn Fabray', scores: { 1: 85, 2: 80, 3: 90 }, totalScore: 255 },
        { id: 75, name: 'Ryan Gosling', scores: { 1: 75, 2: 85, 3: 80 }, totalScore: 240 }
    ],
    16: [
        { id: 76, name: 'Sofia Vergara', scores: { 1: 85, 2: 80, 3: 75 }, totalScore: 240 },
        { id: 77, name: 'Tom Hiddleston', scores: { 1: 75, 2: 80, 3: 85 }, totalScore: 240 },
        { id: 78, name: 'Uzo Aduba', scores: { 1: 80, 2: 85, 3: 75 }, totalScore: 240 },
        { id: 79, name: 'Vanessa Hudgens', scores: { 1: 90, 2: 85, 3: 80 }, totalScore: 255 },
        { id: 80, name: 'Will Smith', scores: { 1: 85, 2: 80, 3: 75 }, totalScore: 240 }
    ],
    17: [
        { id: 81, name: 'Xena Warrior', scores: { 1: 85, 2: 90, 3: 75, 4: 80 }, totalScore: 330 },
        { id: 82, name: 'Yara Shahidi', scores: { 1: 75, 2: 85, 3: 80, 4: 90 }, totalScore: 330 },
        { id: 83, name: 'Zach Efron', scores: { 1: 80, 2: 75, 3: 85, 4: 70 }, totalScore: 310 },
        { id: 84, name: 'Angelina Jolie', scores: { 1: 85, 2: 80, 3: 90, 4: 75 }, totalScore: 330 },
        { id: 85, name: 'Brad Pitt', scores: { 1: 75, 2: 85, 3: 80, 4: 80 }, totalScore: 320 }
    ],
    18: [
        { id: 86, name: 'Chris Hemsworth', scores: { 1: 80, 2: 85, 3: 75, 4: 90, 5: 85 }, totalScore: 415 },
        { id: 87, name: 'Daisy Ridley', scores: { 1: 85, 2: 80, 3: 70, 4: 90, 5: 80 }, totalScore: 405 },
        { id: 88, name: 'Emily Blunt', scores: { 1: 75, 2: 85, 3: 80, 4: 75, 5: 70 }, totalScore: 385 },
        { id: 89, name: 'Felicity Jones', scores: { 1: 90, 2: 85, 3: 80, 4: 75, 5: 85 }, totalScore: 415 },
        { id: 90, name: 'Gina Rodriguez', scores: { 1: 85, 2: 80, 3: 75, 4: 70, 5: 85 }, totalScore: 395 }
    ],
    19: [
        { id: 91, name: 'Helen Mirren', scores: { 1: 80, 2: 75, 3: 85 }, totalScore: 240 },
        { id: 92, name: 'Ian Somerhalder', scores: { 1: 85, 2: 80, 3: 90 }, totalScore: 255 },
        { id: 93, name: 'Jared Leto', scores: { 1: 70, 2: 75, 3: 80 }, totalScore: 225 },
        { id: 94, name: 'Kristen Bell', scores: { 1: 85, 2: 90, 3: 75 }, totalScore: 250 },
        { id: 95, name: 'Lupita Nyong\'o', scores: { 1: 75, 2: 85, 3: 80 }, totalScore: 240 }
    ],
    20: [
        { id: 96, name: 'Maggie Smith', scores: { 1: 85, 2: 80, 3: 75, 4: 90, 5: 85 }, totalScore: 415 },
        { id: 97, name: 'Nicholas Hoult', scores: { 1: 75, 2: 85, 3: 80, 4: 70, 5: 80 }, totalScore: 390 },
        { id: 98, name: 'Olivia Wilde', scores: { 1: 85, 2: 80, 3: 75, 4: 90, 5: 85 }, totalScore: 415 },
        { id: 99, name: 'Paul Rudd', scores: { 1: 70, 2: 75, 3: 80, 4: 85, 5: 70 }, totalScore: 370 },
        { id: 100, name: 'Quentin Tarantino', scores: { 1: 80, 2: 90, 3: 85, 4: 75, 5: 80 }, totalScore: 410 }
    ]
};

function QuizById() {
    const { id } = useParams(); // Récupère l'ID du quiz depuis l'URL
    const quiz = quizzes.find(q => q.id === parseInt(id)); // Trouve le quiz par ID
    const candidates = quizCandidates[id] || []; // Charge les candidats pour ce quiz
    const [selectedCandidates, setSelectedCandidates] = useState([]);

    if (!quiz) return <Typography variant='h6'>Quiz non trouvé</Typography>;

    const handleSendEmail = () => {
        // Simule l'envoi d'un e-mail sans traitement réel
        alert(`E-mail envoyé aux candidats sélectionnés: ${selectedCandidates.join(', ')}`);
    };

    const handleSelectAll = () => {
        setSelectedCandidates(candidates.map(candidate => candidate.name));
    };

    const handleSelectCandidate = (candidateName) => {
        setSelectedCandidates(prevState =>
            prevState.includes(candidateName)
                ? prevState.filter(name => name !== candidateName)
                : [...prevState, candidateName]
        );
    };

    return (
        <Box sx={{ p: '20px', bgcolor: '#f5f5f5' }}>
            <Typography variant='h4' fontWeight={700} color='primary' gutterBottom>
                {quiz.name}
            </Typography>
            <Typography variant='h6' color='textSecondary' gutterBottom>
                Nombre de Tests: {quiz.numberOfTests} | Invitations Totales: {quiz.totalInvitations} | Réussites: {quiz.passed}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant='h5' fontWeight={700} color='primary' gutterBottom>
                Leaderboard
            </Typography>
            <Box sx={{ mb: 2 }}>
                <Select
                    multiple
                    value={selectedCandidates}
                    onChange={(event) => setSelectedCandidates(event.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    sx={{ mb: 2 }}
                >
                    {candidates.map((candidate) => (
                        <MenuItem key={candidate.id} value={candidate.name}>
                            <Checkbox checked={selectedCandidates.includes(candidate.name)} />
                            <ListItemText primary={candidate.name} />
                        </MenuItem>
                    ))}
                </Select>
                <Button onClick={handleSelectAll} variant="contained" color="primary" sx={{ mr: 2 }}>
                    Sélectionner Tout
                </Button>
                <Button onClick={handleSendEmail} variant="contained" color="secondary">
                    Envoyer E-mail
                </Button>
            </Box>
            <Typography variant='h6' fontWeight={700} color='primary'>
                Candidats
            </Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label='candidates table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            {Object.keys(candidates[0]?.scores || {}).map((testId) => (
                                <TableCell key={testId}>Test {testId}</TableCell>
                            ))}
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {candidates.map((candidate) => (
                            <TableRow key={candidate.id}>
                                <TableCell>{candidate.name}</TableCell>
                                {Object.keys(candidate.scores).map((testId) => (
                                    <TableCell key={testId}>{candidate.scores[testId]}</TableCell>
                                ))}
                                <TableCell>{candidate.totalScore}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default QuizById;
