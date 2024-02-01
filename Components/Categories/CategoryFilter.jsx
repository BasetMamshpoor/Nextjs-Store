import { Categories } from 'providers/CategoriesProvider';
import React, { useContext, useState } from 'react';
import style from './CategoryFilter.module.css'
import { BiChevronDown } from 'react-icons/bi';

const CategoryFilter = ({ categoryId, setCategoryId }) => {
    const { categories } = useContext(Categories)
    const [show, setShow] = useState({ L1: 0, L2: 0 })

    const handleShowHide = (event, id) => {
        if (event.target.tagName !== 'LABEL') {
            if (show.L1 === id.L1 && id.L2 === 0) {
                setShow({ L1: 0, L2: 0 })
            } else if (show.L2 === id.L2) {
                setShow({ L1: id.L1, L2: 0 })
            } else {
                setShow(id)
            }
        }
    }

    const handleCheck = (e, id) => {
        if (e.target.checked) {
            setCategoryId(id)
        } else setCategoryId(0)
    }

    return (
        <>
            <ul className={style.category_List}>
                {!!categories && categories.map(c => {
                    return (
                        <li className={style.category_L} key={c.id}>
                            <div className={`${style.label} ${show.L1 === c.id ? style.active : ''}`} onClick={(e) => handleShowHide(e, { L1: c.id, L2: 0 })}>
                                <div className={style.text}>
                                    <input type="checkbox" id={c.id} hidden checked={categoryId === c.id ? true : false} onChange={(e) => handleCheck(e, c.id)} />
                                    <label htmlFor={c.id} className={style.gbPol}></label>
                                    <p>{c.name}</p>
                                </div>
                                <div className={style.label_icon} style={show.L1 === c.id ? { transform: 'rotate(180deg)' } : {}}>{<BiChevronDown />}</div>
                            </div>
                            <ul className={`${style.under} ${show.L1 === c.id ? style.show : ''}`}>
                                {show.L1 !== 0 && (c.subCategories.length > 0 ? c.subCategories.map(cSub => {
                                    return (
                                        <li className={style.category_L} key={cSub.id}>
                                            <div className={`${style.label} ${show.L2 === cSub.id ? style.active : ''}`} onClick={(e) => handleShowHide(e, { L1: c.id, L2: cSub.id })}>
                                                <div className={style.text}>
                                                    <input type="checkbox" id={cSub.id} hidden checked={categoryId === cSub.id ? true : false} onChange={(e) => handleCheck(e, cSub.id)} />
                                                    <label htmlFor={cSub.id} className={style.gbPol}></label>
                                                    <p>{cSub.name}</p>
                                                </div>
                                                <div className={style.label_icon} style={show.L2 === cSub.id ? { transform: 'rotate(180deg)' } : {}}><BiChevronDown /></div>
                                            </div>
                                            <ul className={`${style.under} ${show.L2 === cSub.id ? style.show : ''}`}>
                                                {show.L2 !== 0 && (cSub.subCategories.length > 0 ? cSub.subCategories.map(c3Sub => {
                                                    return (
                                                        <li className={style.category_L} key={c3Sub.id}>
                                                            <div className={style.label}>
                                                                <div className={style.text}>
                                                                    <input type="checkbox" id={c3Sub.id} hidden checked={categoryId === c3Sub.id ? true : false} onChange={(e) => handleCheck(e, c3Sub.id)} />
                                                                    <label htmlFor={c3Sub.id} className={style.gbPol}></label>
                                                                    <p>{c3Sub.name}</p>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                }) : <li>دسته وجود ندارد</li>)}
                                            </ul>
                                        </li>
                                    )
                                }) : <li>دسته وجود ندارد</li>)}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </>
    );
};

export default CategoryFilter;