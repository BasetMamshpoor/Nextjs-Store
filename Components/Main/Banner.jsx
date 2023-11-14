import React from 'react';
import style from './Banner.module.css'
import Link from 'next/link';
import Image from 'next/image';
const Banner = () => {
    return (
        <>
            <div className={style.Banner}>
                <div className="container">
                    <div className={style.wrapper}>
                        <div className={style.baner}>
                            <Link href={``} className={style.link}>
                                <Image src={'/Images/banner/1.webp'} placeholder='blur' blurDataURL='/Images/placeholder-1.png' unoptimized={true} width={100} height={100} />
                            </Link>
                        </div>
                        <div className={style.baner}>
                            <Link href={``} className={style.link}>
                                <Image src={'/Images/banner/2.webp'} placeholder='blur' blurDataURL='/Images/placeholder-1.png' unoptimized={true} width={100} height={100} />
                            </Link>
                        </div>
                        <div className={style.baner}>
                            <Link href={``} className={style.link}>
                                <Image src={'/Images/banner/3.webp'} placeholder='blur' blurDataURL='/Images/placeholder-1.png' unoptimized={true} width={100} height={100} />
                            </Link>
                        </div>
                        <div className={style.baner}>
                            <Link href={``} className={style.link}>
                                <Image src={'/Images/banner/4.webp'} placeholder='blur' blurDataURL='/Images/placeholder-1.png' unoptimized={true} width={100} height={100} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banner;