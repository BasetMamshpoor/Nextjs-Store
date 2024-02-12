import { useRef, useState } from 'react';
import style from './Password.module.css'
import Link from 'next/link';
import axios from 'axios';
import PasswordValidation from 'Functions/PasswordValidation'
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ChangePassword = ({ swal, token, email, setIsOpen }) => {
    const [state, setState] = useState({ old_password: '', password: '', password_confirmation: '' })
    const input1 = useRef({})
    const input2 = useRef({})
    const input3 = useRef({})

    const { length, letter, number, symbol, progress, isMatch } = PasswordValidation(state.password, state.password_confirmation)

    const handlePassword = async (e) => {
        e.preventDefault()
        await axios.post('/user/change-password', state, {
            headers: { Authorization: `${token.token_type} ${token.access_token}` }
        })
            .then(res => {
                swal.fire('انجام شد', res.data.message, 'success')
                setIsOpen(false)
            })
            .catch(err => {
                swal.fire('انجام نشد', err.response.data.message, 'error')
            })
    }

    const handleChange = e => {
        const { value } = e.target
        const { name } = e.target
        setState(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const toggleShow = (e, ref) => {
        const type = ref.current.type
        if (type === 'password') {
            ref.current.type = 'text'
            e.currentTarget.children[0].style.display = 'none'
            e.currentTarget.children[1].style.display = 'flex'
        }
        else {
            ref.current.type = 'password'
            e.currentTarget.children[0].style.display = 'flex'
            e.currentTarget.children[1].style.display = 'none'
        }
    }
    return (
        <>
            <div className={style.password}>
                <div className={style.title}>تغییر رمز عبور</div>
                <div className={style.label}>تغییر رمز عبور با استفاده از رمز عبور فعلی</div>
                <form method="post" className={style.form} onSubmit={handlePassword}>
                    <div className={style.inputField}>
                        <input ref={input1} type="password" name='old_password' className={style.input}
                            value={state.old_password} onChange={handleChange} placeholder='رمز عبور فعلی' />
                        <div className={style.eye} onClick={(e) => toggleShow(e, input1)}>
                            <span><IoEyeOutline /></span>
                            <span style={{ display: 'none' }}><IoEyeOffOutline /></span>
                        </div>
                    </div>
                    <div className={style.inputField}>
                        <input ref={input2} type="password" name='password' className={style.input}
                            value={state.password} onChange={handleChange} placeholder='رمز عبور جدید' />
                        <div className={style.eye} onClick={(e) => toggleShow(e, input2)}>
                            <span><IoEyeOutline /></span>
                            <span style={{ display: 'none' }}><IoEyeOffOutline /></span>
                        </div>
                    </div>
                    <div className={style.passwordProgress}>
                        <div className={style.progress} style={{
                            width: `${progress * 25}%`,
                            background: `${progress === 1 ? '#ff0000' : progress === 2 ? '#eeca06' : progress === 3 ? '#81c9fa' : '#5ccb5f'}`
                        }}></div>
                    </div>
                    <div className={style.rules}>
                        <ul className={style.ruleList}>
                            <li className={style.rule}>
                                {length ? <MdOutlineCheckBoxOutlineBlank /> : <MdOutlineCheckBox />}
                                <p className={style.ruleMessage}>حداقل 8 حداکثر 64 کارکتر</p>
                            </li>
                            <li className={style.rule}>
                                {letter ? <MdOutlineCheckBoxOutlineBlank /> : <MdOutlineCheckBox />}
                                <p className={style.ruleMessage}>حداقل یک حرف (بزرگ و کوچک) انگلیسی</p>
                            </li>
                            <li className={style.rule}>
                                {number ? <MdOutlineCheckBoxOutlineBlank /> : <MdOutlineCheckBox />}
                                <p className={style.ruleMessage}>حداقل تعداد یک عدد</p>
                            </li>
                            <li className={style.rule}>
                                {symbol ? <MdOutlineCheckBoxOutlineBlank /> : <MdOutlineCheckBox />}
                                <p className={style.ruleMessage}>حداقل یکی از نشانه های (!,%,&,@,#,$,^,*,?,_,~)</p>
                            </li>
                        </ul>
                    </div>
                    <div className={style.inputField}>
                        <input ref={input3} type="password" name='password_confirmation' className={style.input}
                            value={state.password_confirmation} onChange={handleChange} placeholder='تکرار رمز عبور' />
                        <div className={style.eye} onClick={(e) => toggleShow(e, input3)}>
                            <span><IoEyeOutline /></span>
                            <span style={{ display: 'none' }}><IoEyeOffOutline /></span>
                        </div>
                    </div>
                    <div className={style.rules}>
                        <ul className={style.ruleList}>
                            <li className={style.rule}>
                                {isMatch ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                                <p className={style.ruleMessage}>حداقل 8 حداکثر 64 کارکتر</p>
                            </li>
                        </ul>
                    </div>
                    <button disabled={!isMatch ? true : false} className={`${style.btn} ${!isMatch ? style.disableButton : ''}`}>بررسی</button>
                </form>
                <div className={style.forgot_link}>
                    <Link href={{ pathname: '/auth/verify', query: { email, forword: '/auth/forgotpassword' } }}>فراموشی رمز یا ایجاد اولین رمز عبور</Link>
                </div>
            </div>
        </>
    );
};

export default ChangePassword;