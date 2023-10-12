import useRequest from 'hooks/useRequest';
import Image from 'next/image';
import React from 'react';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import style from './Category.module.css'


const Category = () => {

    const [data] = useRequest('/admin/categories')

    return (
        <>
            <div className={style.category}>
                <div className={style.Ec7Hy2}>
                    <div className={style.cat_lvl_}>
                        <div className={style.Head_t0}><p>سطح ۱</p></div>
                        <div className={style.Jxy_2tvi}>
                            {!!data && data.data.map(i => {
                                return (
                                    <article className={style.article} key={i.id}>
                                        <div className={style.box_cat}>
                                            <div className={style.art_img}><Image src={'/Images/apparel/man clothing/121228579.jpg'} alt={i.name} width={100} height={100} /></div>
                                            <div className={style.art_name}><span>{i.name}</span></div>
                                        </div>
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
                            {!!data && data.data[0].subCategories.map(i => {
                                return (
                                    <article className={style.article} key={i.id}>
                                        <div className={style.box_cat}>
                                            <div className={style.art_img}><Image src={'/Images/apparel/man clothing/121228579.jpg'} alt={i.name} width={100} height={100} /></div>
                                            <div className={style.art_name}><span>{i.name}</span></div>
                                        </div>
                                        <button className={style.E_d_i_t}><FiEdit3 /></button>
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
                            {!!data && data.data[2].subCategories[1].subCategories.map(i => {
                                return (
                                    <article className={style.article} key={i.id}>
                                        <div className={style.box_cat}>
                                            <div className={style.art_img}><Image src={'/Images/apparel/man clothing/121228579.jpg'} alt={i.name} width={100} height={100} /></div>
                                            <div className={style.art_name}><span>{i.name}</span></div>
                                        </div>
                                        <button className={style.E_d_i_t}><FiEdit3 /></button>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Category;