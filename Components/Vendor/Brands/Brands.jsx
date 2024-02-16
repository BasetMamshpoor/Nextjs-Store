import axios from 'axios';
import Pagination from 'Components/Pagination/Pagination';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import React, { useContext, useState } from 'react';
import { BsPencilSquare, BsPlus, BsTrash } from 'react-icons/bs';
import style from './Brands.module.css'
import { Functions } from 'providers/FunctionsProvider';
import Swal from 'sweetalert2'
import Loading from 'Components/Loading';
import Cookies from 'js-cookie';

const Brands = () => {
    const [currentpage, setCurrentpage] = useState(1)
    const [brands, setBrands, reload, paginations] = useGetPrivatRequest(`/admin/brands`, currentpage)
    const { SwalStyled } = useContext(Functions)
    const token = Cookies.get('token')
    const headers = { Authorization: `${token.token_type} ${token.access_token}` }

    const handleDelete = (id) => {
        SwalStyled.fire({
            title: "از حذف برند اطمینان دارید؟",
            text: 'با حذف برند محصولات ثبت شده با این اسم برند نیز حذف میشوند',
            showDenyButton: true,
            confirmButtonText: "حذف",
            denyButtonText: `لغو`,
            icon: 'warning'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/admin/brands/${id}`, { headers })
                    .then(() => {
                        SwalStyled.fire({ title: '.حذف شد', text: '.برند مورد نظر با موفقیت حذف شد', icon: 'success' })
                        setBrands(prev => {
                            const newBrands = prev.filter(b => b.id !== id)
                            return newBrands
                        })
                    }).catch(() => {
                        SwalStyled.fire('.حذف نشد', '.دسته مورد نظر با موفقیت حذف نشد', 'error')
                    })
            } else if (result.isDenied) {
                SwalStyled.fire("حذف لغو شد.", "", "info");
            }
        });
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
                await axios.put(`/admin/brands/${id}`, { name: text }, { headers })
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
                await axios.post('/admin/brands', { name: text }, { headers })
                    .then(() => {
                        SwalStyled.fire('.ثبت شد', '.برند مورد نظر با موفقیت ثبت شد', 'success')
                        reload(Math.random())
                    }).catch(err => SwalStyled.fire('.ثبت نشد', '.مشکلی در هنگام ثبت به وجود آمد', 'error'))

        }
    }
    return (
        <>
            {!!brands ? <div className={style.brands}>
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
            </div> : <Loading />}
        </>
    );
};

export default Brands;