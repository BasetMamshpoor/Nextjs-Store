import Input from 'Components/Input';
import { useCallback, useEffect, useRef, useState } from 'react';
import style from './Price.module.css'
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import { p2e } from 'Functions/ConvertNumbers';

const Price = ({ setProduct, offPrice, price, touch, errors, discountTime }) => {

    const input = useRef()
    const newDate = new Date()
    const [checkbox, setCheckbox] = useState()
    const [date, setDate] = useState()
    const setDateState = (e, b) => setDate(prev => { return { ...prev, [b.input.name]: e.toDate() } })

    const handleResult = (name, Value) => {
        let value = parseInt(Value) || 0
        setProduct(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    useEffect(() => {
        if (offPrice) {
            setCheckbox(true)
            setDate(discountTime)
        }
        else {
            setCheckbox(false)
            setDate({ off_date_from: newDate, off_date_to: new Date(Date.now() + (3600 * 1000 * 24)) })
        }
    }, [offPrice])

    useEffect(() => {
        if (checkbox) updateState(false)
    }, [date])

    const handleCheck = ({ target }) => {
        if (target.checked) {
            input.current.focus()
            updateState(true)
            setCheckbox(true)
        }
        else {
            setCheckbox(false)
            setProduct(prev => {
                const { offPrice, off_date_from, off_date_to, ...previ } = prev
                return {
                    ...previ
                }
            })
        }
    }

    const updateState = (check) => setProduct(prev => {
        let dateFrom = new DateObject({
            date: date.off_date_from,
            format: "YYYY-MM-DD HH:mm:ss"
        })
        let dateTo = new DateObject({
            date: date.off_date_to,
            format: "YYYY-MM-DD HH:mm:ss"
        })
        const newFormatDate = { off_date_from: dateFrom.format(), off_date_to: dateTo.format(), ...(check && { offPrice: prev.price ?? 1 }) }
        return { ...prev, ...newFormatDate }
    })


    const getToday = useCallback((date) => p2e(new DateObject(date).toDate().toLocaleDateString('fa-IR').split('/')[2]), [])

    return (
        <>
            <div className={style.nJe_3zq_plf}>
                <Input isNumber={true} type='text' placeholder="قیمت" name='price' result={handleResult} className={style.input} value={price} />
                {touch.price && errors.price && <span className={style.errors_input}>{errors.price}</span>}
            </div>
            <div className={style.FzwYa_4n4}>
                <input type="checkbox" name="isOff_uAdd" id={style.IcE_22} hidden onChange={handleCheck} checked={checkbox} />
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
            {checkbox && <>
                <div className={style.prev_dis_parent}><label>شروع تخفیف:</label><div className={style.nJe_discount_plf}>
                    <DatePicker
                        name='off_date_from'
                        value={date.off_date_from}
                        onChange={setDateState}
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
                        name='off_date_to'
                        value={date.off_date_to}
                        onChange={setDateState}
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