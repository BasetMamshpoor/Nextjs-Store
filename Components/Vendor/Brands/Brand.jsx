import axios from 'axios';
import React, { useState } from 'react';
import style from './Brand.module.css'

const Brand = ({ SwalStyled, reload, value, id, setIsOpen }) => {
    const [name, setName] = useState()

    const handleChange = (e) => setName(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!value) {
            await axios.post('/admin/brands', { name })
                .then(() => {
                    SwalStyled.fire('.ثبت شد', '.برند مورد نظر با موفقیت ثبت شد', 'success')
                    reload(Math.random())
                    setIsOpen(false)
                })
                .catch(err => SwalStyled.fire('.ثبت نشد', '.مشکلی در هنگام ثبت به وجود آمد', 'error'))
        } else {
            await axios.put(`/admin/brands/${id}`, { name })
                .then(() => {
                    SwalStyled.fire('.ویرایش شد', '.برند مورد نظر با موفقیت ویرایش شد', 'success')
                    reload(Math.random())
                    setIsOpen(false)
                })
                .catch(err => SwalStyled.fire('.ثبت نشد', '.مشکلی در هنگام ویرایش به وجود آمد', 'error'))
        }
    }

    return (
        <>
            <div className={style.brand}>
                <form className={style.form} onSubmit={handleSubmit}>
                    <h3>{!!value ? 'ویرایش برند' : 'برند جدید'}</h3>
                    <input required value={name} name={name} onChange={handleChange} type="text" defaultValue={!!value ? value : null} className={style.input} />
                    <button className={style.button}>{!!value ? 'تغییر' : 'ثبت'}</button>
                </form>
            </div>
        </>
    );
};

export default Brand;