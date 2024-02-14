import { useContext, useEffect, useRef, useState } from 'react';
import style from 'Components/Profile/Information/Password.module.css'
import { useRouter } from 'next/router';
import { Authorization } from 'providers/AuthorizationProvider';
import Link from 'next/link';
import Logo from '../../public/Images/logo-no-background-transformed.png'
import axios from 'axios';
import { Functions } from 'providers/FunctionsProvider';
import PasswordValidation from 'Functions/PasswordValidation';
import { MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const ForgotPassword = () => {
    const router = useRouter()
    const [state, setState] = useState({ code: router.query.code, password: '', password_confirmation: '' })
    const { tokens } = useContext(Authorization)
    const { SwalStyled } = useContext(Functions)
    const input1 = useRef({})
    const { length, letter, number, symbol, progress, isMatch } = PasswordValidation(state.password, state.password_confirmation)


    useEffect(() => {
        if (!tokens)
            router.push('/auth/login')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/user/change-password', state, {
            headers: { Authorization: `${tokens.token_type} ${tokens.access_token}` }
        })
            .then(res => {
                SwalStyled.fire('انجام شد', res.data.message, 'success')
                router.push('/profile/information')
            })
            .catch(err => {
                SwalStyled.fire('انجام نشد', err.response.data.message, 'error')
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
            <main className={style.main}>
                <section className={style.card}>
                    <div className={style.login}>
                        <div className={style.logo}>
                            <Link href='/'>
                                <img src={Logo.src} alt="" />
                            </Link>
                        </div>
                        <h1 className={style.title}>رمز عبور</h1>
                        <div className={style.label}>
                            لطفا رمز عبور جدید خود را وارد کنید.
                        </div>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.inputField}>
                                <input ref={input1} className={style.input} type="password" name='password'
                                    onCopy={e => e.preventDefault()} onCut={e => e.preventDefault()} onChange={handleChange} placeholder='رمز جدید' />
                                <div className={style.eye} onClick={(e) => toggleShow(e, input1)}>
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
                                <input className={style.input} type="password" name='password_confirmation'
                                    onCopy={e => e.preventDefault()} onCut={e => e.preventDefault()} onChange={handleChange} placeholder='تکرار رمز' />
                            </div>
                            <div className={style.rules}>
                                <ul className={style.ruleList}>
                                    <li className={style.rule}>
                                        {isMatch ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                                        <p className={style.ruleMessage}>تطابق رمز عبور </p>
                                    </li>
                                </ul>
                            </div>
                            <button disabled={!isMatch ? true : false} className={`${style.btn} ${!isMatch ? style.disableButton : ''}`}>تغییر رمز</button>
                        </form>
                    </div>
                </section>
            </main >
        </>
    );
};

export default ForgotPassword;