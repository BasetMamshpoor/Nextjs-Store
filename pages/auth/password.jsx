import { useRouter } from 'next/router';
import style from 'styles/Login.module.css'
import Logo from '../../public/Images/logo-no-background-transformed.png'
import Link from 'next/link';
import { useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { Functions } from 'providers/FunctionsProvider';
import { Authorization } from 'providers/AuthorizationProvider';

const password = () => {
    const Error = useRef()
    const { query, push } = useRouter()
    const { SwalStyled } = useContext(Functions)
    const { getTokens } = useContext(Authorization)
    useEffect(() => {
        if (!query.email)
            push('/auth/login')
    }, [])


    const handleSubmit = async (event) => {
        event.preventDefault()
        const value = event.target[0].value
        if (!value.trim()) {
            Error.current.innerText = 'کادر بالا نباید خالی باشد.'
        } else {
            Error.current.innerText = ''
            const data = {
                grant_type: 'password',
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
                username: query.email,
                password: value
            }
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/oauth/token`, data)
                .then(({ data }) => {
                    SwalStyled.fire('انجام شد', 'وارد حساب کاربری می شوید', 'success')
                    getTokens(data)
                    push('/profile/information')
                })
                .catch(err => SwalStyled.fire('', '.رمز عبور وارد شده اشتباه است', 'error'))
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
                        <div className={style.info}>
                            لطفا رمز عبور خود را وارد کنید
                        </div>
                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.input_sec}>
                                <input type="text" name='password' required />
                            </div>
                            <span className={style.error} ref={Error}></span>
                            <button className={style.btn}>ورود</button>
                            <Link href={{
                                pathname: '/auth/verify',
                                query: { email: query.email }
                            }}>ورود با رمز یکبار مصرف</Link>
                        </form>
                    </div>
                </section>
            </main >
        </>
    );
};

export default password;