import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import style from './Category.module.css'
import createModal from 'Components/Modal';
import NewCategory from './NewCategory';
import { Functions } from 'providers/FunctionsProvider';
import { Categories } from 'providers/CategoriesProvider';
import Loading from 'Components/Loading';

const Category = () => {
    const [category, setCategory] = useState({ id: null, name: '', slug: '', subCategories: { id: null, subCategories: { id: null, subCategories: {} } } })
    const { SwalStyled } = useContext(Functions)
    const { categories, setCategories, reload } = useContext(Categories)

    const gender = () => {
        let array = [];
        categories?.map(e => {
            array.push({ ...e, parent: { id: null } })
        })
        return array
    }
    const type = () => {
        let array = [];
        const selectedGender = categories?.find(i => i.id === category.id)
        if (selectedGender) {
            const { subCategories, ...parent } = selectedGender
            selectedGender.subCategories.map(e => {
                array.push({ ...e, parent })
            })
        }
        else
            return array
        return array
    }
    const model = () => {
        let array = [];
        const selectedGender = categories?.find(i => i.id === category.id)
        if (selectedGender) {
            const selectedType = selectedGender.subCategories.find(i => i.id === category.subCategories.id)
            if (selectedType) {
                const { subCategories, ...parent } = selectedType
                selectedType.subCategories.map(e => {
                    array.push({ ...e, parent })
                })
            } else
                return array
        }
        else
            return array
        return array
    }

    const handleSelectCategory = (name, value) => {
        switch (name) {
            case 'gender':
                const obj = { id: value.id, name: value.name, slug: value.slug }
                setCategory({ ...obj, subCategories: { id: null, subCategories: { id: null, subCategories: {} } } })
                return;
            case 'type':
                setCategory(prev => {
                    prev.subCategories.id = value.id
                    prev.subCategories.name = value.name
                    prev.subCategories.slug = value.slug
                    prev.subCategories.subCategories = { id: null, subCategories: {} }
                    return { ...prev }
                })
                return;
            case 'model':
                setCategory(prev => {
                    prev.subCategories.subCategories.id = value.id
                    prev.subCategories.subCategories.name = value.name
                    prev.subCategories.subCategories.slug = value.slug
                    return { ...prev }
                })
                return;
            default:
                setCategory({ id: null, subCategories: { id: null, subCategories: { id: null, subCategories: {} } } })
                break;
        }
    }

    const handleEdit = (event, state, level) => {
        const { subCategories, ...data } = state
        event.stopPropagation()
        createModal(<NewCategory SwalStyled={SwalStyled} reload={reload} state={data} level={level} />)
    }

    const handleNew = (level) => {
        if (level === 2) {
            if (category.id !== null) createModal(<NewCategory SwalStyled={SwalStyled} reload={reload} categoryLevel={category} />)
            else SwalStyled.fire("دسته والد پیدا نشد", "لطفا اول دسته سطح اول مورد نظر را وارد کنید سپس اقدام به افزودن دسته به زیر مجموعه آن نمایید", "error",);
        } else {
            if (category.subCategories.id !== null) createModal(<NewCategory SwalStyled={SwalStyled} reload={reload} categoryLevel={category.subCategories} />)
            else SwalStyled.fire("دسته والد پیدا نشد", "لطفا اول دسته سطح دوم مورد نظر را وارد کنید سپس اقدام به افزودن دسته به زیر مجموعه آن نمایید", "error",);
        }
    }

    return (
        <>
            {!!categories ? <div className={style.category}>
                <div className={style.Ec7Hy2}>
                    <div className={style.cat_lvl_}>
                        <div className={style.Head_t0}><p>سطح ۱</p></div>
                        <div className={style.Jxy_2tvi}>
                            {gender().map(i => {
                                return (
                                    <article className={`${style.article} ${category.id === i.id ? style.active : ''}`}
                                        key={i.id} onClick={() => handleSelectCategory('gender', i)}>
                                        <div className={style.box_cat}>
                                            <div className={style.art_img}>
                                                <Image src={!!i.icon ? i.icon : '/Images/placeholder-1.png'}
                                                    placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100}
                                                    height={100} unoptimized={true} alt={i.name} /></div>
                                            <div className={style.art_name}><span>{i.name}</span></div>
                                        </div>
                                        <button className={style.E_d_i_t} onClick={(e) => handleEdit(e, i, 1)}><FiEdit3 /></button>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style.cat_lvl_}>
                        <div className={style.Head_t0}>
                            <p>سطح ۲</p>
                            <button className={style._add_newOne} onClick={() => handleNew(2)}><FiPlus /></button>
                        </div>
                        <div className={style.Jxy_2tvi}>
                            {type().map(i => {
                                return (
                                    <article className={`${style.article} ${category.subCategories.id === i.id ? style.active : ''}`}
                                        key={i.id} onClick={() => handleSelectCategory('type', i)}>
                                        <div className={style.box_cat}>
                                            <div className={style.art_img}>
                                                <Image src={!!i.icon ? i.icon : '/Images/placeholder-1.png'}
                                                    placeholder='blur' blurDataURL='/Images/placeholder-1.png'
                                                    unoptimized={true} alt={i.name} width={100} height={100} /></div>
                                            <div className={style.art_name}><span>{i.name}</span></div>
                                        </div>
                                        <button className={style.E_d_i_t} onClick={(e) => handleEdit(e, i, 2)}><FiEdit3 /></button>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style.cat_lvl_}>
                        <div className={style.Head_t0}>
                            <p>سطح ۳</p>
                            <button className={style._add_newOne} onClick={() => handleNew(3)}><FiPlus /></button>
                        </div>
                        <div className={style.Jxy_2tvi}>
                            {model().map(i => {
                                return (
                                    <article className={style.article} key={i.id} onClick={() => handleSelectCategory('model', i)}>
                                        <div className={style.box_cat}>
                                            <div className={style.art_img}>
                                                <Image src={!!i.icon ? i.icon : '/Images/placeholder-1.png'}
                                                    placeholder='blur' blurDataURL='/Images/placeholder-1.png'
                                                    unoptimized={true} alt={i.name} width={100} height={100} /></div>
                                            <div className={style.art_name}><span>{i.name}</span></div>
                                        </div>
                                        <button className={style.E_d_i_t} onClick={(e) => handleEdit(e, i, 3)}><FiEdit3 /></button>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div> : <Loading />}
        </>
    );
};

export default Category;