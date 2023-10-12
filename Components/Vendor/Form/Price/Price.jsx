import Input from 'Components/Input';
import { useEffect, useRef, useState } from 'react';
import style from './Price.module.css'
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { p2e } from 'Functions/ConvertNumbers';

const Price = ({ setProduct, offPrice, price, discountTime, touch, errors }) => {

    const input = useRef()
    const checkBox = useRef()
    const newDate = new Date()
    const [date, setDate] = useState({ off_date_from: newDate, off_date_to: new Date(Date.now() + (3600 * 1000 * 24)) })
    useEffect(() => {
        if (checkBox.current.checked) {
            setProduct(prev => {
                const offPercent = prev.offPrice ? Math.ceil(100 - (prev.offPrice / prev.price * 100)) : 0
                return { ...prev, offPercent, ...date }
            })
        }
        else {
            setProduct(prev => {
                delete prev.offPercent
                delete prev.off_date_from
                delete prev.off_date_to
                return { ...prev }
            })
        }
    }, [offPrice, price, date])


    const handleResult = (Value, name) => {
        let value = parseInt(Value) || 0
        if (name === 'price' && !checkBox.current.checked) {
            setProduct(prev => {
                return {
                    ...prev,
                    price: value,
                    offPrice: value
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
                const offPrice = prev.price
                return {
                    ...prev,
                    offPrice
                }
            })
        }
    }

    const getToday = (date) => p2e(new DateObject(date).toDate().toLocaleDateString('fa-IR').split('/')[2])

    return (
        <>
            <div className={style.nJe_3zq_plf}>
                <Input isNumber={true} type='text' placeholder="قیمت" name='price' result={handleResult} className={style.input} value={price} />
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
                    <Input isNumber={true} type="text" placeholder="قیمت تخفیفی" name='offPrice' result={handleResult} refrence={input} value={offPrice} />
                </div>
                {touch.offPrice && errors.offPrice && <span className={style.errors_input}>{errors.offPrice}</span>}
            </div>
            {checkBox.current?.checked && <>
                <div className={style.prev_dis_parent}><label>شروع تخفیف:</label><div className={style.nJe_discount_plf}>
                    <DatePicker
                        value={date.off_date_from}
                        onChange={e => setDate(prev => { return { ...prev, off_date_from: e.toDate() } })}
                        inputClass={style.inputDatePicker}
                        containerClassName={style.Datepicker}
                        editable={false}
                        monthYearSeparator="|"
                        format="HH:mm DD/MMMM/YYYY"
                        plugins={[
                            <TimePicker hideSeconds position='right' />
                        ]}
                        minDate={new DateObject({ calendar: persian }).subtract(0, "days")}
                        maxDate={new DateObject({ calendar: persian }).add(getToday(date.off_date_to) - getToday(newDate), "days")}
                        placeholder='زمان شروع تخفیف...'
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right" />
                    {touch.discountTime && errors.discountTime && <span className={style.errors_input}>{errors.discountTime}</span>}
                </div></div>
                <div className={style.prev_dis_parent}><label>پایان تخفیف:</label><div className={style.nJe_discount_plf}>
                    <DatePicker
                        value={date.off_date_to}
                        onChange={e => setDate(prev => { return { ...prev, off_date_to: e.toDate() } })}
                        inputClass={style.inputDatePicker}
                        containerClassName={style.Datepicker}
                        editable={false}
                        monthYearSeparator="|"
                        format="HH:mm DD/MMMM/YYYY"
                        plugins={[
                            <TimePicker hideSeconds position='right' />
                        ]}
                        minDate={new DateObject({ calendar: persian }).subtract(getToday(newDate) - getToday(date.off_date_from), "days")}
                        maxDate={new DateObject({ calendar: persian }).add(14, "days")}
                        placeholder='زمان پایان تخفیف...'
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right" />
                </div></div>
            </>}
        </>
    );
};

export default Price;