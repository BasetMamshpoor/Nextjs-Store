
import Logo from 'public/Images/logo-no-background-transformed.png'
import style from './Footer.module.css'
import { SiInstagram, SiTelegram, SiLinkedin } from "react-icons/si";
import { IoIosArrowUp } from 'react-icons/io'
import Link from 'next/link';


const Footer = () => {
    return (
        <>
            <footer className={style.footer}>
                <div className="container" dir="rtl">
                    <div className="row py-5">
                        <div className="col-lg-3">
                            <p>خرید</p>
                            <ul className={style.Rsq_iunt}>
                                <li><Link href="">زنانه</Link></li>
                                <li><Link href="">مردانه</Link></li>
                                <li><Link href="">بچگانه</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <p>خدمات مشتریان</p>
                            <ul className={style.Rsq_iunt}>
                                <li><Link href="">سوالات متداول</Link></li>
                                <li><Link href="">توضیحات بازگشت کالا</Link></li>
                                <li><Link href="">شرایط استفاده</Link></li>
                                <li><Link href="">حریم خصوصی</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <p>اطلاعات وبسایت</p>
                            <ul className={style.Rsq_iunt}>
                                <li><Link href="">درباره ما</Link></li>
                                <li><Link href="">تماس با ما</Link></li>
                                <li><Link href="">همکاری با ما</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-3">
                            <div className={style.Jcps}>
                                <Link href="el:0211234567">پشتیبانی: ۰۹۲۱۱۲۳۴۵۶۷۴</Link>
                                <div className={style.backToTop}>
                                    <Link href="">
                                        <IoIosArrowUp />
                                    </Link>
                                </div>
                            </div>
                            <div className={style.social}>
                                <Link href="">
                                    <SiInstagram />
                                </Link>
                                <Link href="">
                                    <SiTelegram />
                                </Link>
                                <Link href="">
                                    <SiLinkedin />
                                </Link>
                            </div>
                            <div className={style.hWsZ1a_o0}>
                                <Link href="">قوانین و مقررات</Link>
                                <Link href='' className={style.kLogo}>
                                    <img src={Logo.src} alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;