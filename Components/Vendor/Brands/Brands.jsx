import axios from 'axios';
import createModal from 'Components/Modal';
import Pagination from 'Components/Pagination/Pagination';
import useRequest from 'hooks/useRequest';
import React, { useContext, useState } from 'react';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import Brand from './Brand';
import style from './Brands.module.css'
import { Functions } from 'providers/FunctionsProvider';

const Brands = () => {
    const [currentpage, setCurrentpage] = useState(1)
    const [brands, setBrands, reload, paginations] = useRequest(`/admin/brands?page=${currentpage}`)
    const { SwalStyled } = useContext(Functions)

    const handleDelete = (id) => {
        axios.delete(`/admin/brands/${id}`)
            .then(() => setBrands(prev => {
                SwalStyled.fire('.حذف شد', '.برند مورد نظر با موفقیت حذف شد', 'success')
                const newBrands = prev.filter(b => b.id !== id)
                return newBrands
            }))
    }
    return (
        <>
            {!!brands && <div className={style.brands}>
                <div className={style.container}>
                    <div className={style.header}>
                        <div className={style.name}>برند ها</div>
                        <div className={style.newbrand} onClick={() => createModal(<Brand SwalStyled={SwalStyled} reload={reload} />)}><BsPlus /></div>
                    </div>
                    <div className={style.content}>
                        <ul className={style.brandlist}>
                            {brands.map(e => {
                                return (
                                    <li className={style.brand} key={e.id}>
                                        <p className={style.brandname}>{e.name}</p>
                                        {/* <p className={style.brandcreate}>{(new Date(e.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }))}</p> */}
                                        <div className={style.options}>
                                            <span className={style.edit} onClick={() => createModal(<Brand SwalStyled={SwalStyled} reload={reload} value={e.name} id={e.id} />)}><BsPencilSquare /></span>
                                            <span className={style.delete} onClick={() => handleDelete(e.id)}><BsTrash /></span>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <Pagination currentPage={currentpage} setCurrentPage={setCurrentpage} dataLength={paginations.meta.total} itemsPerPage={paginations.meta.per_page} boxShadow={false} />
            </div>}
        </>
    );
};

export default Brands;