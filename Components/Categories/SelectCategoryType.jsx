import React from 'react';
import Link from 'next/link';
import json from './categoryTypedata.json'
import style from './SelectCategoryType.module.css'

const SelectCategoryType = ({ gender, category }) => {

    const makeElement = json[gender][category].map(i => {
        return (
            <div className={style.xSncp} key={i.id}>
                <Link href={`/category-${gender}-${i.path}`}>
                    <div className={style.GyooR}><img src={i.img} alt={i.name} /></div>
                    <div className={style.Ceed}><span>{i.name}</span></div>
                </Link>
            </div>
        )
    });


    return (
        <>
            <section className={style.gwzu}>
                <div className='container' dir="rtl">
                    <div className={style.yvEq}>
                        <div className={style.xrcwea}>
                            {makeElement}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(SelectCategoryType);