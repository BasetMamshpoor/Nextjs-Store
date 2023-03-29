import React, { createContext, useEffect, useReducer } from 'react';
import reducer from 'Functions/reducer';


const initState = {
    selectedItems: [],
    itemsCounter: 0,
    total: 0,
    total_after_off: 0,
    checkout: false
}

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("cart"))) {
            dispatch({
                type: "INIT_STORED_CART",
                payload: JSON.parse(localStorage.getItem("cart")),
            });
        }
    }, []);


    return (
        <>
            <CartContext.Provider value={{ state, dispatch }}>
                {children}
            </CartContext.Provider>
        </>
    );
};

export default CartContextProvider;