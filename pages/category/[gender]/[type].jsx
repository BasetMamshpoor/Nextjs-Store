import SelectCategoryType from 'Components/Categories/SelectCategoryType';
import { getAllRouteCategories } from 'lib/getStaticPaths';
import ProductList from 'Components/Categories/ProductList';
import useGetCategoryId from 'hooks/useGetCategoryId';

const Type = () => {
    const [category] = useGetCategoryId()

    return (
        <>
            {!!category && <main>
                {category.subCategories.length ?
                    <SelectCategoryType subCategories={category.subCategories} /> :
                    null}
                <ProductList id={category.id} />
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