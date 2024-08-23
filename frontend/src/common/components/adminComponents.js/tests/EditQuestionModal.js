import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const EditQuestionModal = ({ open, handleClose, questionText, handleQuestionTextChange }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                width: 400, 
                bgcolor: 'background.paper', 
                borderRadius: 3, 
                boxShadow: 24, 
                p: 4 
            }}>
                <TextField
                    id="question-text"
                    label="Edit Question Text"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={questionText}
                    onChange={handleQuestionTextChange}
                />
                <Button onClick={handleClose} variant="contained" sx={{ mt: 2 }}>
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

export default EditQuestionModal;
