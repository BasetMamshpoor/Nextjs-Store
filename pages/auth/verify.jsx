import { useRouter } from 'next/router';
import style from 'styles/Login.module.css'
import Logo from '../../public/Images/logo-no-background-transformed.png'
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Functions } from 'providers/FunctionsProvider';
import Loading from 'Components/Loading';
import { Authorization } from 'providers/AuthorizationProvider';
import Timer from 'Components/Timer';

const verify = () => {
    const { query, push } = useRouter()
    const { email, forword } = query

    const Error = useRef()
    const inputRefs = Array.from({ length: 6 }, () => useRef(null));

    const { SwalStyled } = useContext(Functions)
    const { getTokens, getUserInformation } = useContext(Authorization)

    const [response, setResponse] = useState({ expires_in: 0 })
    const [loadin, setLoadin] = useState(true)
    const [sendAgain, setSendAgain] = useState(0)
    const [KEYBOARDS] = useState({
        backspace: 8,
        arrowLeft: 37,
        arrowRight: 39,
    });

    useEffect(() => {
        if (!query.email)
            push('/auth/login')
        else {
            const send_otp = async () => {
                await axios.post('/auth/send-otp', { email: query.email })
                    .then(res => {
                        setLoadin(false)
                        SwalStyled.fire('ارسال شد', `ارسال شد ${query.email} کد فعال سازی به ایمیل `, 'success')
                        setResponse(res.data)
                    })
                    .catch(err => {
                        setLoadin(false)
                        setResponse({ expires_in: 120 })
                        SwalStyled.fire('ارسال نشد', err.response.data.message, 'error')
                    })
            }
            send_otp()
        }
    }, [sendAgain])
    const handleInput = (e, index) => {
        const nextInput = inputRefs[index + 1];
        if (nextInput && e.target.value) {
            nextInput.current.focus();
            if (nextInput.current.value) {
                nextInput.current.select();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const paste = e.clipboardData.getData('text');
        inputRefs.forEach((inputRef, i) => {
            inputRef.current.value = paste[i] || '';
        });
    };

    const handleBackspace = (e, index) => {
        if (!!e.target.value) {
            e.target.value = '';
            return;
        } else handleArrowLeft(index)
    };

    const handleArrowLeft = (index) => {
        const previousInput = inputRefs[index - 1];
        if (previousInput)
            previousInput.current.focus();
    };

    const handleArrowRight = (index) => {
        const nextInput = inputRefs[index + 1];
        if (nextInput)
            nextInput.current.focus();
    };

    const handleKeyDown = (e, index) => {
        switch (e.keyCode) {
            case KEYBOARDS.backspace:
                handleBackspace(e, index);
                break;
            case KEYBOARDS.arrowLeft:
                handleArrowLeft(index);
                break;
            case KEYBOARDS.arrowRight:
                handleArrowRight(index);
                break;
            default:
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const value = inputRefs.map(input => input.current.value).join('')
        if (value.length < 6) {
            Error.current.innerText = 'طول کد 6 واحد است.'
        } else {
            Error.current.innerText = ''
            if (forword) {
                push({ pathname: forword, query: { code: value } }, forword)
            } else {
                const data = {
                    grant_type: 'otp_grant',
                    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                    client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
                    email,
                    otp: value,
                    provider: 'users'
                }
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/oauth/token`, data)
                    .then(async ({ data }) => {
                        getTokens(data)
                        const user = await getUserInformation(data)
                        await push(`/${user.role}`)
                    })
                    .catch(err => SwalStyled.fire('', err.response.data.message, 'error'))
            }
        }
    }


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
                            <form className={style.form} onSubmit={handleSubmit}>
                                <div className={style.verify}>
                                    {inputRefs.map((inputRef, index) => (
                                        <input
                                            key={index}
                                            ref={inputRef}
                                            type="number"
                                            maxLength="1"
                                            pattern="[0-9]"
                                            className={style.form_control}
                                            onInput={(e) => handleInput(e, index)}
                                            onKeyDown={e => handleKeyDown(e, index)}
                                            onPaste={index === 0 ? e => handlePaste(e) : e => e.preventDefault()}
                                        />
                                    ))}
                                </div>
                                <span className={style.error} ref={Error}></span>
                                <div className={style.expire}>
                                    <span>رمز را دريافت نکرده‌ايد؟ </span>
                                    <Timer time={response.expires_in} withProgress={false} withHour={false}
                                        message={<p className={style.sendAgain} onClick={e => {
                                            setLoadin(true)
                                            setSendAgain(Math.random())
                                        }}>ارسال مجدد</p>} />
                                </div>
                                <button className={style.btn}>ورود</button>
                            </form>
                            {query.forword ? <Link href={{
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

