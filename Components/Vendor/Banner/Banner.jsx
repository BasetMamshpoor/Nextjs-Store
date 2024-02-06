import React, { useContext } from 'react';
import style from './Banner.module.css'
import createModal from 'Components/Modal';
import { FiEdit3 } from "react-icons/fi";
import Link from 'next/link';
import Image from 'next/image';
import NewBanner from './NewBanner';
import useGetRequest from 'hooks/useGetRequest';
import { Functions } from 'providers/FunctionsProvider'
const Banner = () => {
    const [banners, setBaneers, reload] = useGetRequest('/admin/banners', 1, { type: 'homepage' })
    const { SwalStyled } = useContext(Functions)
    return (
        <>
            <div className={style.Banner}>
                <div className={style.content}>
                    <div className={style.header}>
                        <h3>بنر های صفحه اصلی</h3>
                    </div>
                    <div className={style.banners}>
                        {banners && banners.map(b => {
                            return (
                                <div className={style.baner}>
                                    <Link href={b.link} className={style.link}>
                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={b.src} alt="" />
                                    </Link>
                                    <span className={style.option} onClick={() => createModal(<NewBanner data={b} reload={reload} SwalStyled={SwalStyled} />)}><FiEdit3 /></span>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;