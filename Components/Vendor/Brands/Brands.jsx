import axios from 'axios';
import createModal from 'Components/Modal';
import Pagination from 'Components/Pagination/Pagination';
import useRequest from 'hooks/useRequest';
import React from 'react';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import Brand from './Brand';
import style from './Brands.module.css'

const Brands = () => {
    const [brands, setBrands] = useRequest('/admin/brands')

    const handleDelete = (id) => {
        axios.delete(`/admin/brands/${id}`)
            .then(() => setBrands(prev => {
                const newBrands = prev.filter(b => b.id !== id)
                return newBrands
            }))
    }
    return (
        <>
            <div className={style.brands}>
                <div className={style.container}>
                    <div className={style.header}>
                        <div className={style.name}>برند ها</div>
                        <div className={style.newbrand} onClick={() => createModal(<Brand />)}><BsPlus /></div>
                    </div>
                    <div className={style.content}>
                        <ul className={style.brandlist}>
                            {!!brands && brands.map(e => {
                                return (
                                    <li className={style.brand} key={e.id}>
                                        <p className={style.brandname}>{e.name}</p>
                                        <p className={style.brandcreate}>{(new Date(e.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }))}</p>
                                        <div className={style.options}>
                                            <span className={style.edit} onClick={() => createModal(<Brand value={e.name} id={e.id} />)}><BsPencilSquare /></span>
                                            <span className={style.delete} onClick={() => handleDelete(e.id)}><BsTrash /></span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <Pagination boxShadow={false} />
            </div>
        </>
    );
};

export default Brands;