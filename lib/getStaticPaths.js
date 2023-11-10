import { getCategories } from "api/categories"

const getAllRouteCategories = async () => {
    const data = await getCategories()
    let array = []
    data.map(({ subCategories: type }) => {
        type.map(L2 => {
            const [gender, type] = L2.slug.split(/-(.*)/)
            array.push({ params: { gender, type } })
            L2.subCategories.map(({ slug }) => {
                const [gender, type] = slug.split(/-(.*)/)
                array.push({ params: { gender, type } })
            })
        })
    })
    return array
}
export { getAllRouteCategories }