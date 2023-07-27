import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'

import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate();
    return <>
        <div className='home-sd'>
            <AppBar className='navbar' position="relative">
                <Toolbar>
                    <Typography onClick={() => navigate('/')} className='logo' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Classy<span className='logo-F'>clu</span>tches
                    </Typography>
                    <Button onClick={() => navigate('/users/login')} color="inherit">Login</Button>
                    <Button onClick={() => navigate('/users/signup')} color="inherit">Signup</Button>
                </Toolbar>
            </AppBar>
            <div className='intro-container' >
                <div className='intro'>
                    <h1> Classy<span className='logo-F'>clu</span>tches</h1>
                    <h1>Discover Your Style, Carry Your Dreams !<p>Where Fashion Meets Function!</p></h1>
                    <h1>Welcome to Classy clutches</h1>
                </div>
                <Button
                    color="success"
                    className='viewProducts'
                    variant="contained"
                    onClick={() => navigate('/users/signup')}
                >
                    View Bags
                </Button>
            </div>
        </div>
    </>
}