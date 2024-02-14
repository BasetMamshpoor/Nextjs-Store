import { useRouter } from 'next/router';
import style from 'styles/Login.module.css'
import Logo from '../../public/Images/logo-no-background-transformed.png'
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import VerifyCode from 'Components/auth/VerifyCode'
import axios from 'axios';
import { Functions } from 'providers/FunctionsProvider';
import Loading from 'Components/Loading';

const verify = () => {
    const { query, push } = useRouter()
    const { SwalStyled } = useContext(Functions)
    const [loadin, setLoadin] = useState(true)


    useEffect(() => {
        if (!query.email)
            push('/auth/login')
        else {
            const send_otp = async () => {
                await axios.post('/auth/send-otp', { email: query.email })
                    .then(res => {
                        SwalStyled.fire('ارسال شد', `ارسال شد ${query.email} کد فعال سازی به ایمیل `, 'success')
                        setLoadin(false)
                    })
                    .catch(err => {
                        setLoadin(false)
                        SwalStyled.fire('ارسال نشد', 'مشکلی در فرایند ارسال کد پیش آمده', 'error')
                    })
            }
            send_otp()
        }
    }, [])



    return (
        <>
            <main className={style.main}>
                <section className={style.card}>
                    <div className={style.login}>
                        {!loadin ? <>
                            <div className={style.logo}>
                                <Link href='/'>
                                    <img src={Logo.src} alt="" />
                                </Link>
                            </div>
                            <h1 className={style.title}>رمز یکبار مصرف</h1>
                            <div className={style.info}>
                                رمز یکبار مصرف ارسال شده به ایمیل را وارد کنید.
                            </div>
                            <VerifyCode email={query.email} forword={query.forword} register={query.register ?? false} />
                            {query.register ? <Link href={{
                                pathname: '/auth/password',
                                query: { email: query.email }
                            }}>ورود با رمز عبور</Link> : null}
                        </> : <Loading />}
                    </div>
                </section>
            </main >
        </>
    );
};

export default verify;

