import { useState } from 'react';
import style from './Attributes.module.css'
import { BsPlus } from 'react-icons/bs'

const Attributes = ({ setProduct }) => {
    const [attribute, setAttribute] = useState({})
    const [error, setError] = useState({})

    const handleChange = ({ target }) => {
        const { name, value } = target
        setAttribute(prev => {
            prev[name] = value
            return { ...prev }
        })
    }

    const handleAddAttr = () => {
        if (!attribute.name || !attribute.value) {
            setError(prev => {
                return {
                    ...prev,
                    attr: 'لطفا هردو فیلد را وارد کنید.'
                }
            })
            return;
        }
        setProduct(prev => {
            prev.attributes.push(attribute);
            return { ...prev }
        });
        setError({})
        setAttribute({ name: '', value: '' })
    }
    return (
        <>
            <div className={style.htX_98wQI}>
                <p>مشخصات</p>
                <button onClick={handleAddAttr} type='button' className={style.RcpIf_11}>
                    <BsPlus />
                </button>
            </div>
            <div className={style.vZryal_rr4}>
                <div className={style.lAdGc_ooiy}>
                    <input className={style.attrName_1} type='text' placeholder="ویژگی" name='name' onChange={handleChange} value={attribute.name} />
                    <input className={style.attrDesc_1} type="text" placeholder="توضیحات" name='value' onChange={handleChange} value={attribute.value} />
                </div>
                {error.attr && <span className={`${style.errors_input} ms-3`}>{error.attr}</span>}
            </div>
        </>
    );
};

export default Attributes;