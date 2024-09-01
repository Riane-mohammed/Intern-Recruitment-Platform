import { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { getAllQuizzes } from '../../../api/admin';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { NavLink } from 'react-router-dom';

// Register Chart.js components for Line Chart
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChartDashboard = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

    useEffect(() => {
        const getQuizzes = async () => {
            try {
                const QuizzesData = await getAllQuizzes();
                setQuizzes(QuizzesData);
            } catch (error) {
                console.error("Failed to fetch Quizzes:", error);
            }
        };

        getQuizzes();
    }, []);

    // Process the quizzes data to get the count per month for the selected year
    const quizCountsByMonth = useMemo(() => {
        const counts = {};
        const currentMonth = new Date().getMonth();

        // French month names
        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];

        // Initialize the counts object with all months set to null
        for (let i = 0; i < 12; i++) {
            counts[monthNames[i]] = i <= currentMonth ? 0 : null; // Set to 0 if the month has occurred, otherwise null
        }

        // Count quizzes for each month in the selected year
        quizzes.forEach(quiz => {
            const date = new Date(quiz.createdAt);
            if (date.getFullYear() === selectedYear) {
                const monthName = monthNames[date.getMonth()];
                counts[monthName] += 1;
            }
        });

        return counts;
    }, [quizzes, selectedYear]);

    // Prepare the data for the line chart
    const data = {
        labels: Object.keys(quizCountsByMonth),
        datasets: [
            {
                label: `Nombre de quizzes créés en ${selectedYear}`, // Chart label in French
                data: Object.values(quizCountsByMonth),
                fill: false,
                borderColor: '#1E2B5B',
                backgroundColor: '#596DB9',
                tension: 0.3,  // Smoother lines for interpolation effect
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'top',
                width: '95%', // Take full width of the parent
                height: '100%', // Take full height of the parent
                maxHeight: 230, // Maximum height of the container
                p: 2,
                borderRadius: 3,
                boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'white',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: '#F4F9F9',
                },
            }}>
                {/* Year Selection */}
                <FormControl variant="outlined" sx={{ mt: 3, minWidth: 120 }}>
                    <InputLabel>Année</InputLabel>
                    <Select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        label="Année"
                        size='small'
                        sx={{ width: '90px' }}
                    >
                        {/* Dropdown with last 5 years for selection */}
                        {[...Array(5)].map((_, index) => {
                            const year = new Date().getFullYear() - index;
                            return <MenuItem key={year} value={year}>{year}</MenuItem>;
                        })}
                    </Select>
                </FormControl>

                {/* Chart Container */}
                <Line data={data} options={options}
                    
                        width={null}
                    />
            </Box>
        </Box>
    );
};

export default LineChartDashboard;
