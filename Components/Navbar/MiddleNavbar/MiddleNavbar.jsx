import React, { useContext } from 'react';
import style from './MiddleNavbar.module.css'
import Logo from 'public/Images/logo-no-background-transformed.png'
import { BsSearch, BsCart3, BsPerson } from 'react-icons/bs'
import Link from 'next/link';
import { e2p } from 'Functions/ConvertNumbers';
import { CartContext } from 'providers/CartContextProvider';

const MiddleNavbar = () => {
    const { state } = useContext(CartContext)
    return (
        <>
            <section className={style.middleNav}>
                <div className='container'>
                    <div className={style.navSearchTop}>
                        <div className={style.navLogo}>
                            <Link href='/'>
                                <img src={Logo.src} alt="Logo" />
                            </Link>
                        </div>
                        <div className={`${style.navSearch} d-flex`}>
                            <form className={style.searchForm}>
                                <BsSearch />
                                <input type="text" placeholder="سرچ کنید ..." />
                            </form>
                        </div>
                        <div className={style.user}>
                            <Link href='/cart' className={style.navCart}>
                                <div className={style.countItem}>
                                    <span>{e2p(state.itemsCounter)}</span>
                                </div >
                                <BsCart3 />
                            </Link>
                            <div className={style.border}></div>
                            <Link href='/profile' className={style.navUser}>
                                <BsPerson />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MiddleNavbar;