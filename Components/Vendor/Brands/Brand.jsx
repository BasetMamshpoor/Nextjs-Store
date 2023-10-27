import axios from 'axios';
import React, { useState } from 'react';
import style from './Brand.module.css'

const Brand = ({ value, id, setIsOpen }) => {
    const [name, setName] = useState()

    const handleChange = (e) => setName(e.target.value)

    const handleSubmit = async () => {
        if (!value) {
            await axios.post('/admin/brands', { name })
                .then(() => setIsOpen(false))
                .catch(err => console.log(err))
        } else {
            await axios.put(`/admin/brands/${id}`, { name })
                .then(() => setIsOpen(false))
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <div className={style.brand}>
                <div className={style.form}>
                    <input value={name} name={name} onChange={handleChange} type="text" defaultValue={!!value ? value : null} className={style.input} />
                    <button type='submit' onClick={handleSubmit} className={style.button}>{!!value ? 'تغییر' : 'ثبت'}</button>
                </div>
            </div>
        </>
    );
};

export default Brand;