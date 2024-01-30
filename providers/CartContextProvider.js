import { createContext, useEffect, useReducer } from 'react';
import reducer from 'Functions/reducer';
import axios from 'axios';
import { useRouter } from 'next/router';


const initState = {
    selectedItems: [],
    itemsCounter: 0,
    total: 0,
    total_after_off: 0,
    checkout: false
}

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
    const router = useRouter()

    const [state, dispatch] = useReducer(reducer, initState)

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem("cart"));
        if (storage) {
            dispatch({
                type: "INIT_STORED_CART",
                payload: storage
            });
            if (router.asPath === '/cart') {
                const update = async () => {
                    await axios.post('/check-cart', storage.selectedItems)
                        .then(res => {
                            dispatch({
                                type: "UPDATE_CART",
                                payload: res.data
                            })
                        })
                        .catch(err => console.log(err))
                }
                update()
            }
        }
    }, [router]);

    return (
        <>
            <CartContext.Provider value={{ state, dispatch }}>
                {children}
            </CartContext.Provider>
        </>
    );
};

export default CartContextProvider;