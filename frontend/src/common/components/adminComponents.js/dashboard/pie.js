import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"
import { getNumberOfFemaleCandidates, getNumberOfMaleCandidates } from "../../../api/admin";

function PieDashboard({ options }) {
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    
    const getMalesCount = async () => {
        try {
            const count = await getNumberOfMaleCandidates();
            setMaleCount(count);
        } catch (error) {
            console.error("Failed to fetch candidate count : ", error);
        }
    };

    const getFemalesCount = async () => {
        try {
            const count = await getNumberOfFemaleCandidates();
            setFemaleCount(count);
        } catch (error) {
            console.error("Failed to fetch candidate count : ", error);
        }
    };

    useEffect(() => {
        getMalesCount();
        getFemalesCount();
    }, []);

    // Données du Pie Chart pour la répartition Homme/Femme
    const pieData = {
        labels: ['Homme', 'Femme'],
        datasets: [
            {
                data: [maleCount, femaleCount], // Remplacez ces valeurs par les données réelles
                backgroundColor: ['#596DB9', '#FF6384'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    return (
        <Box>
            <Typography fontWeight={500} fontSize='14px' color='primary'>Répartition Homme/Femme</Typography>
            <Box sx={{ position: 'relative', width: '100%', height: 'calc(100% - 30px)', mt: 2 }}>
                <Pie
                    data={pieData}
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

export default PieDashboard
