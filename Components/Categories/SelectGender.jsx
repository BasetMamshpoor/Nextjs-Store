import Link from 'next/link';
import React, { useContext } from 'react';
import style from './SelectGender.module.css'
import { Categories } from 'providers/CategoriesProvider';

const SelectGender = ({ slug }) => {
    const { categories } = useContext(Categories)

    return (
        <>
            <section className={style.selectGender}>
                <div className="container">
                    <div className={style.genders}>
                        {!!categories && categories.map(c => {
                            return (
                                <div className={`${style.gender} ${slug === c.slug ? style.act_gender : ''}`} key={c.id}>
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