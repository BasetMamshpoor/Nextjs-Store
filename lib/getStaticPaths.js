import { getCategories } from "api/categories"

const getAllRouteCategories = async () => {
    const data = await getCategories()
    let array = []
    data.map(({ subCategories: type }) => {
        type.map(L2 => {
            array.push({ params: { slug: L2.slug } })
            L2.subCategories.map(({ slug }) => {
                array.push({ params: { slug } })
            })
        })
    })
    return array
}
export { getAllRouteCategories }