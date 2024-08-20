import { Typography, Button, Box, Card, CardContent, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Profile() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleEditClick = () => {
        navigate('/admin/Paramètres');
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                padding: 2 
            }}
        >
            <Card 
                sx={{ 
                    maxWidth: 600, 
                    width: '100%', 
                    padding: 3, 
                    borderRadius: 2, 
                    boxShadow: 3 
                }}
            >
                <CardContent>
                    <Typography variant="h4" component="div" textAlign="center" gutterBottom>
                        Profil
                    </Typography>

                    <Typography variant="h6" component="p" marginY={1}>
                        <strong>Nom d'utilisateur:</strong> admin
                    </Typography>

                    <Typography variant="h6" component="p" marginY={1}>
                        <strong>Email:</strong> admin@gmail.com
                    </Typography>

                    <Box display="flex" alignItems="center">
                        <Typography variant="h6" component="p" marginY={1} flexGrow={1}>
                            <strong>Mot de passe:</strong> admin123
                            
                        </Typography>
                        
                    </Box>

                    <Box textAlign="center" marginTop={2}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleEditClick}
                        >
                            Modifier
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Profile;
