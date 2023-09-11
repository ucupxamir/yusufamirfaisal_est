import * as React from 'react';
import { Modal, Box, Typography, Grid, TextField, Button, Autocomplete, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const RegisterModal = ({ open, close, fields, onSubmit }) => {
    const [formValues, setFormValues] = React.useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
        close();
        setFormValues({});
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const updatedFormValues = { ...formValues, [name]: type === 'checkbox' ? e.target.checked : value };
        setFormValues(updatedFormValues);
    };

    const handleAutocompleteChange = (name, newValue) => {
        const selectedValue = newValue ? newValue.id : null;
        const updatedFormValues = { ...formValues, [name]: selectedValue };
        setFormValues(updatedFormValues);
    };

    return (
        <Modal
            open={open}
            onClose={close}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={close}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    REGISTER
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {fields.map(({ name, label, type, required, options, labelFields }) => (
                            <Grid item xs={12} key={name}>
                                {type === 'autocomplete' ? (
                                    <Autocomplete
                                        options={options}
                                        getOptionLabel={(option) => {
                                            let label = '';
                                            for (let i = 0; i < labelFields.length; i++) {
                                                const field = labelFields[i];
                                                const fieldParts = field.split('.'); // Pisahkan bagian-bagian dari properti bersarang
                                                let value = option;
                                                for (const element of fieldParts) {
                                                    value = value[element];
                                                }
                                                label += value;
                                                if (i !== labelFields.length - 1) {
                                                    label += ' - ';
                                                }
                                            }
                                            return label;
                                        }}

                                        value={formValues[name] !== undefined ? options.find(option => option.id === formValues[name]) : null}
                                        onChange={(event, newValue) => handleAutocompleteChange(name, newValue)}
                                        renderInput={(params) => <TextField {...params} label={label} />}
                                        required={required}
                                    />
                                ) : (
                                    <TextField
                                        type={type}
                                        name={name}
                                        label={label}
                                        value={formValues[name] || ''}
                                        onChange={handleInputChange}
                                        required={required}
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={2} textAlign="center">
                        <Button variant="contained" color="primary" type="submit" sx={{ marginRight: '10px' }}>
                            SAVE
                        </Button>
                        <Button variant="contained" color="secondary" onClick={close}>
                            CANCEL
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default RegisterModal;