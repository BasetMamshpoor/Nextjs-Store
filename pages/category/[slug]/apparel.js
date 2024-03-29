import ProductList from "Components/Categories/ProductList";
import SelectCategory from "Components/Categories/SelectCategory";
import SelectGender from "Components/Categories/SelectGender";
import { getCategories } from "api/categories";
import { useRouter } from "next/router";
import { Categories } from 'providers/CategoriesProvider';
import { useContext, useEffect, useState } from 'react';

const Apparel = () => {
    const router = useRouter();
    const { slug } = router.query
    const { categories } = useContext(Categories)
    const [category, setCategory] = useState()

    useEffect(() => {
        setCategory(categories.find(c => c.slug === slug))
    }, [slug])

    return (
        <>
            {!!category && <>
                <SelectGender slug={slug} />
                <SelectCategory categories={category.subCategories} />
                <ProductList id={category.id} />
            </>}
        </>
    );
};
export async function getStaticPaths() {
    const category = await getCategories()
    const paths = category.map(c => {
        return { params: { slug: c.slug } }
    })
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

export default Apparel;