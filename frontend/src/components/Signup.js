import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Paper, AppBar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { API } from './global';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toolbar } from '@mui/material';

const signupValidationSchema = yup.object({
    username: yup.string().required("Why not fill this User-Name?").min(1),
    phone: yup.string().required("Why not fill this Phone Number?").min(10).max(10),
    email: yup.string().required("Why not fill this e-mail ID?").min(8),
    password: yup.string().required("Why not fill this Password?").min(8),
})

export function Signup() {
    const navigate = useNavigate();
    const { handleSubmit, values, handleBlur, handleChange, touched, errors } = useFormik({
        initialValues: {
            username: "",
            phone: "",
            email: "",
            password: "",
        },
        validationSchema: signupValidationSchema,
        onSubmit: (newList) => {
            // console.log("new member: ", newList)
            addUser(newList)
        },
    })
    const addUser = (newList) => {
        fetch(`${API}/users/signup`, {
            method: "POST",
            body: JSON.stringify(newList),
            headers: { "Content-Type": "application/json" }
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.message === "Username already exists") {
                    toast.error('Username already exists🫡!',{
                        position: "top-right",
                        autoClose: 3000,
                        color:"white"
                    });
                } else {
                    toast.success('Account Created Successfully 💯✨!',{
                        position: "top-right",
                        autoClose: 3000,
                        color:"white"
                    });
                    navigate('/users/login')
                }
            })
    }
    return <>
        <div className='home-signup'>
            <AppBar className='navbar' position="relative">
                <Toolbar>
                    <Typography onClick={() => navigate('/')} className='logo' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Classy<span className='logo-F'>clu</span>tches
                    </Typography>
                    <Button onClick={() => navigate('/users/login')} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{
                textAlign: "center",
                minHeight: "86vh",
                display: "grid",
                placeContent: "center"
            }}
            >
                <Paper elevation={12}
                    sx={{
                        padding: "50px 15px",
                        width: { sm: "400px", md: "400px" },
                        borderRadius: "20px",
                        margin:"60px"
                    }}>
                    <Container component="main" maxWidth="xs" sx={{ fontFamily: "Open Sans, sans-serif" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", mb: 3, gap: 1 }}>
                            <Avatar sx={{ bgcolor: 'success.main' }}>
                                <VpnKeyIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5" sx={{ mt: "5px" }}>
                                Sign up
                            </Typography>
                        </Box>
                        <Box component="form" onSubmit={handleSubmit} >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        focused
                                        required
                                        fullWidth
                                        id="username"
                                        name="username"
                                        autoComplete="username"
                                        value={values.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.username && errors.username}
                                        helperText={touched.username && errors.username ? errors.username : null}
                                        className='textfield-auth'
                                        label="User-Name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="phone"
                                        id="phone"
                                        name="phone"
                                        value={values.phone}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.phone && errors.phone}
                                        helperText={touched.phone && errors.phone ? errors.phone : null}
                                        className='textfield-auth'
                                        label="Phone Number"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        autoComplete="email"
                                        id="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.email && errors.email}
                                        helperText={touched.email && errors.email ? errors.email : null}
                                        className='textfield-auth'
                                        label="e-mail ID"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.password && errors.password}
                                        helperText={touched.password && errors.password ? errors.password : null}
                                        className='textfield-auth'
                                        type='password'
                                        label="Password"
                                        required
                                        fullWidth
                                        name="password"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                color="success"
                                variant="contained"

                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Link className='auth-link' to="/users/login">Already have an account</Link>
                                <Link variant="contained" onClick={() => navigate(-1)}>Back</Link>
                            </Box>
                        </Box>
                    </Container>
                </Paper>
            </Box>
        </div>
    </>;
}
