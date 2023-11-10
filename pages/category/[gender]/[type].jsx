import { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Filters from 'Components/Categories/Filters';
import Products from 'Components/Categories/Products';
import SelectCategoryType from 'Components/Categories/SelectCategoryType';
import SortBy from 'Components/Categories/SortBy';
import style from './style.module.css'
import { getAllRouteCategories } from 'lib/getStaticPaths';
import { Categories } from 'providers/CategoriesProvider';

const Type = () => {
    const router = useRouter()
    const { gender, type } = router.query
    const [category, setCategory] = useState()
    const { categories } = useContext(Categories)

    const getCategory = useCallback(async () => {
        const { subCategories: categoryL2 } = categories.find(c => c.slug === gender)
        const Level2 = categoryL2.find(c => c.slug.split(/-(.*)/)[1] === type)
        if (!!Level2) setCategory(Level2)
        else for (const i in categoryL2)
            if (Object.hasOwnProperty.call(categoryL2, i)) {
                const element = categoryL2[i].subCategories.find(e => e.slug.split(/-(.*)/)[1] === type);
                if (element !== undefined) setCategory(element)
            }
    }, [type])

    useEffect(() => {
        getCategory()
    }, [type])

    return (
        <>
            {!!category && <main>
                {category.subCategories.length ?
                    <SelectCategoryType subCategories={category.subCategories} /> :
                    null}
                <section className={style.products} dir="auto">
                    <div className="container">
                        <div className={` d-flex`}>
                            <Filters category={category.id} />
                            <div className={`${style.Lops} d-flex`}>
                                <SortBy router={router} sort={router.query.sort} />
                                <Products category={category.id} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>}
        </>
    );
};
export async function getStaticPaths() {
    const paths = await getAllRouteCategories()
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps() {

    return {
        props: {}
    }
}
export default Type;