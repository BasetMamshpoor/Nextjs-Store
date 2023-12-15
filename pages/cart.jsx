import { useContext } from 'react';
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
                        <div className="row mx-3">
                            <div className="col-lg-8">
                                <div className={style.SxSafd_b_3b}>
                                    <Product state={state.selectedItems} dispatch={dispatch} />
                                </div>
                                <div className={style.opTions}>
                                    {state.itemsCounter > 0 ?
                                        <button onClick={() => dispatch({ type: "CLEAR" })} className={style.clear}>پاک کردن سبد خرید</button>
                                        : null
                                    }
                                </div>
                            </div>
                            <div className="col-lg-4 pe-0 pe-lg-0">
                                <div className={style.banner_sticky}>
                                    <div className={style.jMszopl_9Y_1}>
                                        <div className={style.KvxUs_LlI}>
                                            <div className={style.lBsNaA_J}>
                                                <p>قیمت کالاها : </p>
                                                <span className={style.sWsRfAqS}>{addComma(state.total.toString())}</span>
                                            </div>
                                            <div className={`${style.lBsNaA_J} ${style.large_screen}`}>
                                                <p>جمع نهایی : </p>
                                                <span className={style.sWsRfAqS}>{addComma(state.total_after_off.toString())}</span>
                                            </div>
                                            <div className={style.lBsNaA_J}>
                                                <p>تعداد کالاها :</p>
                                                <span className={style.sWsRfAqS_}>{e2p(state.itemsCounter)} عدد</span>
                                            </div>
                                            <div className={`${style.lBsNaA_J} ${style.All_oFF_orDer}`}>
                                                <p>سود شما از خرید : </p>
                                                <span className={style.sWsRfAqS}>
                                                    <span className="ms-1">{state.total !== state.total_after_off && "%" + e2p(Math.ceil(100 - (state.total_after_off / state.total * 100)))}</span>
                                                    {addComma((state.total - state.total_after_off).toString())}
                                                </span>
                                            </div>
                                        </div>
                                        <button className={`${style.pq_HhFcy} ${style.large_screen}`}>ثبت سفارش</button>
                                        <div className={`${style.small_screen} ${style.nav_ORder}`}>
                                            <button className={`${style.pq_HhFcy} ${style.mobile_order}`}>ثبت سفارش</button>
                                            <div className={style.left_nav}>
                                                <p>جمع نهایی</p>
                                                <span className={`${style.sWsRfAqS}`}>{addComma(state.total_after_off.toString())}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p class={style.parag}>هزینه این سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از سبد حذف می‌شوند</p>
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