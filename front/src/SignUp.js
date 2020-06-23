import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createUserWithEmailAndPassword } from "./services/firebase";
import { Redirect } from 'react-router-dom';
import { LoginContext } from './providers/LoginProvider';
import { Snackbar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    facebook: {
        height: 45,
    },
    google: {
        height: 45,
        marginTop: 10,
        marginBottom: 10
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const { user } = useContext(LoginContext);

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();
    const [confPass, setConfPass] = useState();

    const [loading, setLoading] = useState(false);

    const [openError, setOpenError] = useState(false);
    const [messageError, setMessageError] = useState();

    const handleError = (message) => {
        setOpenError(true);
        if (message.indexOf(":") > -1) {
            setMessageError(message.split(":")[1]);
        } else {
            setMessageError(message);
        }
    }

    const handleErrorClose = () => {
        setOpenError(false);
    }

    return (
        <div>
            {!user ?
                <Container component="main" maxWidth="xs">
                    <CssBaseline />


                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setPass(e.target.value);
                                }}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confpassword"
                                label="Password Confirm"
                                type="password"
                                id="confpassword"
                                autoComplete="current-confpassword"
                                onChange={(e) => {
                                    setConfPass(e.target.value);
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                                onClick={async (e) => {
                                    e.preventDefault();
                                    setLoading(true);
                                    if (pass === confPass) {
                                        
                                        try {
                                            await createUserWithEmailAndPassword(email, pass);
                                        } catch (err) {
                                            console.log(err);
                                            handleError(err.message);
                                        }
                                    } else {
                                        handleError("Passwords not equals.");
                                    }
                                    setLoading(false);

                                }}
                            >
                                Sign Up
                            </Button>

                        </form>
                        <Snackbar
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                            open={openError}
                            onClose={handleErrorClose}
                            message={messageError}
                            autoHideDuration={5000}
                            key={"errorSignUp"}
                        />

                    </div>
                </Container>
                :
                <Redirect to={"/"} />

            }
        </div>
    );
}