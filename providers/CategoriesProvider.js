import useGetRequest from 'hooks/useGetRequest';
import React, { createContext } from 'react';

export const Categories = createContext()

const CategoriesProvider = ({ children }) => {
    const [categories, setCategories, reload] = useGetRequest('/categories')

    return (
        <>
            <Categories.Provider value={{ categories, setCategories, reload }}>
                {!!categories ? children : <p>nothing</p>}
            </Categories.Provider>
        </>
    );
};

export default CategoriesProvider;