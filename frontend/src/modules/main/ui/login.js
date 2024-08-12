import React from 'react';
import { Grid, Box, TextField, Button, Typography, InputAdornment, IconButton, FormControlLabel, Checkbox, Link } from '@mui/material';
import { theme } from '../../../common/utils/theme';

//login img
import logo from '../../../assets/images/Login.svg';

//icons
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';

const LoginPage = () => {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Grid container
            sx={{
                minHeight: `calc( 100vh - ( ${theme.mixins.toolbar.minHeight}px) - 15px )`,
            }}
        >
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
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 3,
                        minWidth: '400px',
                        border: '1px solid',
                        borderColor: 'grey.light'
                    }}
                >
<Typography variant="h5" align="center" fontWeight={600} color='primary' gutterBottom>
                        Connexion
                    </Typography>
                    <TextField
                        label="Adresse e-mail"
                        variant="outlined"
                        fullWidth
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
                        }}
                    />

                    <TextField
                        label="Mot de passe"
                        variant="outlined"
                        fullWidth
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
                        }}
                    />

                    {/* Remember Me Checkbox and Forgot Password Link */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
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

                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Se connecter
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
