import { useState } from 'react';
import style from './Size.module.css'
import { BsPlus } from 'react-icons/bs'

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
        if (!sizes.size || !sizes.stock) {
            setError(prev => {
                return {
                    ...prev,
                    size: 'لطفا سایز و تعداد موجود را وارد کنید.'
                }
            })
            return;
        }
        setProduct(prev => {
            prev.sizes.push(sizes);
            return { ...prev }
        });
        setError({})
        setSizes({ size: '', stock: '' })
    }
    return (
        <>
            <div className={style.sfZr14_2}>
                <div className={style.kXe_zuIo}>
                    <input type='text' placeholder='ُسایز' name='size' value={sizes.size} onChange={handleChange} />
                    <input type='number' placeholder='تعداد' name='stock' value={sizes.stock} min='1' onChange={handleChange} />
                </div>
                <button onClick={handleAddSize} type='button' className={style.RcpIf_12}>
                    <BsPlus />
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