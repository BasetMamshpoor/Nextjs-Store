import React from 'react';
import style from './Banner.module.css'
import createModal from 'Components/Modal';
import { FiEdit3 } from "react-icons/fi";
import Link from 'next/link';
import Image from 'next/image';
import New from '../New';

const Banner = () => {
    return (
        <>
            <div className={style.Banner}>
                <div className={style.content}>
                    <div className={style.header}>
                        <h3>بنر های صفحه اصلی</h3>
                    </div>
                    <div className={style.banners}>
                        <div className={style.baner}>
                            <Link href={''} className={style.link}>
                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={'/Images/banner/1.webp'} alt="" />
                            </Link>
                            <span className={style.option} onClick={() => createModal(<New />)}><FiEdit3 /></span>
                        </div>
                        <div className={style.baner}>
                            <Link href={''} className={style.link}>
                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={'/Images/banner/2.webp'} alt="" />
                            </Link>
                            <span className={style.option}><FiEdit3 /></span>
                        </div>
                        <div className={style.baner}>
                            <Link href={''} className={style.link}>
                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={'/Images/banner/3.webp'} alt="" />
                            </Link>
                            <span className={style.option}><FiEdit3 /></span>
                        </div>
                        <div className={style.baner}>
                            <Link href={''} className={style.link}>
                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={'/Images/banner/4.webp'} alt="" />
                            </Link>
                            <span className={style.option}><FiEdit3 /></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;