import Link from 'next/link';
import React from 'react';
import style from './SelectGender.module.css'

const SelectGender = ({ gender }) => {

    return (
        <>
            <section className={style.fCpO}>
                <div className="container">
                    <div className={style.vfrs}>
                        <div className={`${style.bGtde} ${gender === 'kids' ? style.categoryActive : null}`}>
                            <Link href='/category-kids-apparel'>
                                <div className={style.gif_kid}></div>
                            </Link>
                        </div>
                        <div className={`${style.bGtde} ${gender === 'mens' ? style.categoryActive : null}`}>
                            <Link href='/category-mens-apparel'>
                                <div className={style.gif_man}></div>
                            </Link>
                        </div>
                        <div className={`${style.bGtde} ${gender === 'womens' ? style.categoryActive : null}`}>
                            <Link href='/category-womens-apparel'>
                                <div className={style.gif_women}></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(SelectGender);