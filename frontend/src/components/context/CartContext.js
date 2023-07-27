import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/CartReducer'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CartContext = createContext();

// const getLocalCartData = () => {
//     let newCartData = localStorage.getItem("dressCart")
//     if(newCartData === []){
//         return []
//     }else if(newCartData === "null"){
//         return []
//     }
//     else{
//         return JSON.parse(newCartData)
//     }
// }

const initialState = {
    cart:[],
    total_items:"",
    total_price:"",
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addtoCart = (bag, Quantity, Variants, price) => {
        dispatch({type:"ADD_TO_CART", payload:{bag, Quantity, Variants, price}})
        toast.success('Items Added to the cart🍕🎊',{
            position: "top-center",
            autoClose: 2000,
            color:"white"
        })
    }
    const removeItem = (_id) => {
      dispatch({type:"REMOVE_ITEM", payload:_id})
    }
  const setDecrease = (_id) => {
    dispatch({type:"SET_DECREASE", payload:_id})
    }

const setIncrease = (_id) => {
    dispatch({type:"SET_INCREASE", payload:_id})
    }
    const clearCart = () => {
      dispatch({ type: "CLEAR_CART" })
  }
  useEffect(() => {
    dispatch({ type: "CAR_TOTAL_ITEM" })
    dispatch({ type: "CAR_TOTAL_PRICE" })
    localStorage.setItem("BagCart", JSON.stringify(state.cart))
},[state.cart])
    return <CartContext.Provider value={{...state, addtoCart, removeItem, clearCart, setDecrease, setIncrease }}>{children}</CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext)
}

export  { CartProvider, useCartContext}