import * as React from 'react';
import { Modal, Box, Typography, Grid, TextField, Button, Autocomplete, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const UpdateModal = ({ open, close, fields, onSubmit, initialValues }) => {
    const [formValues, setFormValues] = React.useState(initialValues || {});

    React.useEffect(() => {
        setFormValues(initialValues || {});
    }, [initialValues]);

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
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxWidth: '600px', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={close}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    UPDATE
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {fields.map(({ name, label, type, required, readOnly, options, labelFields }) => (
                            <Grid item xs={12} key={name}>
                                {type === 'autocomplete' ? (
                                    <Autocomplete
                                        options={options}
                                        getOptionLabel={(option) => labelFields.map((field) => option[field]).join(' - ')}
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
                                        InputProps={{
                                            readOnly: readOnly || false
                                        }}
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

export default UpdateModal;