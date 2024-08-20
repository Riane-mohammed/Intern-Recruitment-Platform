import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function Settings() {
    // États pour la section de modification
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // États pour la section de création de compte
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newAccountPassword, setNewAccountPassword] = useState('');
    const [confirmNewAccountPassword, setConfirmNewAccountPassword] = useState('');

    // Fonction pour gérer la sauvegarde des modifications
    const handleSave = () => {
        if (newPassword !== confirmNewPassword) {
            alert('Les nouveaux mots de passe ne correspondent pas.');
            return;
        }
        // Logique pour sauvegarder les informations
        alert('Modifications enregistrées.');
    };

    // Fonction pour gérer la création d'un nouveau compte
    const handleCreateAccount = () => {
        if (newAccountPassword !== confirmNewAccountPassword) {
            alert('Les mots de passe ne correspondent pas.');
            return;
        }
        // Logique pour créer un nouveau compte
        alert('Compte créé.');
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h2" component="p" textAlign="center">
                Paramètres
            </Typography>

            {/* Conteneur principal pour aligner les sections */}
            <Box display="flex" justifyContent="center" mt={4} gap={4}>
                {/* Section de modification des informations (à gauche) */}
                <Box flex={1} maxWidth="500px" display="flex" flexDirection="column" alignItems="center" p={2} border={1} borderColor="grey.300" borderRadius="8px">
                    <Typography variant="h5" component="p" mb={2}>
                        Modifier les informations
                    </Typography>
                    <TextField
                        label="Nom d'utilisateur"
                        fullWidth
                        margin="normal"
                        sx={{ maxWidth: 400 }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        sx={{ maxWidth: 400 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        label="Ancien mot de passe"
                        type="password"
                        fullWidth
                        margin="normal"
                        sx={{ maxWidth: 400 }}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                        label="Nouveau mot de passe"
                        type="password"
                        fullWidth
                        margin="normal"
                        sx={{ maxWidth: 400 }}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirmer le nouveau mot de passe"
                        type="password"
                        fullWidth
                        margin="normal"
                        sx={{ maxWidth: 400 }}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={handleSave}
                    >
                        Enregistrer les modifications
                    </Button>
                </Box>

                {/* Section pour créer un autre compte (à droite) */}
                <Box flex={1} maxWidth="500px" display="flex" flexDirection="column" alignItems="center" p={2} border={1} borderColor="grey.300" borderRadius="8px">
                    <Typography variant="h5" component="p" mb={2}>
                        Créer un autre compte
                    </Typography>
                    <TextField
                        label="Nom d'utilisateur"
                        fullWidth
                        margin="normal"
                        sx={{ maxWidth: 400 }}
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        sx={{ maxWidth: 400 }}
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <TextField
                        label="Mot de passe"
                        type="password"
                        fullWidth
                        margin="normal"
                        sx={{ maxWidth: 400 }}
                        value={newAccountPassword}
                        onChange={(e) => setNewAccountPassword(e.target.value)}
                    />
                    <TextField
                        label="Confirmer le mot de passe"
                        type="password"
                        fullWidth
                        margin="normal"
                        sx={{ maxWidth: 400 }}
                        value={confirmNewAccountPassword}
                        onChange={(e) => setConfirmNewAccountPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2 }}
                        onClick={handleCreateAccount}
                    >
                        Créer le compte
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default Settings;
