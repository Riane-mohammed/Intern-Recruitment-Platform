import { Typography, TextField, Button, Box } from '@mui/material';

function Settings() {
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
                    <TextField label="Nom d'utilisateur" fullWidth margin="normal" sx={{ maxWidth: 400 }} />
                    <TextField label="Email" fullWidth margin="normal" sx={{ maxWidth: 400 }} />
                    <TextField label="Ancien mot de passe" type="password" fullWidth margin="normal" sx={{ maxWidth: 400 }} />
                    <TextField label="Nouveau mot de passe" type="password" fullWidth margin="normal" sx={{ maxWidth: 400 }} />
                    <TextField label="Confirmer le nouveau mot de passe" type="password" fullWidth margin="normal" sx={{ maxWidth: 400 }} />
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Enregistrer les modifications
                    </Button>
                </Box>

                {/* Section pour créer un autre compte (à droite) */}
                <Box flex={1} maxWidth="500px" display="flex" flexDirection="column" alignItems="center" p={2} border={1} borderColor="grey.300" borderRadius="8px">
                    <Typography variant="h5" component="p" mb={2}>
                        Créer un autre compte
                    </Typography>
                    <TextField label="Nom d'utilisateur" fullWidth margin="normal" sx={{ maxWidth: 400 }} />
                    <TextField label="Email" fullWidth margin="normal" sx={{ maxWidth: 400 }} />
                    <TextField label="Mot de passe" type="password" fullWidth margin="normal" sx={{ maxWidth: 400 }} />
                    <TextField label="Confirmer le mot de passe" type="password" fullWidth margin="normal" sx={{ maxWidth: 400 }} />
                    <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                        Créer le compte
                    </Button>
                </Box>
            </Box>
        </div>
    );
}

export default Settings;
