import React from 'react';
import Link from 'next/link';
import style from './SelectCategoryType.module.css'

const SelectCategoryType = ({ subCategories }) => {

    const makeElement = subCategories.map(i => {
        return (
            <div className={style.xSncp} key={i.id}>
                <Link href={`/category-${i.slug}`}>
                    <div className={style.GyooR}><img src={i.icon} alt={i.name} /></div>
                    <div className={style.Ceed}><span>{i.name}</span></div>
                </Link>
            </div>
        )
    });


    return (
        <>
            <section className={style.gwzu}>
                <div className='container' dir="rtl">
                    <div className={style.xrcwea}>
                        {makeElement}
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(SelectCategoryType);