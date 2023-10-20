import axios from 'axios';
import { e2p } from 'Functions/ConvertNumbers';
import { useEffect, useRef, useState } from 'react';
import style from './AddComment.module.css'
import { BsDot } from 'react-icons/bs'

const AddComment = ({ id, setIsOpen }) => {
    const input = useRef();
    const parent = useRef()
    const [data, setData] = useState({ product_id: id, point: 1, user_id: null, date: new Date().toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }) })

    useEffect(() => {
        const e = input.current
        e.style.setProperty('--value', e.value);
        e.style.setProperty('--bg', '#f9bc00');
        const style = () => {
            e.style.setProperty('--value', e.value)
            e.style.setProperty('--bg', e.value > 3 ? '#00a049' : '#f9bc00')
        }

        e.addEventListener('input', style);

        return () => e.removeEventListener('input', style)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post('/comments', data)
            .then(() => setIsOpen(false))
            .then(() => parent.current.previousSibling.click())
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className={style.spOil8} dir='rtl' ref={parent}>
                <header className={style.Exolap}>
                    <p className={style.yxewQ}>دیدگاه خود را در مورد این محصول وارد کنید.</p>
                </header>
                <form onSubmit={handleSubmit}>
                    <main className={style.gtDComm}>
                        <div className={style.ocRxiu}>
                            <label htmlFor='point' className={style.ibtc}>امتیاز دهید.<span className={style.point}>{e2p(data.point)}</span></label>
                            <input id='point' ref={input} className={style.PybIec} type="range" min="1" max="5" defaultValue='1' onInput={(e) => setData(prev => { return { ...prev, point: e.target.value } })} />
                            <ul className={style.Rcoply}>
                                <li>
                                    <span>
                                        <BsDot />
                                    </span>
                                    <span>خیلی بد</span>
                                </li>
                                <li>
                                    <span>
                                        <BsDot />
                                    </span>
                                    <span>بد</span>
                                </li>
                                <li>
                                    <span>
                                        <BsDot />
                                    </span>
                                    <span>معمولی</span>
                                </li>
                                <li>
                                    <span>
                                        <BsDot />
                                    </span>
                                    <span>خوب</span>
                                </li>
                                <li>
                                    <span>
                                        <BsDot />
                                    </span>
                                    <span>عالی</span>
                                </li>
                            </ul>
                        </div>
                        <div className={style.VqoJu}>
                            <label className={style.e3Xipy}>متن نظر!<span className={style.requierd}>*</span></label>
                            <textarea className={style.TciBol} onChange={({ target }) => setData(prev => { return { ...prev, text: target.value } })} placeholder="این محصول ..."></textarea>
                        </div>
                        <div className={style.Oibt0s}>
                            <input className={style.form_check_input} type="checkbox"
                                id="anonymousComment" />
                            <label htmlFor="anonymousComment" className={style.WcMql}>ارسال به صورت
                                ناشناس</label>
                        </div>
                    </main>
                    <footer className={style.PohtI9}>
                        <button className={style.Opibt} onClick={handleSubmit}>ثبت دیدگاه</button>
                        <label className={style.iOnht}>ثبت دیدگاه به معنی قبول
                            <a href="."> قوانین ما </a>
                            است.</label>
                    </footer>
                </form>
            </div>
        </>
    );
};

export default AddComment;