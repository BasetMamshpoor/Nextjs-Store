import Input from 'Components/Input';
import React, { useEffect, useRef } from 'react';
import style from './Price.module.css'

const Price = ({ setProduct, off_price, touch, errors }) => {

    const input = useRef()
    const checkBox = useRef()

    useEffect(() => {
        if (checkBox.current.checked) setProduct(prev => {
            const off_percent = Math.ceil(100 - (prev.off_price / prev.price * 100))
            return { ...prev, off_percent }
        })
        else {
            setProduct(prev => {
                delete prev.off_percent
                return { ...prev }
            })
        }
    }, [off_price])

    const handleResult = (value, name) => {
        if (name === 'price' && !checkBox.current.checked) {
            setProduct(prev => {
                return {
                    ...prev,
                    price: value,
                    off_price: value
                }
            })
        } else {
            setProduct(prev => {
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }

    const handleCheck = ({ target }) => {
        if (target.checked) input.current.focus()
        else {
            setProduct(prev => {
                const off_price = prev.price
                return {
                    ...prev,
                    off_price
                }
            })
        }
    }
    return (
        <>
            <div className={style.nJe_3zq_plf}>
                <Input type='number' placeholder="قیمت" name='price' result={handleResult} className={style.input} />
                {touch.price && errors.price && <span className={style.errors_input}>{errors.price}</span>}
            </div>
            <div className={style.FzwYa_4n4}>
                <input ref={checkBox} type="checkbox" name="isOff_uAdd" id={style.IcE_22} hidden onChange={handleCheck} />
                <div className={style.locaZam_bor}>
                    <label htmlFor={style.IcE_22}>
                        <span className={style.p99_jbY}></span>
                        تخفیف دارد.
                    </label>
                </div>
                <div className={style.Mn_HveS}>
                    <Input type="number" placeholder="قیمت تخفیفی" min='1' name='off_price' result={handleResult} refrence={input} />
                </div>
                {touch.off_price && errors.off_price && <span className={style.errors_input}>{errors.off_price}</span>}
            </div>
        </>
    );
};

export default Price;