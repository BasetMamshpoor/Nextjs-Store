import Dropdown from 'Components/Dropdown/DropDown';
import React from 'react';
import style from './Filters.module.css'

const Filters = ({ shoes, upperbody, lowerbody, accessory, underwear }) => {

    return (
        <>
            <div className={style.filters}>
                <p className={style.Rwxaq}>فیلتر ها</p>
                <Dropdown
                    array={[{ name: 'آدیداس', value: 'addidass' },
                    { name: 'آدیداس', value: 'addidas2' },
                    { name: 'آدیداس', value: 'addidas3' },
                    { name: 'آدیداس', value: 'addidas4' }]}
                    Multiple Searchable placeHolder='برند' setState={(n, v) => console.log(n, v)} name='brands' towLabel
                    styleBox={{ padding: 'calc(.75rem + 10px) 12px .75rem' }} />
                <Dropdown
                    array={[{ name: 'آبی', value: '#00e1ff' },
                    { name: 'قرمز', value: '#ff0000' },
                    { name: 'سبز', value: '#00ff04' },
                    { name: 'مشکی', value: '#000' }]}
                    Multiple Searchable placeHolder='رنگ' setState={(n, v) => console.log(n, v)} name='colors' colorInLabel
                    styleBox={{ padding: 'calc(.75rem + 10px) 12px .75rem' }} />
                <Dropdown
                    array={[{ name: 'آبی', value: '#00e1ff' },
                    { name: 'قرمز', value: '#ff0000' },
                    { name: 'سبز', value: '#00ff04' },
                    { name: 'مشکی', value: '#000' }]}
                    Multiple Searchable placeHolder='سایز' setState={(n, v) => console.log(n, v)} name='colors' label
                    styleBox={{ padding: 'calc(.75rem + 10px) 12px .75rem' }} />
            </div>
        </>
    );
};

export default React.memo(Filters);