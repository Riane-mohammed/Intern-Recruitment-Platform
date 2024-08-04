import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    return (
        <Box>
            <TextField
                id="outlined-basic"
                label="Rechercher"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                    sx: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 5,
                        },
                        '& .MuiOutlinedInput-input': {
                            padding: 1,
                        },
                    },
                }}
                InputLabelProps={{
                    sx: {
                        top: '-10px',
                    },
                }}
            />
        </Box>
    );
};

export default Search;
