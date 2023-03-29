import React, { useState } from 'react';
import style from './Specifications.module.css'

const Specifications = ({ setProduct }) => {
    const [specific, setSpecific] = useState({})
    const [error, setError] = useState({})

    const handleChange = ({ target }) => {
        const { name, value } = target
        setSpecific(prev => {
            prev[name] = value
            return { ...prev }
        })
    }

    const handleAddAttr = () => {
        if (!specific.attr_name || !specific.attr_desc) {
            setError(prev => {
                return {
                    ...prev,
                    attr: 'لطفا هردو فیلد را وارد کنید.'
                }
            })
            return;
        }
        setProduct(prev => {
            prev.specifications.push(specific);
            return { ...prev }
        });
        setError({})
        setSpecific({ attr_name: '', attr_desc: '' })
    }
    return (
        <>
            <div className={style.htX_98wQI}>
                <p>مشخصات</p>
                <button onClick={handleAddAttr} type='button' className={style.RcpIf_11}>
                    <svg fill="currentColor" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z">
                        </path>
                    </svg>
                </button>
            </div>
            <div className={style.vZryal_rr4}>
                <div className={style.lAdGc_ooiy}>
                    <input className={style.attrName_1} type='text' placeholder="ویژگی" name='attr_name' onChange={handleChange} value={specific.attr_name} />
                    <input className={style.attrDesc_1} type="text" placeholder="توضیحات" name='attr_desc' onChange={handleChange} value={specific.attr_desc} />
                </div>
                {error.attr && <span className={`${style.errors_input} ms-3`}>{error.attr}</span>}
            </div>
        </>
    );
};

export default Specifications;