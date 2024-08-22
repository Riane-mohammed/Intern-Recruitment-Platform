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

import answer from '../../../assets/images/questions/qst.png';

import qst from '../../../assets/images/questions/qst.png';

//data
const quiz = [
    {
        "id": "1",
        "title": "Science",
        "questions": [
            {
                "id": "q1",
                "questionText": "Quelle est la différence entre == et === en JavaScript ?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a1",
                        "image": answer,
                        "answerText": "100°C",
                        "isCorrect": true
                    },
                    {
                        "id": "a2",
                        "image": answer,
                        "answerText": "90°C",
                        "isCorrect": false
                    },
                    {
                        "id": "a3",
                        "image": answer,
                        "answerText": "110°C",
                        "isCorrect": false
                    },
                    {
                        "id": "a4",
                        "image": answer,
                        "answerText": "120°C",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q2",
                "questionText": "Which of the following are planets in our solar system?",
                "point" : 1,
                "image": null,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a5",
                        "image": answer,
                        "answerText": "Earth",
                        "isCorrect": true
                    },
                    {
                        "id": "a6",
                        "image": answer,
                        "answerText": "Mars",
                        "isCorrect": true
                    },
                    {
                        "id": "a7",
                        "image": answer,
                        "answerText": "Pluto",
                        "isCorrect": true
                    },
                    {
                        "id": "a8",
                        "image": answer,
                        "answerText": "Moon",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q3",
                "questionText": "The Earth is flat.",
                "point" : 1,
                "image": qst,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a9",
                        "image": answer,
                        "answerText": "Vraie",
                        "isCorrect": false
                    },
                    {
                        "id": "a10",
                        "image": answer,
                        "answerText": "Faux",
                        "isCorrect": true
                    }
                ]},

            {
                "id": "q4",
                "questionText": "Which element has the chemical symbol 'O'?",
                "point" : 1,
                "image": null,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a11",
                        "image": answer,
                        "answerText": "Oxygen",
                        "isCorrect": true
                    },
                    {
                        "id": "a12",
                        "image": answer,
                        "answerText": "Gold",
                        "isCorrect": false
                    },
                    {
                        "id": "a13",
                        "image": answer,
                        "answerText": "Silver",
                        "isCorrect": false
                    },
                    {
                        "id": "a14",
                        "image": answer,
                        "answerText": "Osmium",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q5",
                "questionText": "Which of the following are types of energy?",
                "point" : 1,
                "image": qst,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a15",
                        "image": answer,
                        "answerText": "Kinetic",
                        "isCorrect": true
                    },
                    {
                        "id": "a16",
                        "image": answer,
                        "answerText": "Potential",
                        "isCorrect": true
                    },
                    {
                        "id": "a17",
                        "image": answer,
                        "answerText": "Thermal",
                        "isCorrect": true
                    },
                    {
                        "id": "a18",
                        "image": answer,
                        "answerText": "Elastic",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q6",
                "questionText": "Sound travels faster in water than in air.",
                "point" : 1,
                "image": null,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a19",
                        "image": answer,
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a20",
                        "image": answer,
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]},

            {
                
                "id": "q7",
                "questionText": "What is the main gas found in the air we breathe?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a21",
                        "image": answer,
                        "answerText": "Nitrogen",
                        "isCorrect": true
                    },
                    {
                        "id": "a22",
                        "image": answer,
                        "answerText": "Oxygen",
                        "isCorrect": false
                    },
                    {
                        "id": "a23",
                        "image": answer,
                        "answerText": "Carbon Dioxide",
                        "isCorrect": false
                    },
                    {
                        "id": "a24",
                        "image": answer,
                        "answerText": "Hydrogen",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q8",
                "questionText": "Which of the following are states of matter?",
                "point" : 1,
                "image": qst,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a25",
                        "image": answer,
                        "answerText": "Solid",
                        "isCorrect": true
                    },
                    {
                        "id": "a26",
                        "image": answer,
                        "answerText": "Liquid",
                        "isCorrect": true
                    },
                    {
                        "id": "a27",
                        "image": answer,
                        "answerText": "Gas",
                        "isCorrect": true
                    },
                    {
                        "id": "a28",
                        "image": answer,
                        "answerText": "Plasma",
                        "isCorrect": true
                    }
                ]
            },
            {
                "id": "q9",
                "questionText": "Which planet is known as the Red Planet?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a29",
                        "image": answer,
                        "answerText": "Mars",
                        "isCorrect": true
                    },
                    {
                        "id": "a30",
                        "image": answer,
                        "answerText": "Jupiter",
                        "isCorrect": false
                    },
                    {
                        "id": "a31",
                        "image": answer,
                        "answerText": "Saturn",
                        "isCorrect": false
                    },
                    {
                        "id": "a32",
                        "image": answer,
                        "answerText": "Venus",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q10",
                "questionText": "Is photosynthesis a process used by plants to convert sunlight into food?",
                "point" : 1,
                "image": qst,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a33",
                        "image": answer,
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a34",
                        "image": answer,
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]}]
        
    },
    {
        "id": "2",
        "title": "History",
        "image": answer,
        "questions": [
            {
                "id": "q11",
                "questionText": "Who was the first President of the United States?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a35",
                        "image": answer,
                        "answerText": "George Washington",
                        "isCorrect": true
                    },
                    {
                        "id": "a36",
                        "image": answer,
                        "answerText": "Thomas Jefferson",
                        "isCorrect": false
                    },
                    {
                        "id": "a37",
                        "image": answer,
                        "answerText": "John Adams",
                        "isCorrect": false
                    },
                    {
                        "id": "a38",
                        "image": answer,
                        "answerText": "Abraham Lincoln",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q12",
                "questionText": "Which of the following were causes of World War I?",
                "point" : 1,
                "image": qst,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a39",
                        "image": answer,
                        "answerText": "Assassination of Archduke Franz Ferdinand",
                        "isCorrect": true
                    },
                    {
                        "id": "a40",
                        "image": answer,
                        "answerText": "Rise of fascism",
                        "isCorrect": false
                    },
                    {
                        "id": "a41",
                        "image": answer,
                        "answerText": "Militarism",
                        "isCorrect": true
                    },
                    {
                        "id": "a42",
                        "image": answer,
                        "answerText": "Formation of alliances",
                        "isCorrect": true
                    }
                ]
            },
            {
                "id": "q13",
                "questionText": "The Berlin Wall fell in 1989.",
                "point" : 1,
                "image": qst,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a43",
                        "image": answer,
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a44",
                        "image": answer,
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]},

            {
                
                "id": "q14",
                "questionText": "In which year did the American Civil War begin?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a45",
                        "image": answer,
                        "answerText": "1861",
                        "isCorrect": true
                    },
                    {
                        "id": "a46",
                        "image": answer,
                        "answerText": "1776",
                        "isCorrect": false
                    },
                    {
                        "id": "a47",
                        "image": answer,
                        "answerText": "1812",
                        "isCorrect": false
                    },
                    {
                        "id": "a48",
                        "image": answer,
                        "answerText": "1865",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q15",
                "questionText": "Which of the following were ancient civilizations?",
                "point" : 1,
                "image": qst,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a49",
                        "image": answer,
                        "answerText": "Egyptians",
                        "isCorrect": true
                    },
                    {
                        "id": "a50",
                        "image": answer,
                        "answerText": "Romans",
                        "isCorrect": true
                    },
                    {
                        "id": "a51",
                        "image": answer,
                        "answerText": "Aztecs",
                        "isCorrect": true
                    },
                    {
                        "id": "a52",
                        "image": answer,
                        "answerText": "Vikings",
                        "isCorrect": true
                    }
                ]
            },
            {
                "id": "q16",
                "questionText": "The Great Wall of China was built to protect against invasions from the north.",
                "point" : 1,
                "image": qst,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a53",
                        "image": answer,
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a54",
                        "image": answer,
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]},

            {
                
                "id": "q17",
                "questionText": "Who was the first female Prime Minister of the United Kingdom?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a55",
                        "image": answer,
                        "answerText": "Margaret Thatcher",
                        "isCorrect": true
                    },
                    {
                        "id": "a56",
                        "image": answer,
                        "answerText": "Theresa May",
                        "isCorrect": false
                    },
                    {
                        "id": "a57",
                        "image": answer,
                        "answerText": "Angela Merkel",
                        "isCorrect": false
                    },
                    {
                        "id": "a58",
                        "image": answer,
                        "answerText": "Indira Gandhi",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q18",
                "questionText": "Which of the following events are associated with World War II?",
                "point" : 1,
                "image": qst,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a59",
                        "image": answer,
                        "answerText": "D-Day",
                        "isCorrect": true
                    },
                    {
                        "id": "a60",
                        "image": answer,
                        "answerText": "Pearl Harbor",
                        "isCorrect": true
                    },
                    {
                        "id": "a61",
                        "image": answer,
                        "answerText": "Treaty of Versailles",
                        "isCorrect": false
                    },
                    {
                        "id": "a62",
                        "image": answer,
                        "answerText": "Battle of Midway",
                        "isCorrect": true
                    }
                ]
            },
            {
                "id": "q19",
                "questionText": "The Roman Empire was primarily based around the Mediterranean Sea.",
                "point" : 1,
                "image": qst,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a63",
                        "image": answer,
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a64",
                        "image": answer,
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]},

            {
                
                "id": "q20",
                "questionText": "Who discovered America in 1492?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a65",
                        "image": answer,
                        "answerText": "Christopher Columbus",
                        "isCorrect": true
                    },
                    {
                        "id": "a66",
                        "image": answer,
                        "answerText": "Leif Erikson",
                        "isCorrect": false
                    },
                    {
                        "id": "a67",
                        "image": answer,
                        "answerText": "Amerigo Vespucci",
                        "isCorrect": false
                    },
                    {
                        "id": "a68",
                        "image": answer,
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
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a69",
                        "image": answer,
                        "answerText": "Paris",
                        "isCorrect": true
                    },
                    {
                        "id": "a70",
                        "image": answer,
                        "answerText": "Lyon",
                        "isCorrect": false
                    },
                    {
                        "id": "a71",
                        "image": answer,
                        "answerText": "Marseille",
                        "isCorrect": false
                    },
                    {
                        "id": "a72",
                        "image": answer,
                        "answerText": "Nice",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q22",
                "questionText": "Which of the following are continents?",
                "point" : 1,
                "image": qst,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a73",
                        "image": answer,
                        "answerText": "Asia",
                        "isCorrect": true
                    },
                    {
                        "id": "a74",
                        "image": answer,
                        "answerText": "Africa",
                        "isCorrect": true
                    },
                    {
                        "id": "a75",
                        "image": answer,
                        "answerText": "Europe",
                        "isCorrect": true
                    },
                    {
                        "id": "a76",
                        "image": answer,
                        "answerText": "Greenland",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q23",
                "questionText": "The Sahara Desert is located in Africa.",
                "point" : 1,
                "image": qst,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a77",
                        "image": answer,
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a78",
                        "image": answer,
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]},

            {
                
                "id": "q24",
                "questionText": "Which is the largest ocean on Earth?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a79",
                        "image": answer,
                        "answerText": "Pacific Ocean",
                        "isCorrect": true
                    },
                    {
                        "id": "a80",
                        "image": answer,
                        "answerText": "Atlantic Ocean",
                        "isCorrect": false
                    },
                    {
                        "id": "a81",
                        "image": answer,
                        "answerText": "Indian Ocean",
                        "isCorrect": false
                    },
                    {
                        "id": "a82",
                        "image": answer,
                        "answerText": "Arctic Ocean",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q25",
                "questionText": "Which of the following countries are in South America?",
                "point" : 1,
                "image": qst,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a83",
                        "image": answer,
                        "answerText": "Brazil",
                        "isCorrect": true
                    },
                    {
                        "id": "a84",
                        "image": answer,
                        "answerText": "Argentina",
                        "isCorrect": true
                    },
                    {
                        "id": "a85",
                        "image": answer,
                        "answerText": "Chile",
                        "isCorrect": true
                    },
                    {
                        "id": "a86",
                        "image": answer,
                        "answerText": "Mexico",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q26",
                "questionText": "Mount Everest is the highest mountain in the world.",
                "point" : 1,
                "image": qst,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a87",
                        "image": answer,
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a88",
                        "image": answer,
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]},

            {
                
                "id": "q27",
                "questionText": "Which river is the longest in the world?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a89",
                        "image": answer,
                        "answerText": "Nile",
                        "isCorrect": true
                    },
                    {
                        "id": "a90",
                        "image": answer,
                        "answerText": "Amazon",
                        "isCorrect": false
                    },
                    {
                        "id": "a91",
                        "image": answer,
                        "answerText": "Yangtze",
                        "isCorrect": false
                    },
                    {
                        "id": "a92",
                        "image": answer,
                        "answerText": "Mississippi",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q28",
                "questionText": "Which of the following are island nations?",
                "point" : 1,
                "image": qst,
                "answerType": "MULTIPLE_CHOICE",
                "answers": [
                    {
                        "id": "a93",
                        "image": answer,
                        "answerText": "Japan",
                        "isCorrect": true
                    },
                    {
                        "id": "a94",
                        "image": answer,
                        "answerText": "Madagascar",
                        "isCorrect": true
                    },
                    {
                        "id": "a95",
                        "image": answer,
                        "answerText": "United Kingdom",
                        "isCorrect": true
                    },
                    {
                        "id": "a96",
                        "image": answer,
                        "answerText": "Brazil",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q29",
                "questionText": "Which country is the largest by land area?",
                "point" : 1,
                "image": qst,
                "answerType": "SINGLE_CHOICE",
                "answers": [
                    {
                        "id": "a97",
                        "image": answer,
                        "answerText": "Russia",
                        "isCorrect": true
                    },
                    {
                        "id": "a98",
                        "image": answer,
                        "answerText": "Canada",
                        "isCorrect": false
                    },
                    {
                        "id": "a99",
                        "image": answer,
                        "answerText": "China",
                        "isCorrect": false
                    },
                    {
                        "id": "a100",
                        "image": answer,
                        "answerText": "United States",
                        "isCorrect": false
                    }
                ]
            },
            {
                "id": "q30",
                "questionText": "The Great Barrier Reef is located in Australia.",
                "point" : 1,
                "image": qst,
                "answerType": "BOOLEAN",
                "answers": [
                    {
                        "id": "a101",
                        "image": answer,
                        "answerText": "Vraie",
                        "isCorrect": true
                    },
                    {
                        "id": "a102",
                        "image": answer,
                        "answerText": "Faux",
                        "isCorrect": false
                    }
                ]}]
        
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
                mb: 2
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
                    p: "10px",
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
