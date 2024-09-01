import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ value, onChange }) => {
    return (
        <Box>
            <TextField
                id="outlined-basic"
                label="Rechercher"
                variant="outlined"
                value={value} // Bind the value prop to the TextField
                onChange={onChange} // Trigger the onChange prop when the input value changes
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
