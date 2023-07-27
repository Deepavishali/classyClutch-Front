import React from "react";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global.js";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function BagDetails() {
  const navigate = useNavigate();
  const { id, username } = useParams();
  const [BagDetail, setBagDetail] = useState({});
  // const getUserDetails = () => {

  // }
  useEffect(() => {
    fetch(`${API}/bags/menu/${id}`)
      .then((data) => data.json())
      .then((msg1) => setBagDetail(msg1));
  }, [id]);
  const styles = {
    // Ternary Operator
    color: BagDetail.category === "nonveg" ? "red" : "green",
    fontSize: "20px",
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  const [value, setValue] = React.useState(2);
  const rating =(event, newValue) => {
    setValue(newValue);
    toast.success('Thank you 🎊🎊!', {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
  }
  return (
    <>
      {/* <div className="bag-sd"> */}
        <AppBar className="navbar" position="static">
          <Toolbar>
            <Typography
              onClick={() => navigate("/bags/menu")}
              className="logo"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Piz<span className="logo-F">za</span>Hunt
            </Typography>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "Top", horizontal: "right" }}
              variant="dot"
            >
              <Button startIcon={<AccountCircleIcon />} color="inherit">
                {username}
              </Button>
            </StyledBadge>
            <Button
              onClick={() => navigate(`/bags/menu/${username}`)}
              color="inherit"
            >
              Back to Bags
            </Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ minHeight: "100vh", marginTop: "1rem" }}>
          <Box
            sx={{
              width: "70%",
              margin: "0px auto",
              display: "flex",
              gap: 1,
              flexDirection: { xs: "column", sm: "row", md: "row" },
            }}
          >
            <Box
              component="img"
              sx={{
                marginTop: 5,
                objectFit: "cover",
                objectPosition: "center",
                height: { xs: 350, md: 450 },
                width: { xs: "210", md: "410" },
                borderRadius: "5%",
              }}
              alt="The house from the offer."
              src={BagDetail.image}
            />
            <Box
              sx={{
                padding: { xs: "20px 20px", sm: "70px 20px", md: "70px 50px" },
                textAlign: { xs: "left", sm: "left" },
              }}
            >
              <h1 style={{ fontSize: "20px" }}>
                {BagDetail.name}
              </h1>
                <Rating
                sx={{backgroundColor:"whitesmoke", borderRadius:"5%"}}
                  name="simple-controlled"
                  value={value}
                  onChange={rating}
                  
                />
              <h1 style={styles}>
                {BagDetail.category}
              </h1>
              <Button
                variant="contained"
                color="success"
                startIcon={<ArrowLeftIcon />}
                onClick={() => navigate(`/bags/menu/${username}`)}
              >
                Back
              </Button>
            </Box>
          </Box>
        </Box>
      {/* </div> */}
    </>
  );
}
