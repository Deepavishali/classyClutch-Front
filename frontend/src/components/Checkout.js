import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useCartContext } from './context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Checkout() {

  const { cart, total_price, total_items, clearCart } = useCartContext()
  const { username } = useParams();
  const handleClick = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const handlesubmit = async () => {
    var options = {
      key: "rzp_test_qu1KoA68eLHlo5",
      key_secret: "pjRGb1ia4DzPJIoO0Ds8PKKl",
      amount: total_price * 100,
      currency: "INR",
      name: "Payment",
      description: "Making payment",
      handler: function (response) {
        toast.success("Payment Successful! Payment ID: " + response.razorpay_payment_id, {
          position: "top-center",
          autoClose: 2000,
          color: "white"
        })
      },
      prefill: {
        name: "",
        email: "deepavishalig@gmail.com",
        contact: "9876543201"
      },
      notes: {
        address: "Razorpay Corporate office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
    await clearCart();
    navigate("/users/login")
  }


  let navigate = useNavigate()

  const token = localStorage.getItem("Authorization")

  if (!token) {
    navigate("/")
  }

  return <>
    <AppBar className='navbar' position="static">
      <Toolbar>
        <Typography className='logo' variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Classy<span className='logo-F'>clu</span>tches
        </Typography>
        <Button onClick={() => navigate('/bags/menu/cart')} color="inherit">Cart</Button>
        <Button onClick={handleClick} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
    <Paper sx={{ padding: "30px 10px", width: { xs: "95%", sm: "90%", md: "50%" }, margin: "0px auto", textAlign: "center", marginTop: "10px" }}>
      <h4 style={{ fontSize: "14px", lineHeight: "20px" }}>Make Your Payment here by Entering Your Address to send the Product to Your Address.</h4>


      {
        cart.map((e, i) => {
          const { _id, name, image, price, Variants, Quantity } = e
          let total = price * Quantity
          return (
            <Paper key={_id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: { xs: 1, sm: 3, md: 3 }, flexWrap: "wrap", margin: "30px 0px", flexDirection: { xs: "column", sm: "row", md: "row", padding: "12px" } }}>
              <Box
                component="img"
                sx={{
                  margin: 0,
                  objectFit: 'cover',
                  objectPosition: "top",
                  width: { xs: '80px', sm: "80px", md: '100px' },
                  height: "80px"
                }}
                alt="The house from the offer."
                src={image}
              />
              <p style={{ fontSize: "14px", fontWeight: 700, margin: "8px 0px" }}>Name<br /><br />{name}</p>
              <p style={{ fontSize: "14px", fontWeight: 700, margin: "8px 0px" }}>Price<br /><br />₹{price}</p>
              <p style={{ fontSize: "14px", fontWeight: 700, margin: "8px 0px" }}>Quantity<br /><br />{Quantity}</p>
              <p style={{ fontSize: "14px", fontWeight: 700, margin: "8px 0px" }}>Total Price<br /><br />₹{total}</p>
              {/* <p>{name}</p> */}
            </Paper>
          )
        })
      }

      <hr />

      <p style={{ fontSize: "14px", fontWeight: 700, margin: "8px 0px" }}>Total Order Amount<br /><br />₹{total_price}</p>

      <hr />


      <Button variant="contained" color="success" sx={{ padding: "7px 15px", margin: "8px 0px 8px 0px", width: "100%" }} onClick={() => handlesubmit()}>Make Payment</Button>
    </Paper>

  </>
}

export default Checkout

