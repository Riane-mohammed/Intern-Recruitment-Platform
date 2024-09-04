import { Box, Grid } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CardsDashboard from '../../../common/components/adminComponents.js/dashboard/cards';
import DoughnutDashboard from '../../../common/components/adminComponents.js/dashboard/doughnut';
// import PieDashboard from '../../../common/components/adminComponents.js/dashboard/pie';
import LastQuizCard from '../../../common/components/adminComponents.js/dashboard/lastQuiz';
import BarChartDashboard from '../../../common/components/adminComponents.js/dashboard/barChart';
import LineChartDashboard from '../../../common/components/adminComponents.js/dashboard/lineChart';

// Enregistrer les éléments nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {

    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return (
        <Box sx={{ pt: 2 }}>
            {/* cards */}
            <CardsDashboard />
            <Grid container sx={{ minWidth: '100%', minHeight: 255, px: '20px', mt: 3 }}>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                    <Grid container>
                        {/* Pie */}
                        <Grid component={NavLink} to="/admin/Options" item xs={6} sx={{ height: 255, display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                            <BarChartDashboard />
                        </Grid>
                        {/* Doughnut */}
                        <Grid component={NavLink} to="/admin/Quiz" item xs={6} sx={{ height: 255, display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                            <DoughnutDashboard options={options} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                    <LastQuizCard />
                </Grid>
            </Grid>
            <Grid container sx={{ minWidth: '100%', minHeight: 230, px: '20px', mt: 3 }}>
                <Grid item xs={3}></Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
                    <LineChartDashboard />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Dashboard;
