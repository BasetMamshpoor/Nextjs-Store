import React, { useEffect, useState } from 'react';
import style from './Category.module.css'
import apparelJson from 'Components/Categories/categorydata.json'
import apparelTypeJson from 'Components/Categories/categoryTypedata.json'
import genderJson from 'Components/Categories/gender.json'
import Link from 'next/link';

const Category = ({ flow, setFlow }) => {

    useEffect(() => {
        if (flow) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
    }, [flow])

    const [gender, setGender] = useState("womens")
    const [category, setCategory] = useState("clothing");


    const genderElement = genderJson.map(item => {
        return <li key={item.key}
            className={`${style.gender} ${gender === item.key ? style.gender_active : ''}`}
            onMouseEnter={() => { setGender(item.key); setCategory("clothing") }}>
            <Link href={`/category-${item.key}-apparel`}>{item.name}</Link></li>
    })
    const apparelElement = apparelJson[gender].map(item => {
        return <li key={item.id}
            className={`${style.gender_apparel} ${category === item.category ? style.apparel_active : ''}`}
            onMouseEnter={() => setCategory(item.category)}
        ><Link href={`/category-${gender}-${item.category}`}>{item.name}</Link></li>
    })
    const apparelTypeElement = apparelTypeJson[gender][category].map(i => {
        return (
            <article className={style.article} key={i.id}>
                <Link href={`/category-${gender}-${i.path}`}>
                    <div className={style.art_img}><img src={i.img} alt={i.name} /></div>
                    <div className={style.art_name}><span>{i.name}</span></div>
                </Link>
            </article>
        )
    });

    return (
        <>
            <div className={`${style.categorybg} ${flow ? style.show : style.hidden}`} >
                <div className={style.cat_menu} onMouseEnter={() => setFlow(true)} onMouseLeave={() => setFlow(false)}>
                    <div className={style.cat_gender}>
                        <ul>
                            {genderElement}
                        </ul>
                    </div>
                    <div className={style.cat_gender_menu}>
                        <div className={style.cat_gender_apparel}>
                            <ul>
                                {apparelElement}
                            </ul>
                        </div>
                        <div className={style.apparel_type}>
                            {apparelTypeElement}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(Category);
