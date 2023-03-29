import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Filters from 'Components/Categories/Filters';
import Products from 'Components/Categories/Products';
import SelectCategoryType from 'Components/Categories/SelectCategoryType';
import SortBy from 'Components/Categories/SortBy';
import style from './style.module.css'
import genders from 'Components/Categories/gender.json'
import genderCategoryType from 'Components/Categories/categorydata.json'
import categoryType from 'Components/Categories/categoryTypedata.json'


const Type = () => {
    const router = useRouter()
    const { type, gender } = router.query
    const categories = ['clothing', 'shoes', 'accessories', 'sports']
    const [categoryName, setCategoryName] = useState()

    const getCategory = useCallback(() => {
        const category = categories.find(i => i === type)
        if (category) {
            const ex = genderCategoryType[gender].find(o => o.category === category)
            const genderName = genders.find(g => g.key === gender)
            return { category: ex.category, name: `${ex.name} ${genderName.name}` }
        } else {
            let typeCategory;
            for (const i in categoryType[gender]) {
                if (Object.hasOwnProperty.call(categoryType[gender], i)) {
                    const element = categoryType[gender][i].find(e => e.path === type);
                    if (element !== undefined) typeCategory = { name: element.name, category: i }
                }
            }
            return typeCategory
        }
    }, [type])
    useEffect(() => {
        setCategoryName(getCategory)
    }, [type])

    return (
        <>
            <main>
                {(categories.filter(i => i === type)).length ?
                    <SelectCategoryType gender={gender} category={type} /> :
                    null}
                <p>{categoryName?.name} | {categoryName?.category}</p>
                <section className={style.products} dir="auto">
                    <div className="container">
                        <div className={` d-flex`}>
                            <Filters />
                            <div className={`${style.Lops} d-flex`}>
                                <SortBy />
                                <Products categories={['مردانه', 'لباس مردانه']} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export async function getStaticPaths() {
    const categoryTypeData = genders.map(g => {
        let array = []
        for (const i in categoryType[g.key]) {
            let gen
            if (Object.hasOwnProperty.call(categoryType[g.key], i)) {
                gen = categoryType[g.key][i].map(f => f.path)
            }
            gen.map(i => array.push(i))
        }
        return array.map(i => {
            return { params: { gender: g.key, type: i } }
        })
    })
    const categoriesType = genders.map(g => {
        const newArray = genderCategoryType[g.key].map(i => i.category)
        return newArray.map(i => {
            return { params: { gender: g.key, type: i } }
        })
    })

    return {
        paths: [
            ...categoryTypeData[0], ...categoryTypeData[1], ...categoryTypeData[2],
            ...categoriesType[0], ...categoriesType[1], ...categoriesType[2]
        ],
        fallback: false
    }
}
export async function getStaticProps() {

    return {
        props: {}
    }
}
export default Type;