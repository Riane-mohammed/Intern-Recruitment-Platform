import { Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

//apis
import { getFalseReclamations, getNumberOfCandidates, getNumberOfQuizzes, getNumberOfTests } from "../../../api/admin";

//cards
import DashboardCard from "../../dashboardCard";

//icons
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';

function CardsDashboard() {
    const [candidateCount, setCandidateCount] = useState(0);
    const [quizCount, setQuizCount] = useState(0);
    const [testCount, setTestCount] = useState(0);
    const [reclamationCount, setReclamationCount] = useState(0);

    const getCandidateCount = async () => {
        try {
            const count = await getNumberOfCandidates();
            setCandidateCount(count);
        } catch (error) {
            console.error("Failed to fetch candidate count : ", error);
        }
    };

    const getTestCount = async () => {
        try {
            const count = await getNumberOfTests();
            setTestCount(count);
        } catch (error) {
            console.error("Failed to fetch Test count : ", error);
        }
    };

    const getQuizCount = async () => {
        try {
            const count = await getNumberOfQuizzes();
            setQuizCount(count);
        } catch (error) {
            console.error("Failed to fetch Quiz count : ", error);
        }
    };

    const getReclamationCount = async () => {
        try {
            const count = await getFalseReclamations();
            setReclamationCount(count);
        } catch (error) {
            console.error("Failed to fetch Reclamation count : ", error);
        }
    };

    useEffect(() => {
        getCandidateCount();
        getTestCount();
        getQuizCount();
        getReclamationCount();

        return () => {
            // Effect cleanup logic (if needed)
        };
    }, []);

    return ( 
            <Grid container sx={{ minWidth: '100%' }}>
                <Grid component={NavLink} to="/admin/Candidats" item xs={3} sx={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                    <DashboardCard nombre={candidateCount} title="Total candidats" icon={<PersonRoundedIcon color='blanc' sx={{ fontSize: 30 }} />} />
                </Grid>
                <Grid component={NavLink} to="/admin/Tests" item xs={3} sx={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                    <DashboardCard nombre={testCount} title="Total Tests" icon={<FeedRoundedIcon color='blanc' sx={{ fontSize: 30 }} />} />
                </Grid>
                <Grid component={NavLink} to="/admin/Quiz" item xs={3} sx={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                    <DashboardCard nombre={quizCount} title="Total Quizzes" icon={<QuizRoundedIcon color='blanc' sx={{ fontSize: 30 }} />} />
                </Grid>
                <Grid component={NavLink} to="/admin/Réclamation" item xs={3} sx={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                    <DashboardCard nombre={reclamationCount} title="Réclamations en attente" icon={<QuestionAnswerRoundedIcon color='blanc' sx={{ fontSize: 30 }} />} />
                </Grid>
            </Grid>
    );
}
export default CardsDashboard;