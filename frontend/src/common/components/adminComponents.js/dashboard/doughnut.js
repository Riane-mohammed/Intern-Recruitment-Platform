import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { getNumberOfAccepted, getNumberOfWaiting } from '../../../api/admin';

function DoughnutDashboard({ options }) {
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [notAcceptedCount, setNotAcceptedCount] = useState(0);
    
    const getAcceptedCount = async () => {
        try {
            const count = await getNumberOfAccepted();
            setAcceptedCount(count / 2);
        } catch (error) {
            console.error("Failed to fetch candidate count : ", error);
        }
    };

    const getNotAcceptedCount = async () => {
        try {
            const count = await getNumberOfWaiting();
            setNotAcceptedCount(count / 2);
        } catch (error) {
            console.error("Failed to fetch candidate count : ", error);
        }
    };

    useEffect(() => {
        getAcceptedCount();
        getNotAcceptedCount();
    }, []);

    // Données du Doughnut
    const doughnutData = {
        labels: ['Accepté', 'Non Accepté'],
        datasets: [
            {
                data: [acceptedCount, notAcceptedCount], // Remplacez ces valeurs par les données réelles
                backgroundColor: ['#1E2B5B', '#596DB9'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

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
            <Typography fontWeight={500} fontSize='14px' color='primary'>Répartition des Acceptations</Typography>
            <Box sx={{ position: 'relative', width: '100%', height: 'calc(100% - 30px)', mt: 2 }}>
                <Doughnut
                    data={doughnutData}
                    options={{
                        ...options,
                        maintainAspectRatio: false,
                        responsive: true,
                    }}
                />
            </Box>
        </Box>
    )
}

export default DoughnutDashboard;
