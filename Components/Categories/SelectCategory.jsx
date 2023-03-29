import React from 'react';
import style from './SelectCategory.module.css'
import json from './categorydata.json'
import Link from 'next/link';

const SelectCategory = ({ gender, category }) => {
    const makeElement = json[gender].map(item => {
        return (
            <div key={item.id} className={`${style.mvHr} ${item.category === category ? style[`${gender}Active`] : ''}`}>
                <Link href={`/category-${gender}-${item.category}`} className={style.HcrJ}>
                    <div className={style.cYaR}>
                        <img src={item.img}
                            alt={item.name} />
                        <span>{item.name}</span>
                    </div>
                </Link>
            </div>
        )
    })

    return (
        <>
            <section className={style.NflOO}>
                <div className="container">
                    <div className={`${style.BfpEw} d-flex`}>
                        {makeElement}
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(SelectCategory);