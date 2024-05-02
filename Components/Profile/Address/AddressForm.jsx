import DropDown from 'Components/Dropdown/DropDown';
import style from './AddressForm.module.css'
import { useEffect, useState } from 'react';
import Provinces from './provinces.json'
import Cities from './cities.json'
import Input from 'Components/Input';
import axios from 'axios';

const AddressForm = ({ data, user }) => {
    const [cities, setCities] = useState([])
    const [address, setAddress] = useState({ latitude: data.latitude, longitude: data.longitude })
    const headers = { Authorization: `${user?.token_type} ${user?.access_token}` }

    useEffect(() => {
        const newCities = findCities(Cities, data.state)
        setCities(newCities)
        setAddress(prev => {
            return {
                ...prev,
                ...searchProvinces(data, Provinces, newCities)
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
        await axios.post('/address', address, { headers })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={style.address}>
                <div className={style.container}>
                    <div className={style.header}>
                        <p>جزئیات آدرس</p>
                    </div>
                    <form className={style.form}>
                        <div className={style.content}>
                            <div className={style.oneField}>
                                <div className={style.field}>
                                    <label className={style.label}>نام مکان <span className={style.star}>*</span></label>
                                    <Input value={address.title} type='text' name='title' result={handleChange}
                                        className={style.input} placeholder='خانه, محل کار, ...' />
                                </div>
                            </div>
                            <div className={style.oneField}>
                                <div className={style.field}>
                                    <label className={style.label}>نشانی پستی <span className={style.star}>*</span></label>
                                    <textarea className={style.textarea} dir='rtl' name="address" minLength={5} maxLength={400} onChange={(e) => handleChange('address', e.target.value)}
                                        defaultValue={data.formatted_address.slice(data.formatted_address.indexOf('،') + 1)}></textarea>
                                </div>
                            </div>
                            <div className={style.twoField}>
                                <div className={style.field}>
                                    <label className={style.label}>استان <span className={style.star}>*</span></label>
                                    <div className={style.dropdown}>
                                        <DropDown label array={Provinces} defaultValue={address.province}
                                            name={'province'} setState={handleChange} Searchable />
                                    </div>
                                </div>
                                <div className={style.field}>
                                    <label className={style.label}>شهر <span className={style.star}>*</span></label>
                                    <div className={style.dropdown}>
                                        <DropDown label array={cities} defaultValue={address.city}
                                            name='city' setState={handleChange} Searchable />
                                    </div>
                                </div>
                            </div>
                            <div className={style.twoField}>
                                <div className={style.twoSmallField}>
                                    <div className={style.field}>
                                        <label className={style.label}>پلاک <span className={style.star}>*</span></label>
                                        <Input value={address.pelac} name='pelac' type="number" result={handleChange} className={style.input} />
                                    </div>
                                    <div className={style.field}>
                                        <label className={style.label}>واحد</label>
                                        <Input value={address.vahed} name='vahed' type="number" result={handleChange} className={style.input} />
                                    </div>
                                </div>
                                <div className={style.field}>
                                    <label className={style.label}>کد پستی <span className={style.star}>*</span></label>
                                    <Input value={address.postalcode} type='number' name='postalcode' result={handleChange} className={style.input} />
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
                                    <Input value={address.name} type='text' name='name' result={handleChange} className={style.input} />
                                </div>
                                <div className={style.field}>
                                    <label className={style.label}>شماره موبایل <span className={style.star}>*</span></label>
                                    <Input value={address.cellphone} type='number' name='cellphone' result={handleChange} className={style.input} placeholder='مثل: ۰۹۱۲۳۴۵۶۷۸۹' />
                                </div>
                            </div>
                        </div>
                        <div className={style.footer}>
                            <button className={style.btn} type='button' onClick={handleSabmit}>ثبت آدرس</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddressForm;