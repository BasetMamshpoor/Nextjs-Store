import { useContext, useRef, useState } from 'react';
import style from './VerifyCode.module.css'
import axios from 'axios';
import { Functions } from 'providers/FunctionsProvider';
import { Authorization } from 'providers/AuthorizationProvider';

const VerifyCode = ({ email, push }) => {
    const inputRefs = Array.from({ length: 6 }, () => useRef(null));
    const Error = useRef()
    const [KEYBOARDS] = useState({
        backspace: 8,
        arrowLeft: 37,
        arrowRight: 39,
    });
    const { SwalStyled } = useContext(Functions)
    const { getTokens } = useContext(Authorization)

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
            const data = {
                grant_type: 'otp_grant',
                client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
                client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
                email,
                otp: value,
                provider: 'users'
            }
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/oauth/token`, data)
                .then(({ data }) => getTokens(data))
                .catch(err => SwalStyled.fire('', err.response.data.message, 'error'))
        }
    }

    return (
        <>
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
                            required
                        />
                    ))}
                </div>
                <span className={style.error} ref={Error}></span>
                <button className={style.btn}>ورود</button>
            </form>
        </>
    );
};

export default VerifyCode;