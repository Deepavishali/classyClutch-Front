import React from 'react'
import {Box, AppBar, Toolbar, Typography} from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCartContext } from './context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useUsernameContext } from './Bags';

function Cart() {
    const { cart, removeItem, setDecrease, setIncrease, clearCart, total_price, total_items } = useCartContext()
    // const  {username} = useUsernameContext()
    let navigate = useNavigate()

     const token = localStorage.getItem("Authorization")

     if(!token){
       navigate("/")
     }
     
  return <>
   <AppBar className='navbar' position="static">
            <Toolbar>
                <Typography  className='logo' variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Classy<span className='logo-F'>clu</span>tches
                </Typography>
                <Button onClick={() => navigate('/bags/menu/cart/checkout')} color="inherit">Checkout</Button>
            </Toolbar>
        </AppBar>
  <Box sx={{width:{xs:"85%",sm:"90%",md:"85%"},margin:"0px auto",padding:"20px 0px"}}>

{
    cart.length > 0  && cart ? cart.map((e,i) => {

        const { _id, name, image, price, Variants, Quantity } = e
        // console.log(price)
        // let total = price * Quantity
        // const price = bags.prices[0][Variants] * [Quantity]
        return (
            <Paper key={_id} sx={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:{xs:1,sm:3,md:8},flexWrap:"wrap",margin:"30px 0px",flexDirection:{xs:"column",sm:"row",md:"row",padding:"12px"}}}>
             <Box
        component="img"
        sx={{
            margin:0,
          objectFit:'cover',
          objectPosition:"top",
          width: { xs: '80px',sm:"80px", md: '100px' },
          height:"80px"
        }}
        alt="The house from the offer."
        src={image}
        />
        <p style={{fontSize:"13px",fontWeight:700,margin:"8px 0px"}}>{name}<br/></p>
        <p style={{fontSize:"13px",fontWeight:700,margin:"8px 0px"}}>₹{price}/-</p>
<Button>
    <RemoveIcon onClick={() => setDecrease(_id)} sx={{cursor:"pointer"}}/>
    </Button>
    <span style={{fontSize:"25px"}}>
        {cart ? Quantity : null}
        </span>
        <Button>
    <AddIcon onClick={() => setIncrease(_id)} sx={{cursor:"pointer"}}/>
    </Button>
        <p style={{fontSize:"13px",fontWeight:700,margin:"8px 0px"}}>{Variants}</p>
        <p style={{fontSize:"13px",fontWeight:700,margin:"8px 0px"}} onClick={() => removeItem(_id)}><DeleteIcon color='error' sx={{cursor:"pointer"}}/></p>
        {/* <p>The individual Price of {name} is {total} </p> */}
            </Paper>
        )
    })
    :
    <p style={{fontSize:"20px",fontWeight:700,margin:"8px 0px", textAlign:"center"}}>Oops! Your Cart is Empty 🫡</p>
}
<hr/>
<Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<Button variant="contained" color='success' sx={{padding:"7px 15px",margin:"8px 0px 8px 0px"}} onClick={() => navigate(-1)}>Continue Shopping 😋</Button>
{/* `bags/menu/${username}` */}
{
    cart.length > 0 && cart ? <Button variant="contained" color='success' sx={{padding:"7px 15px",margin:"8px 0px 8px 0px"}} onClick={clearCart}>Clear Cart</Button>
    :
    null
}

</Box>
<hr/>

<Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    {
        cart.length > 0  && cart ? <p style={{fontSize:"14px",fontWeight:700,margin:"8px 0px"}}>TotalItems</p> : null
    }

    {
        cart.length > 0  && cart ? <p style={{fontSize:"14px",fontWeight:700,margin:"8px 0px"}}>{total_items}</p> : null
    }
</Box>
<Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
    {
        cart.length > 0  && cart ? <p style={{fontSize:"14px",fontWeight:700,margin:"8px 0px"}}>OrderTotal</p> : null
    }

    {
        cart.length > 0  && cart ? <p style={{fontSize:"14px",fontWeight:700,margin:"8px 0px"}}>₹{total_price}/-</p> : null
    }
</Box>
<hr/>
{
    cart.length > 0  && cart ? <Button variant="contained" color='success' sx={{padding:"7px 15px",margin:"8px 0px 8px 0px",width:"100%"}} onClick={() => navigate("/bags/menu/cart/checkout")}>CheckOut</Button>
    :
    null
}

  </Box>
  </>
}

export default Cart