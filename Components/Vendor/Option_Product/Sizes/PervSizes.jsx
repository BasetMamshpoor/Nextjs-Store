import React from 'react';
import style from './Size.module.css'
import { e2p } from 'Functions/ConvertNumbers';

const PervSizes = ({ setProduct, sizes }) => {

    const handleSizeOption = (e) => {
        const name = parseInt(e.target.name)
        setProduct(prev => {
            const { deletingSizes } = prev
            if (!deletingSizes.includes(name)) {
                deletingSizes.push(name);
            } else {
                deletingSizes.splice(deletingSizes.indexOf(name), 1);
            }
            return { ...prev }
        })
    }

    return (
        <>
            {!!sizes && sizes.length > 0 &&
                <>
                    <label className={style.control_label}>جهت حذف، روی سایز مورد نظر کلیک کنید.
                        <div className={style.note}><span>!</span>
                            <p>برای ویرایش موجودی، سایز فعلی را حذف با همان اسم سایز موجودی جدید را وارد کنید!</p>
                        </div>
                    </label>
                    <div className={style.OvrcU}>
                        {sizes.map(i => {
                            return (
                                <div key={i.id} className={style.ExBt_2}>
                                    <input
                                        type="checkbox"
                                        name={i.id}
                                        id={`size${i.id}`}
                                        hidden
                                        onChange={handleSizeOption}
                                        className={style.checkSize}
                                    />
                                    <label htmlFor={`size${i.id}`} className={style.size_holder}>
                                        <span>({e2p(i.stock)})</span>~<span>{i.size}</span>
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
        </>
    );
};

export default PervSizes;