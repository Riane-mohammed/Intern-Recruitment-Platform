import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';
import { Box } from '@mui/material';
import { getAllLevels, getNumberOfTestsByLevel } from '../../../api/admin';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement);

const BarChartDashboard = () => {
    const [levels, setLevels] = useState([]);
    const [counts, setCounts] = useState([]);
    const chartRef = useRef(null);

    const getLevels = async () => {
        try {
            const LevelsData = await getAllLevels();
            setLevels(LevelsData);

            const countsPromises = LevelsData.map(async (level) => {
                const count = await getTestsCountByLevel(level);
                return count;
            });
            const countsResolved = await Promise.all(countsPromises);
            setCounts(countsResolved);

        } catch (error) {
            console.error("Failed to fetch levels or counts:", error);
        }
    };

    const getTestsCountByLevel = async (level) => {
        try {
            const count = await getNumberOfTestsByLevel(level);
            return count;
        } catch (error) {
            console.error("Failed to fetch count:", error);
            return 0;
        }
    };

    useEffect(() => {
        getLevels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const data = {
        labels: levels.map((level) => level.name ),  // Example labels in French
        datasets: [
            {
                label: 'Nombre de tests',
                data: counts,  // Example data
                backgroundColor: '#596DB9',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
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
        scales: {
            y: {
                beginAtZero: true,
                type: 'linear',
            },
        },
    };

    useEffect(() => {
        return () => {
            // Destroy chart instance before unmounting component
            if (chartRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <Box sx={{
            width: '90%',
            height: '100%',
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
            <Box style={{ height: '100%', width: '100%' }}>
                <Bar ref={chartRef} data={data} options={options} />
            </Box>
        </Box>
    );
};

export default BarChartDashboard;
