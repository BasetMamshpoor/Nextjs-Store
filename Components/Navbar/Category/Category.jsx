import React, { useContext, useEffect, useState } from 'react';
import style from './Category.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { Categories } from 'providers/CategoriesProvider';

const Category = ({ flow, setFlow }) => {

    useEffect(() => {
        if (flow) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
    }, [flow])

    const { categories } = useContext(Categories)

    const slugType = (slug) => slug.split(/-(.*)/)[1]
    const firstCategoryL2 = slugType(categories[0].subCategories[0].slug)

    const [gender, setGender] = useState(categories[0].slug)
    const [category, setCategory] = useState(firstCategoryL2);

    const categoryLevel2 = categories.find(c => c.slug === gender).subCategories


    const genderElement = categories.map(item => {
        return <li key={item.id}
            className={`${style.gender} ${gender === item.slug ? style.gender_active : ''}`}
            onMouseEnter={() => { setGender(item.slug); setCategory(firstCategoryL2) }}>
            <Link href={`/category-${item.slug}-apparel`}>{item.name}</Link></li>
    })
    const apparelElement = categoryLevel2.map(item => {
        return <li key={item.id}
            className={`${style.gender_apparel} ${category === slugType(item.slug) ? style.apparel_active : ''}`}
            onMouseEnter={() => setCategory(slugType(item.slug))}
        ><Link href={`/category-${item.slug}`}>{item.name}</Link></li>
    })
    const apparelTypeElement = categoryLevel2.find(c => slugType(c.slug) === category).subCategories.map(i => {
        return (
            <article className={style.article} key={i.id}>
                <Link href={`/category-${i.slug}`}>
                    <div className={style.art_img}><Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={i.icon} alt={i.name} /></div>
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
