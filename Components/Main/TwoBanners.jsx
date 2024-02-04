import React from 'react';
import style from './TwoBanners.module.css'
import useRequest from 'hooks/useRequest';
import Link from 'next/link';
import Image from 'next/image';


const TwoBanners = () => {

    const [banners] = useRequest('/banners', 1, { type: 'homepage', order: 1 })

    return (
        <>
            <div className={style.Banner}>
                <div className="container">
                    <div className={style.wrapper}>
                        {banners && banners.map((b, i) => {
                            if (i < 2)
                                return (
                                    <div className={style.baner}>
                                        <Link href={b.link} className={style.link}>
                                            <Image src={b.src} placeholder='blur' blurDataURL='/Images/placeholder-1.png' unoptimized={true} width={100} height={100} />
                                        </Link>
                                    </div>)
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TwoBanners;