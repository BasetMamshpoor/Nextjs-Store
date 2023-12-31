import { useRouter } from "next/router";
import { Categories } from "providers/CategoriesProvider";
import { useCallback, useContext, useEffect, useState } from "react";

const useGetCategoryId = () => {
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

    return [category]
};

export default useGetCategoryId;