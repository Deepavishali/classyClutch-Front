let CartReducer = (state,action) => {

    if(action.type === "ADD_TO_CART"){

    let { bag, Quantity, Variants, price} = action.payload;


        let cartProduct;

        cartProduct = {
            _id: bag._id,
            name: bag.name,
            image: bag.image,
            price:price,
            Variants:Variants,
            Quantity:Quantity
        };
    
        return {
            ...state,
            cart:[...state.cart, cartProduct]
        }

    }
    
    if(action.type === "SET_DECREASE"){
        let updatedCart = state.cart.map((cur) => {
            if(cur._id === action.payload){
                let decreamentAmount = cur.Quantity - 1
                if(decreamentAmount === 0){
                    decreamentAmount = cur.Quantity - 0
                }
                return {
                    ...cur,
                    Quantity : decreamentAmount
                }
            }else{
                return cur;
            } 
        })
        return {
            ...state,
            cart : updatedCart
        }
    }

    if(action.type === "SET_INCREASE"){
        let updatedCart = state.cart.map((cur) => {
            if(cur._id === action.payload){
                let decreamentAmount = cur.Quantity + 1
                return {
                    ...cur,
                    Quantity : decreamentAmount
                }
            }else{
                return cur;
            } 
        })
        return {
            ...state,
            cart : updatedCart
        }
    }
    if(action.type === "CLEAR_CART"){
        return {
            ...state,
            cart : [],
        }
    }
    if(action.type === "REMOVE_ITEM"){

        let updatedItems = state.cart.filter((cur) => cur._id !== action.payload)

        return {
            ...state,
            cart : updatedItems
        }
    }
    if(action.type === "CAR_TOTAL_ITEM"){

        let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
            let { Quantity } = curElem;

        initialVal = initialVal + Quantity
        return initialVal

        }, 0)

        return {
            ...state,
            total_items : updatedItemVal
        }

    }

    if(action.type === "CAR_TOTAL_PRICE"){

        let totalPrice = state.cart.reduce((initialVal, curElem) => {
            let { price, Quantity } = curElem;
            initialVal = initialVal + price * Quantity
            return initialVal
        }, 0)
        return {
            ...state,
            total_price : totalPrice
        }
        
    }

  return state     
    }
export default CartReducer;