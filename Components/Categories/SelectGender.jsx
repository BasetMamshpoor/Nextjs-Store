import Link from 'next/link';
import React, { useContext } from 'react';
import style from './SelectGender.module.css'
import { Categories } from 'providers/CategoriesProvider';

const SelectGender = ({ gender }) => {
    const { categories } = useContext(Categories)

    return (
        <>
            <section className={style.fCpO}>
                <div className="container">
                    <div className={style.vfrs}>
                        <div className={`${style.bGtde} ${gender === 'kids' ? style.categoryActive : ''}`}>
                            <Link href='/category-kids-apparel'>
                                <div className={style.gif_kid}></div>
                            </Link>
                        </div>
                        <div className={`${style.bGtde} ${gender === 'mens' ? style.categoryActive : ''}`}>
                            <Link href='/category-mens-apparel'>
                                <div className={style.gif_man}></div>
                            </Link>
                        </div>
                        <div className={`${style.bGtde} ${gender === 'womens' ? style.categoryActive : ''}`}>
                            <Link href='/category-womens-apparel'>
                                <div className={style.gif_women}></div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className={style.seletGender}>
                <div className="container">
                    <div className={style.genders}>
                        {!!categories && categories.map(c => {
                            return (
                                <div className={`${style.gender} ${gender === c.slug ? style.act_gender : ''}`}>
                                    <Link className={style.g_link} href={`/category-${c.slug}-apparel`}>
                                        <div>
                                            <img src={c.icon} alt='gender' />
                                        </div>
                                        <p>{c.name}</p>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(SelectGender);