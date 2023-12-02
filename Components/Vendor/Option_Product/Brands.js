import DropDown from 'Components/Dropdown/DropDown';
import useRequest from 'hooks/useRequest';
import React, { useEffect, useState } from 'react';

const Brands = ({ setProduct, id }) => {

    const [brands] = useRequest('/brands')
    const [list, setList] = useState([])

    useEffect(() => {
        if (brands) {
            let array = []
            for (const i of brands) {
                array.push({ name: i.name, value: i.id })
            }
            setList(array)
        }
    }, [brands])

    const handleChange = (name, value) => setProduct(prev => {
        return {
            ...prev,
            [name]: value ? value : 0
        }
    })

    return (
        <>
            {!!list.length && <DropDown array={list} name='brand_id'
                Searchable placeHolder='برندها' label setState={handleChange} defaultValue={id} />}
        </>
    );
};

export default Brands;