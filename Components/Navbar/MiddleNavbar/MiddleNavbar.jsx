import { useContext } from 'react';
import style from './MiddleNavbar.module.css'
import Logo from 'public/Images/logo-no-background-transformed.png'
import { BsSearch, BsCart3, BsPerson } from 'react-icons/bs'
// import { GrUserAdmin } from "react-icons/gr";
import Link from 'next/link';
import { e2p } from 'Functions/ConvertNumbers';
import { CartContext } from 'providers/CartContextProvider';
import Image from 'next/image';
import { Authorization } from 'providers/AuthorizationProvider';

const MiddleNavbar = () => {

    const { state } = useContext(CartContext)
    const { user } = useContext(Authorization)

    return (
        <>
            <section className={style.middleNav}>
                <div className='container'>
                    <div className={style.navSearchTop}>
                        <div className={style.navLogo}>
                            <Link href='/'>
                                <Image src={Logo.src} alt="Logo" width={100} height={100} />
                            </Link>
                        </div>
                        <div className={`${style.navSearch} d-flex`}>
                            <form className={style.searchForm}>
                                <BsSearch />
                                <input type="text" placeholder="جستجو کنید ..." />
                            </form>
                        </div>
                        <div className={style.user}>
                            {/* <Link href={user.is_admin ? '/admin/new-product' : '/profile/information'} className={style.navUser}>
                                {user.is_admin ? <GrUserAdmin /> : <BsPerson />}
                            </Link> */}
                            <Link href='/profile/information' className={style.navUser}>
                                <BsPerson />
                            </Link>
                            <div className={style.border}></div>
                            <Link href='/cart' className={style.navCart}>
                                <div className={style.countItem}>
                                    <span>{!!state.itemsCounter && e2p(state.itemsCounter)}</span>
                                </div >
                                <BsCart3 />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MiddleNavbar;