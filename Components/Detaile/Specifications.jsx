import style from './Comments.module.css'

const Specifications = ({ data }) => {
    return (
        <>
            <div className={style.r0Oi2} id="Specifications">
                <div className={style.x3qao_hj}>
                    <h5>مشخصات</h5>
                </div>
                <div className='row pt-3'>
                    <div className={`${style.hdoRE} col-lg-12`}>
                        <div className={style.ewZQpsi}>
                            <ul className={style.oVtn}>
                                {data.map((s, i) => {
                                    return (
                                        <li key={i}>
                                            <p className={style.cXopw}>{s.name} :</p>
                                            <p className={style.R2Ox_djc}>{s.value}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Specifications;