import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar } from '@material-ui/core';
import useTrade from '../../hooks/useTrade';


const CarTradeCreate = (props) => {

    const [trade, setTrade] = useState();

    const [title, setTitle] = useState('');
    const [type, setType] = useState('WTS');

    const { loading, error, done } = useTrade(trade);

    const [openError, setOpenError] = useState(false);
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        if (!!error) {
            setOpenError(true);
            setMessageError(error.message);
        }
    }, [error]);

    useEffect(() => {
        if (done) {
            setTitle('');
            setType('WTS');
            props.handleClose();
            props.reloadTrades();
        }
    }, [done]);

    const handleErrorClose = () => {
        setOpenError(false);
        setMessageError('');
    }

    const create = (e) => {
        e.preventDefault();
        setTrade({ title, type, carId: props.car.id });
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create trade</DialogTitle>
            <DialogContent>
                <form noValidate onSubmit={create}>
                    <TextField variant="outlined" margin="normal"
                        required fullWidth id="title"
                        label="Title" name="title" autoFocus
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <FormControl variant="outlined" fullWidth required>
                        <InputLabel id="type-label" style={{ background: '#FFF', padding: 4 }}>Type</InputLabel>
                        <Select labelId="type-label" id="type"
                            value={type} onChange={(e) => {
                                setType(e.target.value);
                            }}>
                            <MenuItem value="WTS">Sell (wts)</MenuItem>
                            <MenuItem value="WTB">Buy (wtb)</MenuItem>
                        </Select>
                    </FormControl>
                </form>

            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary" disabled={loading}>
                    Close
                </Button>
                <Button onClick={create} color="primary" disabled={loading}>
                    Create
                </Button>
            </DialogActions>

            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={openError}
                onClose={handleErrorClose}
                message={messageError}
                autoHideDuration={5000}
                key={"errorCreateTrade"}
            />
        </Dialog>
    );
}
export default CarTradeCreate;