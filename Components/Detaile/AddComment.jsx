import React, { useEffect, useState, useRef } from 'react';
// import './addcomment.css'
const AddComment = ({ button }) => {
    const [display, setDisplay] = useState(false)
    const input = useRef();

    useEffect(() => {
        if (display) {
            const e = input.current
            e.style.setProperty('--value', e.value);
            e.addEventListener('input', () => e.style.setProperty('--value', e.value));
        }
        button.current.addEventListener('click', () => setDisplay(true))
    }, [button, display])


    return (
        <>
            {display && <div className="addCommentModal">
                <div className="spOil8">
                    <header className="Exolap border-bottom">
                        <p className="yxewQ">دیدگاه خود را در مورد این محصول وارد کنید.</p>
                        <div className="rxwClose" onClick={() => setDisplay(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </div>
                    </header>
                    <main className="gtDComm">
                        <div className="ocRxiu mx-3">
                            <label className="ibtc">امتیاز دهید.<span className="requierd">*</span></label>
                            <input ref={input} className="PybIec" type="range" min="1" max="5" defaultValue='1' />
                            <ul className="Rcoply">
                                <li>
                                    <span>
                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                        </svg>
                                    </span>
                                    <span>خیلی بد</span>
                                </li>
                                <li>
                                    <span>
                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                        </svg>
                                    </span>
                                    <span>بد</span>
                                </li>
                                <li>
                                    <span>
                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                        </svg>
                                    </span>
                                    <span>معمولی</span>
                                </li>
                                <li>
                                    <span>
                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                        </svg>
                                    </span>
                                    <span>خوب</span>
                                </li>
                                <li>
                                    <span>
                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                        </svg>
                                    </span>
                                    <span>عالی</span>
                                </li>
                            </ul>
                        </div>
                        <div className="VqoJu">
                            <label className="e3Xipy">متن نظر!<span className="requierd">*</span></label>
                            <textarea className="TciBol" placeholder="این محصول ..."></textarea>
                        </div>
                        <div className="Oibt0s">
                            <input className="form-check-input m-0" type="checkbox"
                                id="anonymousComment" />
                            <label htmlFor="anonymousComment" className="WcMql me-2">ارسال به صورت
                                ناشناس</label>
                        </div>
                    </main>
                    <footer className="PohtI9">
                        <button className="Opibt">ثبت دیدگاه</button>
                        <label className="iOnht">ثبت دیدگاه به معنی قبول
                            <a href="."> قوانین ما </a>
                            است.</label>
                    </footer>
                </div>
            </div>}
        </>
    );
};

export default AddComment;