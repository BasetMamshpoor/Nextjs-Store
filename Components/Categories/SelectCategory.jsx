import React from 'react';
import style from './SelectCategory.module.css'
import Link from 'next/link';
import Image from 'next/image';

const SelectCategory = ({ categories }) => {
    const makeElement = categories.map(item => {
        return (
            <div key={item.id} className={style.mvHr}>
                <Link href={`/category-${item.slug}`} className={style.HcrJ}>
                    <div className={style.cYaR}>
                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png'
                            width={100} height={100} unoptimized={true} src={item.icon} alt={item.name} />
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