import React from 'react';
import style from './MobileNavbar.module.css'
import { BsSearch } from 'react-icons/bs'
import Logo from 'public/Images/logo-no-background-transformed.png'
import Image from 'next/image';

const MobileNavbar = () => {
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
        </>
    );
};

export default MobileNavbar;