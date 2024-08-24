import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, TextField, Button, Typography, InputAdornment, IconButton, FormControlLabel, Checkbox, Link } from '@mui/material';

// API
import { login } from '../../../common/api/auth';  

//actions
import { setAuthenticated, setUser } from '../../admin/actions/userActions';

// Login Image
import logo from '../../../assets/images/Login.svg';  

// Icons
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';  

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email: email, password: password };
        try {
            const response = await login(credentials);
            setError(null);
            dispatch(setUser(response));
            dispatch(setAuthenticated(true));
        } catch (error) {
            console.error('Login failed:', error);
            setError(true);
        }
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Grid container>
            {/* SVG */}
            <Grid item xs={12} md={6}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <img src={logo} alt="Illustration" width="80%" />
                </Box>
            </Grid>

            {/* Login Form */}
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 3,
                        minWidth: '500px',
                        border: '1px solid',
                        borderColor: 'grey.light'
                    }}
                >
                    <Typography variant="h5" align="center" fontWeight={600} color='primary' gutterBottom>
                        Connexion
                    </Typography>
                    {error &&
                        <Typography fontWeight={600} color='red.main' fontSize={13}>
                            * Erreur : Nom d'utilisateur ou mot de passe incorrect.
                        </Typography>
                    }
                    <TextField
                        label="Adresse e-mail"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        size="small"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            borderRadius: '8px',
                            width: '90%'
                        }}
                    />

                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        size="small"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock fontSize="small" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            borderRadius: '8px',
                            width: '90%'
                        }}
                    />

                    {/* Remember Me Checkbox and Forgot Password Link */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            width: '100%',
                            mt: 2
                        }}
                    >
                        <FormControlLabel
                            control={<Checkbox size='small' />}
                            label={<Typography variant="body2">Se souvenir de moi</Typography>}
                        />
                        <Link href="#" variant="body2">
                            Mot de passe oublié ?
                        </Link>
                    </Box>

                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, width: '75%' }} type="submit">
                        Se connecter
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
