import React from 'react';
import style from './Banner.module.css'
import Link from 'next/link';
import Image from 'next/image';
import useGetRequest from 'hooks/useGetRequest';
const Banner = () => {
    const [banners] = useGetRequest('/banners', 1, { type: 'homepage', order: 0 })
    return (
        <>
            <div className={style.Banner}>
                <div className="container">
                    <div className={style.wrapper}>
                        {banners && banners.map(b => {
                            return (
                                <div className={style.baner} key={b.id}>
                                    <Link href={b.link} className={style.link}>
                                        <Image src={b.src} placeholder='blur' blurDataURL='/Images/placeholder-1.png' unoptimized={true} width={100} height={100} alt='' />
                                    </Link>
                                </div>)
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;