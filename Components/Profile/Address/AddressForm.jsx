import DropDown from 'Components/Dropdown/DropDown';
import style from './AddressForm.module.css'
import { useEffect, useState } from 'react';
import Provinces from './provinces.json'
import Cities from './cities.json'
import Input from 'Components/Input';
import axios from 'axios';
import validation from 'Functions/AddAddressValidation'

const AddressForm = ({ SwalStyled, data, user, edit, reload, setIsOpen, router }) => {
    const [cities, setCities] = useState([])
    const [address, setAddress] = useState({})
    const [touch, setTouch] = useState({})

    const headers = { Authorization: `${user?.token_type} ${user?.access_token}` }
    let errors = validation(address)

    useEffect(() => {
        const newCities = findCities(Cities, data.state)
        setCities(newCities)
        setAddress(prev => {
            return {
                ...prev,
                ...searchProvinces(data, Provinces, newCities),
                latitude: data.latitude, longitude: data.longitude,
                address: data.formatted_address.slice(data.formatted_address.indexOf('،') + 1),
                title: !!edit ? edit.title : '', postalcode: !!edit ? edit.postalcode : '',
                name: !!edit ? edit.name : '', cellphone: !!edit ? edit.cellphone : '',
            }
        })
    }, [])

    const searchProvinces = (data, provinces, cities) => {
        const resultProvice = provinces.find(p => {
            if (p.value == data.state) return p;
        })
        const resultCity = cities.find(c => {
            if (c.value === data.county) return c;
        })
        return { province: resultProvice?.value, city: resultCity?.value }
    }

    const findCities = (cities, state) => {
        return cities.filter(c => {
            if (c.provinceName === state) return c;
        })
    }

    const handleChange = (name, value) => {
        setAddress(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSabmit = async (e) => {
        e.preventDefault()
        if (Object.keys(errors).length) {
            setTouch({ title: true, address: true, province: true, city: true, number: true, postalcode: true, name: true, cellphone: true })
        } else {
            if (!!edit) {
                await axios.put(`/address/${edit.id}`, address, { headers })
                    .then(res => {
                        SwalStyled.fire('.ویرایش شد', res.data.message, 'success')
                        reload(Math.random())
                        setIsOpen(false)
                    })
                    .catch(err => SwalStyled.fire('.ویرایش نشد', err.response.data.message, 'error'))
            } else {
                await axios.post('/address', address, { headers })
                    .then(res => {
                        SwalStyled.fire('.ثبت شد', res.data.message, 'success')
                        reload(Math.random())
                        setIsOpen(false)
                        if (router && !!router.query.backUrl) router.push(router.query.backUrl)
                    })
                    .catch(err => SwalStyled.fire('.ثبت نشد', err.response.data.message, 'error'))
            }
        }
    }

    return (
        <>
            <div className={style.address}>
                <div className={style.header}>
                    <p>جزئیات آدرس</p>
                </div>
                <form className={style.form}>
                    <div className={style.content}>
                        <div className={style.oneField}>
                            <div className={style.field}>
                                <label className={style.label}>نام مکان <span className={style.star}>*</span></label>
                                <Input value={edit?.title} type='text' name='title' result={handleChange}
                                    className={`${style.input} ${(touch.title && !!errors.title) ? style.error : ''}`} placeholder='خانه, محل کار, ...' />
                            </div>
                        </div>
                        <div className={style.oneField}>
                            <div className={style.field}>
                                <label className={style.label}>نشانی پستی <span className={style.star}>*</span></label>
                                <textarea className={`${style.textarea} ${(touch.address && !!errors.address) ? style.error : ''}`} dir='rtl' name="address" onChange={(e) => handleChange('address', e.target.value)}
                                    defaultValue={data.formatted_address.slice(data.formatted_address.indexOf('،') + 1)}></textarea>
                                {touch.address && errors.address && <span className={style.error_text}>{errors.address}</span>}
                            </div>
                        </div>
                        <div className={style.twoField}>
                            <div className={style.field}>
                                <label className={style.label}>استان <span className={style.star}>*</span></label>
                                <div className={`${style.dropdown} ${(touch.province && !!errors.province) ? style.error : ''}`}>
                                    <DropDown label array={Provinces} defaultValue={address.province}
                                        name={'province'} setState={handleChange} Searchable />
                                </div>
                            </div>
                            <div className={style.field}>
                                <label className={style.label}>شهر <span className={style.star}>*</span></label>
                                <div className={`${style.dropdown} ${(touch.city && !!errors.city) ? style.error : ''}`}>
                                    <DropDown label array={cities} defaultValue={address.city}
                                        name='city' setState={handleChange} Searchable />
                                </div>
                            </div>
                        </div>
                        <div className={style.twoField}>
                            <div className={style.twoSmallField}>
                                <div className={style.field}>
                                    <label className={style.label}>پلاک <span className={style.star}>*</span></label>
                                    <Input value={edit?.number} isNumber={true} name='number' type="number" result={handleChange} className={`${style.input} ${(touch.number && !!errors.number) ? style.error : ''}`} />
                                </div>
                                <div className={style.field}>
                                    <label className={style.label}>واحد</label>
                                    <Input value={edit?.unit} name='unit' type="number" result={handleChange} className={style.input} />
                                </div>
                            </div>
                            <div className={style.field}>
                                <label className={style.label}>کد پستی <span className={style.star}>*</span></label>
                                <Input value={edit?.postalcode} type='number' name='postalcode' result={handleChange} className={`${style.input} ${(touch.postalcode && !!errors.postalcode) ? style.error : ''}`} />
                            </div>
                        </div>
                    </div>
                    <div className={style.resiver}>
                        <label className={style.checking}>
                            {/* <input value={address.} type="checkbox" name="" hidden /> */}
                            <span className={style.box_for_check}></span>
                            <p>گیرنده سفارش خودم هستم.</p>
                        </label>
                        <div className={style.twoField}>
                            <div className={style.field}>
                                <label className={style.label}>نام و نام خانوادگی گیرنده <span className={style.star}>*</span></label>
                                <Input value={edit?.name} type='text' name='name' result={handleChange} className={`${style.input} ${(touch.name && !!errors.name) ? style.error : ''}`} />
                            </div>
                            <div className={style.field}>
                                <label className={style.label}>شماره موبایل <span className={style.star}>*</span></label>
                                <Input value={edit?.cellphone} type='number' name='cellphone' result={handleChange} className={`${style.input} ${(touch.cellphone && !!errors.cellphone) ? style.error : ''}`} placeholder='مثل: ۰۹۱۲۳۴۵۶۷۸۹' />
                            </div>
                        </div>
                    </div>
                    <div className={style.footer}>
                        <button className={style.btn} type='button' onClick={handleSabmit}>{!!edit ? 'ویرایش آدرس' : 'ثبت آدرس'}</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddressForm;