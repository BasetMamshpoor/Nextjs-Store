import DropDown from 'Components/Dropdown/DropDown';
import useRequest from 'hooks/useRequest';
import React, { useEffect, useState } from 'react';
import style from './SelectCategories.module.css'

const SelectCategories = ({ setProduct, touch, errors }) => {

    const [categories, setCategories] = useState({ id: null, subCategories: { id: null, subCategories: { id: null, subCategories: {} } } })
    const [category, setCategory] = useState(null)
    const [categoryList] = useRequest('/categories')

    useEffect(() => {
        setProduct(prev => { return { ...prev, category_id: category } })
    }, [category])


    const gender = () => {
        let array = [];
        categoryList?.data.map(e => {
            array.push({ name: e.name, value: e.id })
        })
        return array
    }
    const type = () => {
        let array = [];
        const selectedGender = categoryList?.data.find(i => i.id === categories.id)
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
        const selectedGender = categoryList?.data.find(i => i.id === categories.id)
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
        const value = Value ? Value : null
        switch (name) {
            case 'gender':
                setCategories({ id: value, subCategories: { id: null, subCategories: { id: null, subCategories: {} } } })
                setCategory(null)
                return;
            case 'type':
                setCategories(prev => {
                    prev.subCategories.id = value
                    prev.subCategories.subCategories = { id: null, subCategories: {} }
                    return { ...prev }
                })
                setCategory(null)
                return;
            case 'model':
                setCategories(prev => {
                    prev.subCategories.subCategories.id = value
                    return { ...prev }
                })
                setCategory(value)
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
                <div>
                    <DropDown array={gender()} name='gender'
                        placeHolder='دسته بندی سطح اول' label setState={handleSelectCategory} />
                </div>
                {touch.category && errors.category && <span className={style.errors_input}>{errors.category}</span>}
            </div>
            <div className={style.nJe_3zq_plf}>
                <div>
                    <DropDown array={type()} name='type'
                        Searchable placeHolder="دسته بندی سطح دوم" label setState={handleSelectCategory} />
                </div>
            </div>
            <div className={style.nJe_3zq_plf}>
                <div>
                    <DropDown array={model()} name='model'
                        Searchable placeHolder="دسته بندی سطح سوم" label setState={handleSelectCategory} />
                </div>
            </div>
        </>}</>
    );
};

export default SelectCategories;