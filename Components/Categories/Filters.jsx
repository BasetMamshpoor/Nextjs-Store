import Dropdown from 'Components/Dropdown/DropDown';
import useGetRequest from 'hooks/useGetRequest';
import React, { useEffect, useState } from 'react';
import style from './Filters.module.css'
import { IoChevronDownOutline } from 'react-icons/io5'
import Input from 'Components/Input';

const Filters = ({ category, router, setIsOpen }) => {
    const [filters, setFilters] = useState({})
    const [data] = useGetRequest(`/products/getfilters/${category}`)

    useEffect(() => {
        if (router?.isReady) setFilters(readUrl())
    }, [router])

    const makeFilter = (filter) => {
        let array = [];
        for (const i of data[filter]) {
            array.push(i)
        }
        return array
    }

    const handleFilter = (name, value) => {
        setFilters(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        changeUrl(name, value)
    }

    const readUrl = () => {
        let object = {};
        for (const name in router.query) {
            if (Object.hasOwnProperty.call(router.query, name)) {
                let filter = []
                const value = router.query[name];
                const newValue = value.split('-')
                newValue.forEach((f, i) => {
                    filter.push({ name: f, value: i })
                })
                object[name] = filter
            }
        }
        return object
    }

    const changeUrl = (name, value) => {
        let str = null;
        !!Array.isArray(value) ? value.forEach((f, i) => {
            if (i > 0) {
                str = str + '-' + f.name
            } else if (i === 0) {
                str = f.name
            } else {
                str = null
            }
        }) : str = value
        if (str === null) {
            const { [name]: O, slug, ...query } = router.query
            router.replace({ pathname: router.asPath.split('?')[0], query: { ...query }, },
                undefined,
                { shallow: true }
            );
        } else {
            const { slug, ...query } = router.query
            router.replace({ pathname: router.asPath.split('?')[0], query: { ...query, [name]: str }, },
                undefined,
                { shallow: true }
            );
        }
    }

    const clearFilters = () => {
        router.replace(router.asPath.split('?')[0]);
        if (!!setIsOpen) setIsOpen(false)
    }

    return (
        <>
            {!!data ? <div className={style.filters}>
                <div className={style.header}>
                    <p className={style.Rwxaq}>فیلتر ها</p>
                    <span className={style.clearFilters} onClick={clearFilters}>حذف فیلترها</span>
                </div>
                <Dropdown
                    array={makeFilter('brands')} defaultValue={filters.brands}
                    Multiple Searchable placeHolder='برند' setState={handleFilter} name='brands' towLabel
                    styleBox={{ padding: 'calc(.75rem + 10px) 12px', borderBottom: '1px solid #ddd' }} />
                <Dropdown
                    array={makeFilter('colors')} defaultValue={filters.colors}
                    Multiple Searchable placeHolder='رنگ' setState={handleFilter} name='colors' colorInLabel
                    styleBox={{ padding: 'calc(.75rem + 10px) 12px', borderBottom: '1px solid #ddd' }} />
                <Dropdown
                    array={makeFilter('sizes')} defaultValue={filters.sizes}
                    Multiple Searchable placeHolder='سایز' setState={handleFilter} name='sizes' label
                    styleBox={{ padding: 'calc(.75rem + 10px) 12px', borderBottom: '1px solid #ddd' }} />
                <div className={style.discount}>
                    <div className={style.dis_field}>
                        <label htmlFor="discountField">
                            فقط تخفیف دار
                        </label>
                        <input type="checkbox" name="discount" id="discountField" checked={filters['discount'] ? true : false}
                            onChange={({ target }) => target.checked ? handleFilter('discount', true) : handleFilter('discount', null)} />
                    </div>
                </div>
                <div className={style.yqgi}>
                    <div className={style.typeF}>
                        <input className={style.checkprice} type="checkbox" id="price" hidden />
                        <label className={style.dropdownL} htmlFor="price"><p>قیمت</p><span><IoChevronDownOutline /></span></label>
                        <div className={style.CrWx}>
                            <div className={style.kFiU}>
                                <div className={style.vGex}>
                                    <label>از</label>
                                    <Input type="number" name='min' value={filters.min ? filters.min[0].name : data.price.min} min={data.price.min} result={handleFilter} />
                                </div>
                                <div className={style.vGex}>
                                    <label>تا</label>
                                    <Input type="number" name='max' value={filters.max ? filters.max[0].name : data.price.max} max={data.price.max} result={handleFilter} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <p>... درحال‌ بارگذاری</p>}
        </>
    );
};

export default React.memo(Filters);