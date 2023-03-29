import React, { useContext } from 'react';
import Product from 'Components/Cart/Product';
import style from 'styles/Cart.module.css'
import { CartContext } from 'providers/CartContextProvider';
import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';

const Cart = () => {
    const { state, dispatch } = useContext(CartContext)
    return (
        <>
            <main>
                <div className={style.ZolpWn__0_} dir="rtl">
                    <div className="container">
                        <div className="row">
                            <div className="col-9">
                                <div className={style.SxSafd_b_3b}>
                                    <Product state={state.selectedItems} dispatch={dispatch} />
                                </div>
                                <div className={style.opTions}>
                                    {state.itemsCounter > 0 ?
                                        <button onClick={() => dispatch({ type: "CLEAR" })}>پاک کردن سبد خرید</button>
                                        : null
                                    }
                                </div>
                            </div>
                            <div className="col-3 p-0">
                                <div className={style.jMszopl_9Y_1}>
                                    <div className={style.KvxUs_LlI}>
                                        <div className={style.lBsNaA_J}>
                                            <p>قیمت کالاها : </p>
                                            <span className={style.sWsRfAqS}>{addComma(state.total.toString())}</span>
                                        </div>
                                        <div className={style.lBsNaA_J}>
                                            <p>جمع نهایی : </p>
                                            <span className={style.sWsRfAqS}>{addComma(state.total_after_off.toString())}</span>
                                        </div>
                                        <div className={style.lBsNaA_J}>
                                            <p>تعداد کالاها :</p>
                                            <span className={style.sWsRfAqS_}>{e2p(state.itemsCounter)}</span>
                                        </div>
                                        <div className={`${style.lBsNaA_J} ${style.All_oFF_orDer}`}>
                                            <p>سود شما از خرید : </p>
                                            <span className={style.sWsRfAqS}>
                                                <span className="ms-1">{state.total !== state.total_after_off && "%" + e2p(Math.ceil(100 - (state.total_after_off / state.total * 100)))}</span>
                                                {addComma((state.total - state.total_after_off).toString())}
                                            </span>
                                        </div>
                                    </div>
                                    <button className={style.pq_HhFcy}>ادامه</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Cart;