import useRequest from 'hooks/useRequest';
import React, { createContext } from 'react';

export const Categories = createContext()

const CategoriesProvider = ({ children }) => {
    const [categories, setCategories, reload] = useRequest('/categories')

    return (
        <>
            <Categories.Provider value={{ categories, setCategories, reload }}>
                {!!categories ? children:<p>nothing</p>}
            </Categories.Provider>
        </>
    );
};

export default CategoriesProvider;