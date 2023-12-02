import DropDown from 'Components/Dropdown/DropDown';
import useRequest from 'hooks/useRequest';
import React, { useEffect, useState } from 'react';
import style from './SelectCategories.module.css'

const SelectCategories = ({ setProduct, touch, errors, data = [] }) => {
    const categoryDefault = !!(data.length > 0) ?
        { id: data[0]?.id, subCategories: { id: data[1]?.id, subCategories: { id: data[2]?.id, subCategories: {} } } } :
        { id: null, subCategories: { id: null, subCategories: { id: null, subCategories: {} } } };
    const [categories, setCategories] = useState(categoryDefault)
    const [category, setCategory] = useState(null)
    const [categoryList] = useRequest('/categories')

    useEffect(() => {
        setProduct(prev => { return { ...prev, category_id: category } })
    }, [category])


    const gender = () => {
        let array = [];
        categoryList?.map(e => {
            array.push({ name: e.name, value: e.id })
        })
        return array
    }
    const type = () => {
        let array = [];
        const selectedGender = categoryList?.find(i => i.id === categories.id)
        if (selectedGender)
            selectedGender.subCategories.map(e => {
                array.push({ name: e.name, value: e.id })
            })
        else
            return array
        return array
    }
    const model = () => {
        let array = [];
        const selectedGender = categoryList?.find(i => i.id === categories.id)
        if (selectedGender) {
            const selectedType = selectedGender.subCategories.find(i => i.id === categories.subCategories.id)

            if (selectedType)
                selectedType.subCategories.map(e => {
                    array.push({ name: e.name, value: e.id })
                })
            else
                return array
        }
        else
            return array
        return array
    }

    const handleSelectCategory = (name, Value) => {
        const value = Value ?? null
        switch (name) {
            case 'gender':
                setCategories({ id: value, subCategories: { id: null, subCategories: { id: null, subCategories: {} } } })
                setCategory(value)
                return;
            case 'type':
                setCategories(prev => {
                    prev.subCategories.id = value
                    prev.subCategories.subCategories = { id: null, subCategories: {} }
                    return { ...prev }
                })
                !!value ? setCategory(value) : setCategory(categories.id)
                return;
            case 'model':
                setCategories(prev => {
                    prev.subCategories.subCategories.id = value
                    return { ...prev }
                })
                !!value ? setCategory(value) : setCategory(categories.subCategories.id)
                return;
            default:
                setCategories({ id: null, subCategories: { id: null, subCategories: { id: null, subCategories: {} } } })
                setCategory(null)
                break;
        }
    }
    return (
        <>{!!categoryList && <>
            <div className={style.nJe_3zq_plf}>
                <DropDown array={gender()} name='gender'
                    placeHolder='دسته بندی سطح اول' label setState={handleSelectCategory} defaultValue={categories.id} />
                {touch.category_id && errors.category_id && <span className={style.errors_input}>{errors.category_id}</span>}
            </div>
            <div className={style.nJe_3zq_plf}>
                <DropDown array={type()} name='type'
                    Searchable placeHolder="دسته بندی سطح دوم" label setState={handleSelectCategory} defaultValue={categories.subCategories.id} />
            </div>
            <div className={style.nJe_3zq_plf}>
                <DropDown array={model()} name='model'
                    Searchable placeHolder="دسته بندی سطح سوم" label setState={handleSelectCategory} defaultValue={categories.subCategories.subCategories.id} />
            </div>
        </>}</>
    );
};

export default SelectCategories;