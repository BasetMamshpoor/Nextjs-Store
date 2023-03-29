import React, { useState } from 'react';
import style from './Size.module.css'
const Size = ({ setProduct, errors, touch }) => {
    const [sizes, setSizes] = useState({})
    const [error, setError] = useState({})

    const handleChange = ({ target }) => {
        const { name, value } = target
        setSizes(prev => {
            prev[name] = value
            return { ...prev }
        })
    }
    const handleAddSize = () => {
        if (!sizes.size || !sizes.stoke) {
            setError(prev => {
                return {
                    ...prev,
                    size: 'لطفا سایز و تعداد موجود را وارد کنید.'
                }
            })
            return;
        }
        // else if (!/[a-zA-z0-9]/.test(sizes.size)) {
        //     setError(prev => {
        //         return {
        //             ...prev,
        //             size: 'فقط حروف و اعداد انگلیسی مجاز است.'
        //         }
        //     })
        //     return
        // }
        setProduct(prev => {
            prev.sizes.push(sizes);
            return { ...prev }
        });
        setError({})
        setSizes({ size: '', stoke: '' })
    }
    return (
        <>
            <div className={style.sfZr14_2}>
                <div className={style.kXe_zuIo}>
                    <input type='text' placeholder='ُسایز' name='size' value={sizes.size} onChange={handleChange} />
                    <input type='number' placeholder='تعداد' name='stoke' value={sizes.stoke} min='1' onChange={handleChange} />
                </div>
                <button onClick={handleAddSize} type='button' className={style.RcpIf_12}>
                    <svg fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                        </path>
                    </svg>
                </button>
                <div className={style.Fcximy}>
                    {error.size && <span className={style.errors_span_input}>{error.size}</span>}
                    {touch.sizes && errors.sizes && <span className={style.errors_span_input}>{errors.sizes}</span>}
                </div>
            </div>
        </>
    );
};

export default Size;