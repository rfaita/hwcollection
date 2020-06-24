import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect, Link as LinkRouter } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';

import { LoginContext } from '../providers/LoginProvider';
import { signInWithGoogle, signInWithEmailAndPassword } from "../services/firebase";


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
        marginBottom: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    
    google: {
        height: 45,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
}));

export default function Login() {
    const classes = useStyles();
    const { user } = useContext(LoginContext);

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

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
                            Sign in
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
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
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
                                    try {
                                        await signInWithEmailAndPassword(email, pass);
                                    } catch (err) {
                                        console.log(err);
                                        handleError(err.message);
                                    }
                                    setLoading(false);

                                }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                            </Link>
                                </Grid>
                                <Grid item>
                                    <LinkRouter to={"/signup"}>
                                        <Link variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </LinkRouter>
                                </Grid>
                            </Grid>
                        </form>

                        <Snackbar
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                            open={openError}
                            onClose={handleErrorClose}
                            message={messageError}
                            autoHideDuration={5000}
                            key={"errorSignUp"}
                        />

                        <Typography component="span" variant="subtitle2">
                            or
                        </Typography>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.google}
                            onClick={() => {
                                signInWithGoogle();
                            }}
                        >
                            <i className="fab fa-google margin-right"></i> Login with Google
                        </Button>
                    </div>
                </Container>
                :
                <Redirect to={"/"} />

            }
        </div>
    );
}