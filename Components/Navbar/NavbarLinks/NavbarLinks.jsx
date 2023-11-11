import { useEffect, useState } from 'react';
import style from './NavbarLinks.module.css'
import { RxHamburgerMenu } from 'react-icons/rx'
import Category from '../Category';
import Link from 'next/link';

const NavbarLinks = () => {
    const [flow, setFlow] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', checkScroll)
        return () => window.removeEventListener('scroll', checkScroll)
    }, [])

    function checkScroll() {
        if (document.documentElement.scrollTop > 10) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }


    return (
        <>
            <section className={`${style.navBar} ${isScrolled ? style.hidden : ''}`}>
                <div className='container'>
                    <nav className={style.kBud}>
                        <div className={style.category}>
                            <Link href='/category-womens-apparel' className={`${style.categoryBurger} ${flow ? style.hover : ''}`} onMouseEnter={() => setFlow(true)} onMouseLeave={() => setFlow(false)}>
                                <span>
                                    <RxHamburgerMenu />
                                </span>
                                <p>دسته بندی</p>
                            </Link>
                            <Category flow={flow} setFlow={setFlow} />
                        </div>
                        <span className={style.border}></span>
                        <div className={style.navBarLinks}>
                            <ul className={style.eopfu}>
                                <li><Link href="/">خانه</Link></li>
                                <li><Link href="">پرفروش&zwnj;ترین&zwnj;ها</Link></li>
                                <li><Link href="">تخفیف&zwnj;ها و پیشنهادات</Link></li>
                                <li><Link href="/profile/information">حساب کاربری</Link></li>
                                <li><Link href="/admin/new-product">حساب فروشنده</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </section>
        </>
    );
};

export default NavbarLinks;
