import React from 'react';
import style from './Attributes.module.css'

const Attributes = ({ product }) => {
    const attribute = () => {
        let array = []
        for (let i = 0; i < 5; i++) {
            const element = product.specifications[i];
            if (element !== undefined) array.push(element)
        }
        return array.map((i, index) => {
            return <li key={index}><span>{i.attr_name}:</span>{i.attr_desc}</li>
        })
    }
    return (
        <>
            <div className={style.Cezp}>
                <ul className={style.Kxope}>
                    <p>ویژگی ها</p>
                    {attribute()}
                </ul>
            </div>
        </>
    );
};

export default React.memo(Attributes);