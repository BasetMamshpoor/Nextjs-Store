import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import { IsInCart, quantityItem } from 'helper/functions';
import { CartContext } from 'providers/CartContextProvider';
import React, { useContext } from 'react';
import style from './Baner.module.css'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import Link from 'next/link';

const Baner = ({ product, size }) => {
    const { id, name, brand, offPercent, offPrice, price, image } = product

    const { state, dispatch } = useContext(CartContext)
    return (
        <>
            <div className={style.Hxiq3Dx}>
                <div className={style.jc4Rg}>
                    <div className={style.r4Alju}>
                        <div className={style.diSwk6}>
                            <img src={image}
                                alt="" />
                        </div>
                        <div className={style.UyrpV7}>
                            <p>{name}</p>
                        </div>
                    </div>
                    <div className={style.gtBwx_d}>
                        <div className={style.uv4FOo}>
                            <div className={style.ivrxo5}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                                    <path
                                        d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                                </svg>
                            </div>
                            {brand.name}
                        </div>
                        <div className={style.uv4FOo}>
                            <div className={style.ivrxo5}>
                                <svg fill="currentColor" viewBox="0 0 16 16">
                                    <path
                                        d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z">
                                    </path>
                                    <path
                                        d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z">
                                    </path>
                                </svg>
                            </div>
                            گارانتی سلامت فیزیکی کالا
                        </div>
                        <div className={style.uv4FOo}>
                            <div className={style.ivrxo5}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm6.43-5.228a7.025 7.025 0 0 1-3.658 3.658l-1.115-2.788a4.015 4.015 0 0 0 1.985-1.985l2.788 1.115zM5.228 14.43a7.025 7.025 0 0 1-3.658-3.658l2.788-1.115a4.015 4.015 0 0 0 1.985 1.985L5.228 14.43zm9.202-9.202-2.788 1.115a4.015 4.015 0 0 0-1.985-1.985l1.115-2.788a7.025 7.025 0 0 1 3.658 3.658zm-8.087-.87a4.015 4.015 0 0 0-1.985 1.985L1.57 5.228A7.025 7.025 0 0 1 5.228 1.57l1.115 2.788zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                </svg>
                            </div>
                            موجود در انبار
                        </div>
                    </div>
                    <div className={style.Ec3obT}>
                        {!!offPercent && <div className={style.vfdC}>
                            <span className={style.Roff}>%{e2p(offPercent)}</span>
                            <del className={style.Crprice}>{addComma(price.toString())}</del>
                        </div>}
                        <div className={style.P_priceR}>
                            {addComma(offPrice.toString())}
                        </div>
                    </div>
                    <div className={style.Tpn9Rq}>
                        {IsInCart(state, id + size.size) ? <>
                            <div className={style.Xdptve13}>
                                <button className={`${style.inCr_p} ${quantityItem(state, id + size.size) >= size.stock ? style.enughNumber : ''}`} onClick={() => dispatch({ type: 'INCREASE', payload: { ...product, idp: id + size.size } })}>
                                    <FiPlus />
                                </button>
                                <span className={style.NamBer_P}>{e2p(quantityItem(state, id + size.size))}</span>
                                <button className={style.deCri_p}>
                                    {quantityItem(state, id + size.size) < 2 ?
                                        <FiTrash2 onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { ...product, idp: id + size.size } })} /> :
                                        <FiMinus onClick={() => dispatch({ type: "DECREASE", payload: { ...product, idp: id + size.size } })} />
                                    }
                                </button>
                            </div>
                            <div className={style.VdxwPuu}>
                                مشاهده در
                                <Link href="/cart">سبد خرید</Link>
                            </div>
                        </> :
                            <button className={style.aDd_tO_CaRt} onClick={() => dispatch({ type: "ADD_ITEM", payload: { ...product, sizes: size, idp: id + size.size } })}>افزودن به سبد</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Baner;