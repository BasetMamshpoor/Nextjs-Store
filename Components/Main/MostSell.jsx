import { e2p } from 'Functions/ConvertNumbers';
import useRequest from 'hooks/useRequest';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from './MostSell.module.css'

const MostSell = () => {
    const [data] = useRequest('/products/top-orders')
    return (
        <>
            <section className={style.mostSell} dir="rtl">
                <div className={style.container}>
                    <div className={style.mBfp}>
                        <div className={style.Kngp}>
                            <svg fill="#f9a825" viewBox="0 0 16 16">
                                <path
                                    d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z" />
                            </svg>
                            <h4>پرفروش ترین محصولات</h4>
                        </div>
                    </div>
                    <div className={style.BgmSf}>
                        <div className={style.bmgCy}>
                            {data && data.data.map((el, index) => {
                                if (index < 12) {
                                    return (
                                        <Link href={`/products/${el.id}`} className={style.Ecio}>
                                            <div className={style.NgImg}>
                                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={el.image} alt="" />
                                            </div>
                                            <span className={style.Qxunt}>{e2p(index + 1)}</span>
                                            <div className={style.lRcu}>
                                                <p>{el.name}</p>
                                            </div>
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(MostSell);