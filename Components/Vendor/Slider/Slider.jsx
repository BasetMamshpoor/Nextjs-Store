import Link from 'next/link';
import style from './Slider.module.css'
import { FiPlus, FiTrash2, FiEdit3 } from 'react-icons/fi'
import createModal from 'Components/Modal';
import NewSlide from './NewSlide';
import useRequest from 'hooks/useRequest';
import Image from 'next/image';
import axios from 'axios';

const Slider = () => {
    const [data, setData] = useRequest('/sliders')

    const handleDelete = (id) => {
        axios.delete(`/admin/sliders/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setData(prev => {
            const Prev = prev.filter(s => s.id !== id)
            return Prev
        })
    }

    return (
        <>
            <div className={style.Ezioq7_9}>
                <div className={style.Jb6Te_33}>
                    {data && data.map(e => {
                        return (
                            <div className={style.i8yv_o1a} key={e.id}>
                                <div className={style.zQrcU62}>
                                    <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={e.src} alt="" />
                                </div>
                                <Link href={e.link} className={style.upqRAq}>
                                    {e.link}
                                </Link>
                                <div className={style.slideOption} >
                                    <div className={style.edit} onClick={() => createModal(<NewSlide data={e} />)}>
                                        <FiEdit3 />
                                    </div>
                                    <div className={style.Exw11_O0} onClick={() => handleDelete(e.id)}>
                                        <FiTrash2 />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div className={style.gTvRzoaP2}>
                        <div className={style.yySwe2_9oo} onClick={() => createModal(<NewSlide />)}>
                            <FiPlus />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Slider;