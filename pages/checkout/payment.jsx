import { Authorization } from "providers/AuthorizationProvider";
import { CartContext } from "providers/CartContextProvider";
import { Functions } from "providers/FunctionsProvider";
import { useContext, useEffect } from "react";
import style from 'styles/Payment.module.css'
import { FaArrowRight } from "react-icons/fa";
import addComma from "Functions/addComma";
import { e2p } from "Functions/ConvertNumbers";
import Address from "Components/Checkout/Payment/Address";
import Discount from "Components/Checkout/Payment/Discount";
import Products from "Components/Checkout/Payment/Products";
import useGetPrivatRequest from 'hooks/useGetPrivatRequest'
import { useRouter } from "next/router";

const Payment = () => {
    const router = useRouter()
    const { state, dispatch } = useContext(CartContext)
    const { user, tokens } = useContext(Authorization)
    const { SwalStyled } = useContext(Functions)
    const [address, setAddress, reload] = useGetPrivatRequest('/profile/addresses')

    useEffect(() => {
        if (address && !address.length)
            SwalStyled.fire({
                title: "!آدرسی پیدا نشد",
                text: '.هنوز آدرسی برای ارسال مرسوله ثبت نکرده اید',
                confirmButtonText: "ثبت آدرس",
            }).then((result) => {
                if (result.isConfirmed) router.push('/profile/address?backUrl=/checkout/payment')
                else router.push('/checkout/cart')
            })
    }, [address])

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
        } else alert('درگاه پرداخت')
    }

    return (
        <>
            {(address && !!address.length) && <div className={style.payment}>
                <div className="container">
                    <nav className={style.navbar}>
                        <div className={style.go_back} onClick={() => router.back()}><FaArrowRight /></div>
                        <div className={style.nav_logo}>
                            <div className={style.logo}><img src='../Images/logo-no-background-transformed.png' alt="" /></div>
                        </div>
                    </nav>
                    <div className={style.row}>
                        <div className={style.column_lg}>
                            <Address address={address} reload={reload} SwalStyled={SwalStyled} user={user} tokens={tokens} />
                            <Discount />
                            <div className={style.products}>
                                <Products state={state.selectedItems} dispatch={dispatch} />
                            </div>
                        </div>
                        <div className={style.column_sm}>
                            <div className={style.prices}>
                                <div className={style.jMszopl_9Y_1}>
                                    <div className={style.KvxUs_LlI}>
                                        <div className={style.lBsNaA_J}>
                                            <p>قیمت کالاها ({e2p(state.itemsCounter)}) : </p>
                                            <span className={style.sWsRfAqS}>{addComma(state.total.toString())}</span>
                                        </div>
                                        <div className={style.lBsNaA_J}>
                                            <p>هزینه ارسال : </p>
                                            <span className={style.sWsRfAqS2}>رایگان</span>
                                        </div>
                                        <div className={`${style.lBsNaA_J} ${style.All_oFF_orDer}`}>
                                            <p>سود شما از خرید : </p>
                                            <span className={style.sWsRfAqS}>
                                                <span className="ms-1">({state.total !== state.total_after_off && e2p(Math.ceil(100 - (state.total_after_off / state.total * 100))) + "%"})</span>
                                                {addComma((state.total - state.total_after_off).toString())}
                                            </span>
                                        </div>
                                        <div className={style.lBsNaA_J}>
                                            <p>قابل پرداخت : </p>
                                            <span className={style.sWsRfAqS}>{addComma(state.total_after_off.toString())}</span>
                                        </div>
                                    </div>
                                    <button onClick={handelSubmit} className={`${style.pq_HhFcy} ${style.large_screen}`}>ثبت سفارش</button>
                                    <div className={`${style.small_screen} ${style.nav_ORder}`}>
                                        <button onClick={handelSubmit} className={`${style.pq_HhFcy} ${style.mobile_order}`}>ثبت سفارش</button>
                                        <div className={style.left_nav}>
                                            <p>قابل پرداخت</p>
                                            <span className={`${style.sWsRfAqS}`}>{addComma(state.total_after_off.toString())}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Payment;