import { useContext } from 'react';
import Product from 'Components/Checkout/Cart/Product';
import style from 'styles/Cart.module.css'
import { CartContext } from 'providers/CartContextProvider';
import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import { Authorization } from 'providers/AuthorizationProvider';
import { HiOutlineLogin, HiChevronLeft } from "react-icons/hi";
import Link from 'next/link';
import { Functions } from 'providers/FunctionsProvider';
import { useRouter } from 'next/router';

const Cart = () => {
    const { state, dispatch } = useContext(CartContext)
    const { user } = useContext(Authorization)
    const { SwalStyled } = useContext(Functions)
    const { push } = useRouter()

    const handelSubmit = (e) => {
        e.preventDefault();
        if (user.is_admin) {
            SwalStyled.fire({
                title: '.قابل انجام نیست',
                text: 'شما ادمین هستید و قادر به ثبت سفارش نیستید',
                icon: "error",
                showCancelButton: true,
                confirmButtonText: "تغییر حساب"
            }).then((result) => {
                if (result.isConfirmed) {
                    push('/auth/login')
                }
            })
            return
        } else push('/checkout/payment')
    }

    return (
        <>
            <main>
                <div className={style.ZolpWn__0_} dir="rtl">
                    <div className="container">
                        <div className="row mx-3">
                            <div className="col-lg-8">
                                <div className={style.SxSafd_b_3b}>
                                    <Product state={state.items} dispatch={dispatch} />
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
                                    {Object.keys(user).length ? <>
                                        {!!state.itemsCounter && <>
                                            <div className={style.jMszopl_9Y_1}>
                                                <div className={style.KvxUs_LlI}>
                                                    <div className={style.lBsNaA_J}>
                                                        <p>قیمت کالاها ({e2p(state.itemsCounter)}) : </p>
                                                        <span className={style.sWsRfAqS}>{addComma(state.total.toString())}</span>
                                                    </div>
                                                    <div className={style.lBsNaA_J}>
                                                        <p>جمع نهایی : </p>
                                                        <span className={style.sWsRfAqS}>{addComma(state.total_after_off.toString())}</span>
                                                    </div>
                                                    <div className={`${style.lBsNaA_J} ${style.All_oFF_orDer}`}>
                                                        <p>سود شما از خرید : </p>
                                                        <span className={style.sWsRfAqS}>
                                                            <span className="ms-1">{state.total !== state.total_after_off && "%" + e2p(Math.ceil(100 - (state.total_after_off / state.total * 100)))}</span>
                                                            {addComma((state.total - state.total_after_off).toString())}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button onClick={handelSubmit} className={`${style.pq_HhFcy} ${style.large_screen}`}>ثبت سفارش</button>
                                                <div className={`${style.small_screen} ${style.nav_ORder}`}>
                                                    <button onClick={handelSubmit} className={`${style.pq_HhFcy} ${style.mobile_order}`}>ثبت سفارش</button>
                                                    <div className={style.left_nav}>
                                                        <p>جمع سبد خرید</p>
                                                        <span className={`${style.sWsRfAqS}`}>{addComma(state.total_after_off.toString())}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className={style.parag}>هزینه این سفارش هنوز پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از سبد حذف می‌شوند</p>
                                        </>}
                                    </> :
                                        <Link href='/auth/login' className={style.ubTfcr}>
                                            <div className={style.Ubhtcy}>
                                                <div className={style.bYhci2x}>
                                                    <div className={style.ybGtwER}><HiOutlineLogin /></div>
                                                    <div className={style.ybGtwEC}>ورود به حساب کاربری</div>
                                                    <div className={style.ybGtwEL}><HiChevronLeft /></div>
                                                </div>
                                                <div className={style.inTcye}>{!!state.itemsCounter ? 'برای ادامه ثبت سفارش لطفا وارد حساب کاربری خود شوید' : 'برای مشاهده محصولاتی که پیش‌تر به سبد خرید خود اضافه کرده‌اید وارد شوید.'}</div>
                                            </div>
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </>
    );
};

export default Cart;