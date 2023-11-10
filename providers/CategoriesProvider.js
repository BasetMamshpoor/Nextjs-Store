import { getCategories } from 'api/categories';
import React, { createContext, useEffect, useState } from 'react';

export const Categories = createContext()

const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState()

    useEffect(() => {
        const get = async () => setCategories(await getCategories())
        get()
    }, [])

    return (
        <>
            <Categories.Provider value={{ categories }}>
                {!!categories && children}
            </Categories.Provider>
        </>
    );
};

export default CategoriesProvider;