import axios from 'axios';
import Pagination from 'Components/Pagination/Pagination';
import useRequest from 'hooks/useRequest';
import React, { useContext, useState } from 'react';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import style from './Brands.module.css'
import { Functions } from 'providers/FunctionsProvider';
import Swal from 'sweetalert2'

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

    const handleClick = async (event) => {
        if (!!event) {
            const { id, name } = event
            const { value: text } = await Swal.fire({
                title: "ویرایش برند",
                input: "text",
                inputLabel: "نام برند",
                inputValue: name,
                inputAttributes: {
                    dir: 'auto'
                },
                confirmButtonText: 'تایید'
            });
            if (text)
                await axios.put(`/admin/brands/${id}`, { name: text })
                    .then(() => {
                        SwalStyled.fire('.ویرایش شد', '.برند مورد نظر با موفقیت ویرایش شد', 'success')
                        reload(Math.random())
                    }).catch(err => SwalStyled.fire('.ثبت نشد', '.مشکلی در هنگام ویرایش به وجود آمد', 'error'))

        } else {
            const { value: text } = await Swal.fire({
                title: "برند جدید",
                input: "text",
                inputLabel: "نام برند",
                inputAttributes: {
                    dir: 'auto'
                },
                confirmButtonText: 'تایید'
            });
            if (text)
                await axios.post('/admin/brands', { name: text })
                    .then(() => {
                        SwalStyled.fire('.ثبت شد', '.برند مورد نظر با موفقیت ثبت شد', 'success')
                        reload(Math.random())
                    }).catch(err => SwalStyled.fire('.ثبت نشد', '.مشکلی در هنگام ثبت به وجود آمد', 'error'))

        }
    }
    return (
        <>
            {!!brands && <div className={style.brands}>
                <div className={style.container}>
                    <div className={style.header}>
                        <div className={style.name}>برند ها</div>
                        <div className={style.newbrand} onClick={() => handleClick()}><BsPlus /></div>
                    </div>
                    <div className={style.content}>
                        <ul className={style.brandlist}>
                            {brands.map(e => {
                                return (
                                    <li className={style.brand} key={e.id}>
                                        <p className={style.brandname}>{e.name}</p>
                                        {/* <p className={style.brandcreate}>{(new Date(e.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }))}</p> */}
                                        <div className={style.options}>
                                            <span className={style.edit} onClick={() => handleClick(e)}><BsPencilSquare /></span>
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