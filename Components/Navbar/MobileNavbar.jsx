import React, { useContext } from 'react';
import style from './MobileNavbar.module.css'
import { BsPerson, BsSearch, BsHouse, BsCart, BsHouseFill, BsCartFill, BsPersonFill } from 'react-icons/bs'
import { MdCategory, MdOutlineCategory } from 'react-icons/md'
import Logo from 'public/Images/logo-no-background-transformed.png'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartContext } from 'providers/CartContextProvider';
import { e2p } from 'Functions/ConvertNumbers';


const MobileNavbar = () => {
    const router = useRouter()
    const { state } = useContext(CartContext)


    const Menu = () => {
        let arr = [
            { route: '/', iconOutline: <BsHouse />, iconeFill: <BsHouseFill />, value: 'خانه' },
            { route: '/category-womens-apparel', iconOutline: <MdOutlineCategory />, iconeFill: <MdCategory />, value: 'دسته بندی' },
            { route: '/cart', iconOutline: <BsCart />, iconeFill: <BsCartFill />, value: 'سبد خرید' },
            { route: '/profile', iconOutline: <BsPerson />, iconeFill: <BsPersonFill />, value: 'صفحه من' },
        ]
        return arr.map((obj, i) => {
            let isActive = obj.route === router.asPath
            return (
                <li className={style.item} key={i}>
                    <Link className={`${style.link} ${isActive ? style.active : ''}`} href={obj.route}>
                        <div className={style.menuIcone}>
                            {isActive ? obj.iconeFill : obj.iconOutline}
                            {obj.route === '/cart' && state.itemsCounter > 0 &&
                                <div className={style.itemsCounter}><span>{e2p(state.itemsCounter)}</span></div>}
                        </div>
                        <span className={style.name}>{obj.value}</span>
                    </Link>
                </li>
            )
        })
    }

    return (
        <>
            <header className={style.header}>
                <div className={style.navbar}>
                    <div className={style.search}>
                        <div className={style.content}>
                            <div className={style.searchIcon}><BsSearch /></div>
                            <span className={style.placeholder}>
                                <span>جستجو در</span>
                                <div className={style.mobileLogo}>
                                    <Image src={Logo.src} alt="Logo" width={100} height={100} />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </header>
            <section className={style.menu}>
                <div className={style.Exune}>
                    <ul className={style.wrapper}>
                        {Menu()}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default MobileNavbar;