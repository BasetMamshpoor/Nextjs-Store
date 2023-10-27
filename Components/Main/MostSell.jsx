import { e2p } from 'Functions/ConvertNumbers';
import useRequest from 'hooks/useRequest';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import style from './MostSell.module.css'
import { ImFire } from 'react-icons/im'

const MostSell = () => {
    const [data] = useRequest('/products/top-orders')

    const com = () => {
        let array = []
        for (let index = 0; index < 19; index++) {
            const element = data?.data[index];
            if (index % 3 === 0) console.log(data.data.slice(0, index));
        }
    };
    // !!data && com()

    return (
        <>
            <section className={style.mostSell} dir="rtl">
                <div className="container">
                    <div className={style.container}>
                        <div className={style.mBfp}>
                            <div className={style.Kngp}>
                                <ImFire fill='#f9a825' />
                                <h4>پرفروش ترین محصولات</h4>
                            </div>
                        </div>
                        <div className={style.BgmSf}>
                            <div className={style.bmgCy}>
                                {!!data && data.map((el, index) => {
                                    if (index < 15) return (
                                        <Link href={`/products/${el.id}`} className={style.Ecio} key={el.id}>
                                            <div className={style.NgImg}>
                                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={el.image} alt="" />
                                            </div>
                                            <span className={style.Qxunt}>{e2p(index + 1)}</span>
                                            <div className={style.lRcu}>
                                                <p>{el.name}</p>
                                            </div>
                                        </Link>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(MostSell);