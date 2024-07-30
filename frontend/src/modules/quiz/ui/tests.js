import { Box } from '@mui/material'
import { useSelector } from 'react-redux';
import { useState } from 'react';

//Components
import HomeTest from '../../../common/components/quizComponents/tests/homeTest';
import TestPage from '../../../common/components/quizComponents/tests/testPage';
import ProgressBar from '../../../common/components/bars/progressBar'
import AlertModal from '../../../common/components/quizComponents/tests/alertModal';

//icons
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

//data
const quiz = [
    {
        "id": "quiz-1",
        "title": "Mathématiques",
        "questions": [
            {
                "id": "q1",
                "questionText": "Quelle est la valeur de pi (approximativement) ?",
                "answers": [
                    {
                        "id": "a1",
                        "answerText": "3.14",
                        "isCorrect": true
                    },
                    {
                        "id": "a2",
                        "answerText": "2.17",
                        "isCorrect": false
                    },
                    {
                        "id": "a3",
                        "answerText": "3.00",
                        "isCorrect": false
                    },
                    {
                        "id": "a4",
                        "answerText": "3.15",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q2",
                "questionText": "Combien font 8 x 7 ?",
                "answers": [
                    {
                        "id": "a5",
                        "answerText": "56",
                        "isCorrect": true
                    },
                    {
                        "id": "a6",
                        "answerText": "54",
                        "isCorrect": false
                    },
                    {
                        "id": "a7",
                        "answerText": "58",
                        "isCorrect": false
                    },
                    {
                        "id": "a8",
                        "answerText": "60",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q3",
                "questionText": "Quelle est la racine carrée de 64 ?",
                "answers": [
                    {
                        "id": "a9",
                        "answerText": "8",
                        "isCorrect": true
                    },
                    {
                        "id": "a10",
                        "answerText": "7",
                        "isCorrect": false
                    },
                    {
                        "id": "a11",
                        "answerText": "9",
                        "isCorrect": false
                    },
                    {
                        "id": "a12",
                        "answerText": "6",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q4",
                "questionText": "Quelle est la formule de l'aire d'un cercle ?",
                "answers": [
                    {
                        "id": "a13",
                        "answerText": "πr²",
                        "isCorrect": true
                    },
                    {
                        "id": "a14",
                        "answerText": "2πr",
                        "isCorrect": false
                    },
                    {
                        "id": "a15",
                        "answerText": "πd",
                        "isCorrect": false
                    },
                    {
                        "id": "a16",
                        "answerText": "πr",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q5",
                "questionText": "Quelle est la somme des angles d'un triangle ?",
                "answers": [
                    {
                        "id": "a17",
                        "answerText": "180 degrés",
                        "isCorrect": true
                    },
                    {
                        "id": "a18",
                        "answerText": "360 degrés",
                        "isCorrect": false
                    },
                    {
                        "id": "a19",
                        "answerText": "90 degrés",
                        "isCorrect": false
                    },
                    {
                        "id": "a20",
                        "answerText": "270 degrés",
                        "isCorrect": false
                    }
                ]
            }
        ]
    },
    {
        "id": "quiz-2",
        "title": "Géographie",
        "questions": [
            {
                "id": "q6",
                "questionText": "Quelle est la capitale de la France ?",
                "answers": [
                    {
                        "id": "a21",
                        "answerText": "Paris",
                        "isCorrect": true
                    },
                    {
                        "id": "a22",
                        "answerText": "Lyon",
                        "isCorrect": false
                    },
                    {
                        "id": "a23",
                        "answerText": "Marseille",
                        "isCorrect": false
                    },
                    {
                        "id": "a24",
                        "answerText": "Toulouse",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q7",
                "questionText": "Quel est le plus grand désert du monde ?",
                "answers": [
                    {
                        "id": "a25",
                        "answerText": "Sahara",
                        "isCorrect": true
                    },
                    {
                        "id": "a26",
                        "answerText": "Gobi",
                        "isCorrect": false
                    },
                    {
                        "id": "a27",
                        "answerText": "Désert d'Arabie",
                        "isCorrect": false
                    },
                    {
                        "id": "a28",
                        "answerText": "Antarctique",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q8",
                "questionText": "Quel est le plus long fleuve du monde ?",
                "answers": [
                    {
                        "id": "a29",
                        "answerText": "Nil",
                        "isCorrect": true
                    },
                    {
                        "id": "a30",
                        "answerText": "Amazon",
                        "isCorrect": false
                    },
                    {
                        "id": "a31",
                        "answerText": "Yangtsé",
                        "isCorrect": false
                    },
                    {
                        "id": "a32",
                        "answerText": "Mississippi",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q9",
                "questionText": "Combien y a-t-il de continents sur Terre ?",
                "answers": [
                    {
                        "id": "a33",
                        "answerText": "7",
                        "isCorrect": true
                    },
                    {
                        "id": "a34",
                        "answerText": "6",
                        "isCorrect": false
                    },
                    {
                        "id": "a35",
                        "answerText": "8",
                        "isCorrect": false
                    },
                    {
                        "id": "a36",
                        "answerText": "5",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q10",
                "questionText": "Quel océan borde la côte ouest des États-Unis ?",
                "answers": [
                    {
                        "id": "a37",
                        "answerText": "Océan Pacifique",
                        "isCorrect": true
                    },
                    {
                        "id": "a38",
                        "answerText": "Océan Atlantique",
                        "isCorrect": false
                    },
                    {
                        "id": "a39",
                        "answerText": "Océan Indien",
                        "isCorrect": false
                    },
                    {
                        "id": "a40",
                        "answerText": "Océan Arctique",
                        "isCorrect": false
                    }
                ]
            }
        ]
    },
    {
        "id": "quiz-3",
        "title": "Histoire",
        "questions": [
            {
                "id": "q11",
                "questionText": "En quelle année la Première Guerre mondiale a-t-elle commencé ?",
                "answers": [
                    {
                        "id": "a41",
                        "answerText": "1914",
                        "isCorrect": true
                    },
                    {
                        "id": "a42",
                        "answerText": "1918",
                        "isCorrect": false
                    },
                    {
                        "id": "a43",
                        "answerText": "1939",
                        "isCorrect": false
                    },
                    {
                        "id": "a44",
                        "answerText": "1905",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q12",
                "questionText": "Qui a été le premier président des États-Unis ?",
                "answers": [
                    {
                        "id": "a45",
                        "answerText": "George Washington",
                        "isCorrect": true
                    },
                    {
                        "id": "a46",
                        "answerText": "Abraham Lincoln",
                        "isCorrect": false
                    },
                    {
                        "id": "a47",
                        "answerText": "Thomas Jefferson",
                        "isCorrect": false
                    },
                    {
                        "id": "a48",
                        "answerText": "John Adams",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q13",
                "questionText": "En quelle année la Révolution française a-t-elle commencé ?",
                "answers": [
                    {
                        "id": "a49",
                        "answerText": "1789",
                        "isCorrect": true
                    },
                    {
                        "id": "a50",
                        "answerText": "1799",
                        "isCorrect": false
                    },
                    {
                        "id": "a51",
                        "answerText": "1804",
                        "isCorrect": false
                    },
                    {
                        "id": "a52",
                        "answerText": "1776",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q14",
                "questionText": "Qui a découvert l'Amérique en 1492 ?",
                "answers": [
                    {
                        "id": "a53",
                        "answerText": "Christophe Colomb",
                        "isCorrect": true
                    },
                    {
                        "id": "a54",
                        "answerText": "Marco Polo",
                        "isCorrect": false
                    },
                    {
                        "id": "a55",
                        "answerText": "Vasco de Gama",
                        "isCorrect": false
                    },
                    {
                        "id": "a56",
                        "answerText": "Ferdinand Magellan",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q15",
                "questionText": "Quel mur est tombé en 1989, marquant la fin de la Guerre froide ?",
                "answers": [
                    {
                        "id": "a57",
                        "answerText": "Mur de Berlin",
                        "isCorrect": true
                    },
                    {
                        "id": "a58",
                        "answerText": "Mur de la paix",
                        "isCorrect": false
                    },
                    {
                        "id": "a59",
                        "answerText": "Mur de l'Atlantique",
                        "isCorrect": false
                    },
                    {
                        "id": "a60",
                        "answerText": "Mur de la honte",
                        "isCorrect": false
                    }
                ]
            }
        ]
    }
];





function QuizTests() {
    const alertMessage = "Si vous quittez cette page, vous serez automatiquement disqualifié.";

    const currentPage = useSelector(state => state.candidate.currentPage);
    const isStarted = useSelector(state => state.candidate.isStarted);

    const [open, setOpen] = useState(true);
    const currentTest = quiz[currentPage - 1];
    
    const testNames = quiz.map(q => q.title);

    const handleClose = () => setOpen(false);
    
    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         event.preventDefault();
    //         event.returnValue = 'Are you sure you want to leave this page?';
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };

    // }, []);

    return (
        <Box
            component='div'
            sx={{
                width: '85vw',
                height: '80vh',
            }}
        >
            <ProgressBar currentPageNumber={currentPage} pageNames={testNames} />
            <Box
                sx={{
                    bgcolor: 'white',
                    border: '1px solid rgba(0, 0, 0, 0.12)',
                    borderRadius: 5,
                    minHeight: '70vh',
                    boxShadow: 2,
                    p: "10px"
                }}
            >
                {!isStarted && <HomeTest title={currentTest.title} time={currentTest.questions.length * 20} numberOfQuestions={currentTest.questions.length} /> }
                {isStarted && <TestPage test={currentTest} time={currentTest.questions.length * 20} quizLength={testNames.length} />  }
                <AlertModal
                    open={open}
                    handleClose={handleClose}
                    title="Attention"
                    color='red.main'
                    icon={<ReportProblemIcon color='red' sx={{ mr: 1 }} />}
                    message={alertMessage}
                />
            </Box>
        </Box>
    );
}

export default QuizTests;
