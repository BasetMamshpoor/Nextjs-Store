import axios from 'axios';
import useRequest from 'hooks/useRequest';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import style from './Category.module.css'


const Category = () => {
    const [categories, setCategories] = useState({ id: null, subCategories: { id: null, subCategories: { id: null, subCategories: {} } } })
    const [category, setCategory] = useState(null)

    const [categoryList] = useRequest('/categories')

    const gender = () => {
        let array = [];
        categoryList?.map(e => {
            array.push(e)
        })
        return array
    }
    const type = () => {
        let array = [];
        const selectedGender = categoryList?.find(i => i.id === categories.id)
        if (selectedGender)
            selectedGender.subCategories.map(e => {
                array.push(e)
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
                    array.push(e)
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

    const handleEdit = async (event, id) => {
        event.stopPropagation()
        await axios.put(`/admin/categories/${id}`, {
            _method: "PUT",
            name: 'کفش 2',
            parent_id: 1,
            icone: 'https://dkstatics-public.digikala.com/digikala-products/d96e096d3baa42da0ec82ec3614509a792e09b9b_1599655085.jpg?x-oss-process=image/resize,m_lfit,h_350,w_350/quality,q_60'

        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <>
            {!!categoryList && <div className={style.category}>
                <div className={style.Ec7Hy2}>
                    <div className={style.cat_lvl_}>
                        <div className={style.Head_t0}><p>سطح ۱</p></div>
                        <div className={style.Jxy_2tvi}>
                            {gender().map(i => {
                                return (
                                    <article className={`${style.article} ${categories.id === i.id ? style.active : ''}`} key={i.id} onClick={() => handleSelectCategory('gender', i.id)}>
                                        <div className={style.box_cat}>
                                            <div className={style.art_img}><Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={i.icon} alt="" /></div>
                                            <div className={style.art_name}><span>{i.name}</span></div>
                                        </div>
                                        <button className={style.E_d_i_t} onClick={(e) => handleEdit(e, i.id)}><FiEdit3 /></button>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style.cat_lvl_}>
                        <div className={style.Head_t0}>
                            <p>سطح ۲</p>
                            <button className={style._add_newOne}><FiPlus /></button>
                        </div>
                        <div className={style.Jxy_2tvi}>
                            {type().map(i => {
                                return (
                                    <article className={`${style.article} ${categories.subCategories.id === i.id ? style.active : ''}`} key={i.id} onClick={() => handleSelectCategory('type', i.id)}>
                                        <div className={style.box_cat}>
                                            <div className={style.art_img}><Image src={'/Images/apparel/man clothing/121228579.jpg'} alt={i.name} width={100} height={100} /></div>
                                            <div className={style.art_name}><span>{i.name}</span></div>
                                        </div>
                                        <button className={style.E_d_i_t} onClick={(e) => handleEdit(e, i.id)}><FiEdit3 /></button>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style.cat_lvl_}>
                        <div className={style.Head_t0}>
                            <p>سطح ۳</p>
                            <button className={style._add_newOne}><FiPlus /></button>
                        </div>
                        <div className={style.Jxy_2tvi}>
                            {model().map(i => {
                                return (
                                    <article className={style.article} key={i.id} onClick={() => handleSelectCategory('model', i.id)}>
                                        <div className={style.box_cat}>
                                            <div className={style.art_img}><Image src={'/Images/apparel/man clothing/121228579.jpg'} alt={i.name} width={100} height={100} /></div>
                                            <div className={style.art_name}><span>{i.name}</span></div>
                                        </div>
                                        <button className={style.E_d_i_t} onClick={(e) => handleEdit(e, i.id)}><FiEdit3 /></button>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Category;