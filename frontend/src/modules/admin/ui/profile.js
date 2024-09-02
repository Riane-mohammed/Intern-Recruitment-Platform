import { Typography, Button, Box, Card, CardContent, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, Alert, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// svg
import logo from "../../../Assets/images/profile.svg";

// icon
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InfoIcon from '@mui/icons-material/Info';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//apis
import { getAllUsernames, updateAdmin } from '../../../common/api/admin';
import { setUser } from '../actions/userActions';

function Profile() {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const admin = useSelector((state) => state.user.user);
    const [confirmation, setConfirmation] = useState('');
    const [usernames, setUsernames] = useState([]);
    const [confirmationError, setConfirmationError] = useState(''); // State for confirmation password error
    const [usernameError, setUsernameError] = useState(''); // State for username error
    const [globalError, setGlobalError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        id: admin.id,
        username: admin.username,
        oldPassword: '',
        newPassword: '',
    });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const getUsernames = async () => {
            try {
                const usernamesData = await getAllUsernames();
                setUsernames(usernamesData);
            } catch (error) {
                console.error("Failed to fetch usernames:", error);
            }
        };

        getUsernames();
    }, []);

    const handleConfirmation = (event) => {
        setConfirmation(event.target.value);
    };

    const handleEditClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        // Clear previous errors
        setConfirmationError('');
        setUsernameError('');
        setGlobalError('');

        // Check if new password and confirmation password match
        if (formData.newPassword !== confirmation) {
            setConfirmationError("Les mots de passe ne correspondent pas");
            return;
        }

        // Check if new username is already taken
        if (usernames.includes(formData.username) && formData.username !== admin.username) {
            setUsernameError("Le nom d'utilisateur est déjà pris");
            return;
        }

        try {
            const response = await updateAdmin(formData);
            dispatch(setUser(response));
            setSuccess("Profil mis à jour avec succès!");
            handleClose();
            setFormData({
                id: admin.id,
                username: admin.username,
                oldPassword: '',
                newPassword: '',
            })
        } catch (error) {
            setGlobalError("mot de passe incorrect ou une erreur inattendue est survenue");
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 2
            }}
        >
            {/* Combined Section for Profile Info and Image */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: 1200
                }}
            >
                {/* Profile Card */}
                <Card
                    sx={{
                        width: '100%',
                        padding: 3,
                        borderRadius: 2,
                        boxShadow: 3
                    }}
                >
                    <CardContent>
                        {/* Image Section */}
                        <Typography variant='h5' fontWeight={500} color='primary' gutterBottom>
                            <AccountBoxIcon /> Profil
                        </Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <img src={logo} alt="Profile" style={{ width: '300px', height: 'auto' }} />
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                <Typography variant='h5' fontWeight={500} color='primary'>
                                    <InfoIcon /> Informations du Profil
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                                    <Box>
                                        <Typography component="p" marginY={1}>
                                            <strong>Nom d'utilisateur</strong>
                                        </Typography>
                                        <Typography component="p" marginY={1}>
                                            <strong>Email</strong>
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography component="p" marginY={1}>
                                            : {admin.username}
                                        </Typography>
                                        <Typography component="p" marginY={1}>
                                            : {admin.email}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box textAlign="end" marginTop={2}>
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

            {/* Modify Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier le Profil</DialogTitle>
                <DialogContent>
                    {globalError &&
                        <Typography fontWeight={600} color='red.main' fontSize={13}>
                            * Erreur : {globalError}
                        </Typography>
                    }
                    <TextField
                        autoFocus
                        margin="dense"
                        name="username"
                        label="Nom d'utilisateur"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                    {usernameError &&
                        <Typography fontWeight={600} color='red.main' fontSize={13} gutterBottom>
                            * Erreur : {usernameError}
                        </Typography>
                    }
                    <TextField
                        margin="dense"
                        name="oldPassword"
                        label="Ancien mot de passe"
                        type={showOldPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={formData.oldPassword}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => setShowOldPassword(prev => !prev)}
                                    edge="end"
                                >
                                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )
                        }}
                    />
                    {confirmationError &&
                        <Typography fontWeight={600} color='red.main' fontSize={13} gutterBottom>
                            * Erreur : {confirmationError}
                        </Typography>
                    }
                    <TextField
                        margin="dense"
                        name="newPassword"
                        label="Nouveau mot de passe"
                        type={showNewPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => setShowNewPassword(prev => !prev)}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )
                        }}
                    />
                    <TextField
                        margin="dense"
                        name="confirmNewPassword"
                        label="Confirmer le nouveau mot de passe"
                        type={showConfirmPassword ? 'text' : 'password'}
                        fullWidth
                        variant="outlined"
                        value={confirmation}
                        onChange={handleConfirmation}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            )
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleSubmit}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
            {/* Success Snackbar */}
            <Snackbar open={Boolean(success)} autoHideDuration={6000} onClose={() => setSuccess('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={() => setSuccess('')} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default Profile;
