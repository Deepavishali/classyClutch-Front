import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Box, AppBar, Toolbar } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { API } from './global';
import * as yup from "yup"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginValidationSchema = yup.object({
    username: yup.string().required("Why not fill this UserName?"),
    password: yup.string().required("Why not fill this Password?").min(8),
})

export function Login() {
    const navigate = useNavigate();

    const { handleSubmit, values, handleBlur, handleChange, touched, errors } = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: (loginUser) => {
            addList(loginUser)
        }
    })
    const addList = (loginUser) => {
        fetch(`${API}/users/login`, {
            method: "POST",
            body: JSON.stringify(loginUser),
            headers: { "Content-Type": "application/json" }
        })
            .then((data) => data.json())
            .then(data => {
                if (data) {
                    localStorage.setItem("Authorization", data.token)
                    // console.log(data.token)
                    if (data.message === "Successful login 🎊🎊") {
                        // console.log(data.message)
                        // console.log(localStorage)
                        toast.success('Successful login 🎊🎊!',{
                            position: "top-center",
                            autoClose: 2000,
                            color:"white"
                        })
                        navigate(`/bags/menu/${loginUser.username}`)
                    } else {
                        toast.error('Opps Invalid Credentials 😥😥!',{
                            position: "top-right",
                            autoClose: 3000,
                            color:"white"
                        })
                    }
                }
            })
            .catch(() => toast.error('Invalid Credentials'))
    }

    return (
        <div className='home-login'>
            <AppBar className='navbar' position="relative">
                <Toolbar>
                    <Typography onClick={() => navigate('/')} className='logo' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Classy<span className='logo-F'>clu</span>tches
                    </Typography>
                    <Button onClick={() => navigate('/users/signup')} color="inherit">Signup</Button>
                </Toolbar>
            </AppBar>
            <Box sx={{ minHeight: "86vh", display: "grid", placeContent: "center" }}>
                <Paper elevation={12}
                    sx={{
                        height: "400px",
                        padding: "50px 15px",
                        width: { sm: "400px", md: "400px" },
                        margin: {
                            xs: "120px 60px auto", sm: "120px  auto",
                            md: "120px auto"
                        },
                        borderRadius: "20px",
                        textAlign: "center",
                        bgColor: "white"
                    }}  >

                    <Container component="main" maxWidth="xs" sx={{ fontFamily: "Open Sans, sans-serif", color: "white" }}>
                        <CssBaseline />
                        <Box sx={{ display: "flex", justifyContent: "center", mb: 3, gap: 1 }}>
                            <Avatar sx={{ bgcolor: 'success.main' }}>
                                <LoginIcon />
                            </Avatar>
                            <Typography startIcon={<LoginIcon />} component="h1" variant="h5" sx={{ color: "black" }}>
                                login
                            </Typography>
                        </Box>
                        <Box component="form" noValidate onSubmit={handleSubmit}>
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
                                login
                            </Button>
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Link className='auth-link' to="/users/signup">Create new account</Link>
                                <Link variant="contained" onClick={() => navigate(-1)}>Back</Link>
                            </Box>
                        </Box>
                    </Container>
                </Paper>
            </Box>
        </div>
    );
}
