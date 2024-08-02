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
        "id": "1",
        "title": "Science",
        "questions": [
            {
                "id": "q1",
                "questionText": "What is the boiling point of water?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a1",
                        "answerText": "100°C",
                        "isCorrect": true
                    },
                    {
                        "id": "a2",
                        "answerText": "90°C",
                        "isCorrect": false
                    },
                    {
                        "id": "a3",
                        "answerText": "110°C",
                        "isCorrect": false
                    },
                    {
                        "id": "a4",
                        "answerText": "120°C",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q2",
                "questionText": "Which of the following are planets in our solar system?",
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a5",
                        "answerText": "Earth",
                        "isCorrect": true
                    },
                    {
                        "id": "a6",
                        "answerText": "Mars",
                        "isCorrect": true
                    },
                    {
                        "id": "a7",
                        "answerText": "Pluto",
                        "isCorrect": true
                    },
                    {
                        "id": "a8",
                        "answerText": "Moon",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q3",
                "questionText": "The Earth is flat.",
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a9",
                        "answerText": "Vraie",
                        "isCorrect": false
                    },
                    {
                        "id": "a10",
                        "answerText": "Faux",
                        "isCorrect": true
                    }
                ]
            },
            {
                "id": "q4",
                "questionText": "Which element has the chemical symbol 'O'?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a11",
                        "answerText": "Oxygen",
                        "isCorrect": true
                    },
                    {
                        "id": "a12",
                        "answerText": "Gold",
                        "isCorrect": false
                    },
                    {
                        "id": "a13",
                        "answerText": "Silver",
                        "isCorrect": false
                    },
                    {
                        "id": "a14",
                        "answerText": "Osmium",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q5",
                "questionText": "Which of the following are types of energy?",
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a15",
                        "answerText": "Kinetic",
                        "isCorrect": true
                    },
                    {
                        "id": "a16",
                        "answerText": "Potential",
                        "isCorrect": true
                    },
                    {
                        "id": "a17",
                        "answerText": "Thermal",
                        "isCorrect": true
                    },
                    {
                        "id": "a18",
                        "answerText": "Elastic",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q6",
                "questionText": "Sound travels faster in water than in air.",
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a19",
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a20",
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q7",
                "questionText": "What is the main gas found in the air we breathe?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a21",
                        "answerText": "Nitrogen",
                        "isCorrect": true
                    },
                    {
                        "id": "a22",
                        "answerText": "Oxygen",
                        "isCorrect": false
                    },
                    {
                        "id": "a23",
                        "answerText": "Carbon Dioxide",
                        "isCorrect": false
                    },
                    {
                        "id": "a24",
                        "answerText": "Hydrogen",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q8",
                "questionText": "Which of the following are states of matter?",
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a25",
                        "answerText": "Solid",
                        "isCorrect": true
                    },
                    {
                        "id": "a26",
                        "answerText": "Liquid",
                        "isCorrect": true
                    },
                    {
                        "id": "a27",
                        "answerText": "Gas",
                        "isCorrect": true
                    },
                    {
                        "id": "a28",
                        "answerText": "Plasma",
                        "isCorrect": true
                    }
                ]
            },
            {
                "id": "q9",
                "questionText": "Which planet is known as the Red Planet?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a29",
                        "answerText": "Mars",
                        "isCorrect": true
                    },
                    {
                        "id": "a30",
                        "answerText": "Jupiter",
                        "isCorrect": false
                    },
                    {
                        "id": "a31",
                        "answerText": "Saturn",
                        "isCorrect": false
                    },
                    {
                        "id": "a32",
                        "answerText": "Venus",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q10",
                "questionText": "Is photosynthesis a process used by plants to convert sunlight into food?",
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a33",
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a34",
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]
            }
        ]
    },
    {
        "id": "2",
        "title": "History",
        "questions": [
            {
                "id": "q11",
                "questionText": "Who was the first President of the United States?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a35",
                        "answerText": "George Washington",
                        "isCorrect": true
                    },
                    {
                        "id": "a36",
                        "answerText": "Thomas Jefferson",
                        "isCorrect": false
                    },
                    {
                        "id": "a37",
                        "answerText": "John Adams",
                        "isCorrect": false
                    },
                    {
                        "id": "a38",
                        "answerText": "Abraham Lincoln",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q12",
                "questionText": "Which of the following were causes of World War I?",
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a39",
                        "answerText": "Assassination of Archduke Franz Ferdinand",
                        "isCorrect": true
                    },
                    {
                        "id": "a40",
                        "answerText": "Rise of fascism",
                        "isCorrect": false
                    },
                    {
                        "id": "a41",
                        "answerText": "Militarism",
                        "isCorrect": true
                    },
                    {
                        "id": "a42",
                        "answerText": "Formation of alliances",
                        "isCorrect": true
                    }
                ]
            },
            {
                "id": "q13",
                "questionText": "The Berlin Wall fell in 1989.",
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a43",
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a44",
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q14",
                "questionText": "In which year did the American Civil War begin?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a45",
                        "answerText": "1861",
                        "isCorrect": true
                    },
                    {
                        "id": "a46",
                        "answerText": "1776",
                        "isCorrect": false
                    },
                    {
                        "id": "a47",
                        "answerText": "1812",
                        "isCorrect": false
                    },
                    {
                        "id": "a48",
                        "answerText": "1865",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q15",
                "questionText": "Which of the following were ancient civilizations?",
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a49",
                        "answerText": "Egyptians",
                        "isCorrect": true
                    },
                    {
                        "id": "a50",
                        "answerText": "Romans",
                        "isCorrect": true
                    },
                    {
                        "id": "a51",
                        "answerText": "Aztecs",
                        "isCorrect": true
                    },
                    {
                        "id": "a52",
                        "answerText": "Vikings",
                        "isCorrect": true
                    }
                ]
            },
            {
                "id": "q16",
                "questionText": "The Great Wall of China was built to protect against invasions from the north.",
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a53",
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a54",
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q17",
                "questionText": "Who was the first female Prime Minister of the United Kingdom?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a55",
                        "answerText": "Margaret Thatcher",
                        "isCorrect": true
                    },
                    {
                        "id": "a56",
                        "answerText": "Theresa May",
                        "isCorrect": false
                    },
                    {
                        "id": "a57",
                        "answerText": "Angela Merkel",
                        "isCorrect": false
                    },
                    {
                        "id": "a58",
                        "answerText": "Indira Gandhi",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q18",
                "questionText": "Which of the following events are associated with World War II?",
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a59",
                        "answerText": "D-Day",
                        "isCorrect": true
                    },
                    {
                        "id": "a60",
                        "answerText": "Pearl Harbor",
                        "isCorrect": true
                    },
                    {
                        "id": "a61",
                        "answerText": "Treaty of Versailles",
                        "isCorrect": false
                    },
                    {
                        "id": "a62",
                        "answerText": "Battle of Midway",
                        "isCorrect": true
                    }
                ]
            },
            {
                "id": "q19",
                "questionText": "The Roman Empire was primarily based around the Mediterranean Sea.",
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a63",
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a64",
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q20",
                "questionText": "Who discovered America in 1492?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a65",
                        "answerText": "Christopher Columbus",
                        "isCorrect": true
                    },
                    {
                        "id": "a66",
                        "answerText": "Leif Erikson",
                        "isCorrect": false
                    },
                    {
                        "id": "a67",
                        "answerText": "Amerigo Vespucci",
                        "isCorrect": false
                    },
                    {
                        "id": "a68",
                        "answerText": "Marco Polo",
                        "isCorrect": false
                    }
                ]
            }
        ]
    },
    {
        "id": "3",
        "title": "Geography",
        "questions": [
            {
                "id": "q21",
                "questionText": "What is the capital of France?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a69",
                        "answerText": "Paris",
                        "isCorrect": true
                    },
                    {
                        "id": "a70",
                        "answerText": "Lyon",
                        "isCorrect": false
                    },
                    {
                        "id": "a71",
                        "answerText": "Marseille",
                        "isCorrect": false
                    },
                    {
                        "id": "a72",
                        "answerText": "Nice",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q22",
                "questionText": "Which of the following are continents?",
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a73",
                        "answerText": "Asia",
                        "isCorrect": true
                    },
                    {
                        "id": "a74",
                        "answerText": "Africa",
                        "isCorrect": true
                    },
                    {
                        "id": "a75",
                        "answerText": "Europe",
                        "isCorrect": true
                    },
                    {
                        "id": "a76",
                        "answerText": "Greenland",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q23",
                "questionText": "The Sahara Desert is located in Africa.",
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a77",
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a78",
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q24",
                "questionText": "Which is the largest ocean on Earth?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a79",
                        "answerText": "Pacific Ocean",
                        "isCorrect": true
                    },
                    {
                        "id": "a80",
                        "answerText": "Atlantic Ocean",
                        "isCorrect": false
                    },
                    {
                        "id": "a81",
                        "answerText": "Indian Ocean",
                        "isCorrect": false
                    },
                    {
                        "id": "a82",
                        "answerText": "Arctic Ocean",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q25",
                "questionText": "Which of the following countries are in South America?",
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a83",
                        "answerText": "Brazil",
                        "isCorrect": true
                    },
                    {
                        "id": "a84",
                        "answerText": "Argentina",
                        "isCorrect": true
                    },
                    {
                        "id": "a85",
                        "answerText": "Chile",
                        "isCorrect": true
                    },
                    {
                        "id": "a86",
                        "answerText": "Mexico",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q26",
                "questionText": "Mount Everest is the highest mountain in the world.",
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a87",
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a88",
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q27",
                "questionText": "Which river is the longest in the world?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a89",
                        "answerText": "Nile",
                        "isCorrect": true
                    },
                    {
                        "id": "a90",
                        "answerText": "Amazon",
                        "isCorrect": false
                    },
                    {
                        "id": "a91",
                        "answerText": "Yangtze",
                        "isCorrect": false
                    },
                    {
                        "id": "a92",
                        "answerText": "Mississippi",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q28",
                "questionText": "Which of the following are island nations?",
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a93",
                        "answerText": "Japan",
                        "isCorrect": true
                    },
                    {
                        "id": "a94",
                        "answerText": "Madagascar",
                        "isCorrect": true
                    },
                    {
                        "id": "a95",
                        "answerText": "United Kingdom",
                        "isCorrect": true
                    },
                    {
                        "id": "a96",
                        "answerText": "Brazil",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q29",
                "questionText": "Which country is the largest by land area?",
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a97",
                        "answerText": "Russia",
                        "isCorrect": true
                    },
                    {
                        "id": "a98",
                        "answerText": "Canada",
                        "isCorrect": false
                    },
                    {
                        "id": "a99",
                        "answerText": "China",
                        "isCorrect": false
                    },
                    {
                        "id": "a100",
                        "answerText": "United States",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q30",
                "questionText": "The Great Barrier Reef is located in Australia.",
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a101",
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a102",
                        "answerText": "Faux",
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
