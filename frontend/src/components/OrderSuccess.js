import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export function OrderSuccess() {
  const navigate = useNavigate();
  const styles = {
    color: "green"
  };
  const handleClick = ()=>{
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }
  return (
    <div>
      <AppBar className='navbar' position="relative">
        <Toolbar>
          <Typography onClick={() => navigate('/')} className='logo' variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Piz<span className='logo-F'>za</span>Hunt
          </Typography>
          <Button onClick={handleClick} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <div className='order-success'>
        <h3 style={styles}>Order successfully placed.</h3>
        <h4>Thank you for Ordered Check your mail to Track your Bags. Visit again.</h4>
      </div>
    </div>
  );
}
