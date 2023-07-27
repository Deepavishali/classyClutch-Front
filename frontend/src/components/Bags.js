import React, {useState, useContext} from 'react';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { useCartContext } from './context/CartContext';
import InfoIcon from '@mui/icons-material/Info';
const UsernameContext = React.createContext()
 function Bags({ bag, id, username, children}) {
     console.log(bag)
    const [Quantity, setQuantity] = useState(1)
    const [sizes, setSizes] = useState('smallchecked')
    const handleChange1 = (event) => {
        setSizes(event.target.value);
    };
    const handleChange2 = (event) => {
        setQuantity(event.target.value)
    }

    const navigate = useNavigate()
    const price = bag.prices[0][sizes] * [Quantity]
    console.log(price)
    const {addtoCart}= useCartContext()
    // console.log( cart, user)
    const token = localStorage.getItem("Authorization")

    if(!token){
      navigate("/")
    }
    return <>
        <Card className="bag-container"
            elevation={12} sx={{
                margin: 2,
                width: "300px",
                borderRadius: 5,
                backgroundColor:"hsl(0deg 1% 18%)"
            }}>

            <Box
                component="img"
                sx={{
                    margin: 0,
                    cursor: "pointer",
                    objectFit: 'cover',
                    objectPosition: 'center',
                    height: '200px',
                    width: { xs: "100%", md: "100%" },
                    borderRadius: "2%"
                }}
                alt={bag.name}
                src={bag.image}
            />
            <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h8" sx={{ marginBottom: "15px", fontSize: "1rem", color:"whitesmoke" }} component="div">
                        {bag.name}
                        <IconButton color="primary" size="smallchecked" onClick={() => navigate(`/bags/menu/${username}/${id}`)}>
                            <InfoIcon />
                        </IconButton>
                    </Typography>
                </Box>
                <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ mixWidth: 20 }}>
                        <FormControl size="medium">
                            <InputLabel id="demo-simple-select-label"  sx={{color:"whitesmoke"}}>Sizes👜</InputLabel>
                            <Select
                            fullWidth
                            color='primary'
                            sx={{color:"whitesmoke"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={sizes}
                                label="sizes"
                                onChange={handleChange1}
                            >
                                {bag.sizes.map(n => {
                                    return <MenuItem value={n}>{n}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ mixWidth: 20 }}>
                        <FormControl size="medium">
                            <InputLabel id="demo-simple-select-label" sx={{color:"whitesmoke"}}>Quantity🤔</InputLabel>
                            <Select
                            fullWidth
                            sx={{color:"whitesmoke"}}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={Quantity}
                                label="Quantity🤔"
                                onChange={handleChange2}
                            >
                                {[...Array(10).keys()].map((n) => {
                                    return <MenuItem value={n + 1}>{n + 1}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Typography>
                <Typography variant="body2" sx={{ display: "flex", justifyContent: "space-between", gap: 1, marginTop: "15px" }}>
                    <Typography variant="h6"sx={{color:"whitesmoke"}}>Price: ₹{price} /-</Typography>
                    <Button variant="contained" sx={{ cursor: "pointer", fontSize: "13px" }} color="success" onClick={()=> addtoCart(bag, Quantity, sizes, price)}>Add to Cart</Button>
                </Typography>
            </CardContent>
        </Card>
        <UsernameContext.Provider values={username}>{children}</UsernameContext.Provider>
    </>;
}

const useUsernameContext = () => {
    return useContext(UsernameContext)
}
export { Bags, useUsernameContext}