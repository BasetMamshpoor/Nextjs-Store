import React, { useRef } from 'react';
import style from '../styles/Login.module.css'
import Logo from '../public/Images/logo-no-background-transformed.png'
import Link from 'next/link';
const Login = () => {
    const Error = useRef()
    const handleSubmit = event => {
        event.preventDefault()
        const value = event.target[0].value
        const regex = /^(?:(?![\s])[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[0-9]{10,12})$/;
        const isValid = regex.test(value);
        if (!isValid) {
            Error.current.innerText = 'ایمیل یا شماره موبایل معتبر نیست.'
        } else {
            Error.current.innerText = ''
            console.log(value);
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
                        <h1 className={style.title}>ورود | ثبت‌نام</h1>
                        <div className={style.info}>
                            لطفا شماره موبایل یا ایمیل خود را وارد کنید
                        </div>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.input_sec}>
                                <input type="text" name='contact' required />
                            </div>
                            <span className={style.error} ref={Error}></span>
                            <button className={style.btn}>ورود</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Login;