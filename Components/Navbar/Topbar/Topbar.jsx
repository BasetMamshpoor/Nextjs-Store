import { e2p } from 'Functions/ConvertNumbers';
import style from './Topbar.module.css'
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'

const TopBar = () => {

    return (
        <>
            <section className={style.topBar} id='topNavbar'>
                <div className={`container ${style.tpc}`}>
                    <div className={`${style.tcExi} d-flex`}>
                        <div className={style.contact}>
                            <span href='tel:110' className='ml-2'>{e2p('0910 111 1001')}</span>
                            <AiOutlinePhone />
                        </div>
                        <div className={`${style.contact} ml-3`}>
                            <span className='ml-2'>test@example.org</span>
                            <AiOutlineMail />
                        </div>
                    </div>
                    <div className={`${style.tcExi} d-flex`}>
                        <span >سوالات اولیه!</span>
                        <span className='ml-3'>کمک نیاز دارید؟</span>
                    </div>

                </div>
            </section>
        </>
    );
};

export default TopBar;