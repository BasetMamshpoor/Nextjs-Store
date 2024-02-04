import Link from 'next/link';
import style from './Slider.module.css'
import { FiPlus, FiEdit3 } from 'react-icons/fi'
import createModal from 'Components/Modal';
import NewSlide from './NewSlide';
import useRequest from 'hooks/useRequest';
import Image from 'next/image';
import Pagination from 'Components/Pagination/Pagination';
import { useContext, useState } from 'react';
import { Functions } from 'providers/FunctionsProvider';

const Slider = () => {
    const [currentpage, setCurrentpage] = useState(1)
    const [data, setData, reload, paginations] = useRequest(`/admin/sliders`, currentpage)
    const { SwalStyled } = useContext(Functions)

    return (
        <>
            {!!data && <div className={style.Ezioq7_9}>
                <div className={style.header}>
                    <h2>اسلایدر صفحه اصلی</h2>
                    <div className={style.newSlide} onClick={() => createModal(<NewSlide SwalStyled={SwalStyled} reload={reload} />)}>
                        <FiPlus />
                    </div>
                </div>
                <div className={style.Jb6Te_33}>
                    {data.map(e => {
                        return (
                            <div className={style.i8yv_o1a} key={e.id}>
                                <div className={style.zQrcU62}>
                                    <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={e.src} alt="" />
                                </div>
                                <Link href={e.link} className={style.upqRAq}>
                                    {e.link}
                                </Link>
                                <div className={style.slideOption} >
                                    <div className={style.edit} onClick={() => createModal(<NewSlide SwalStyled={SwalStyled} setData={setData} data={e} reload={reload} />)}>
                                        <FiEdit3 />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Pagination currentPage={currentpage} setCurrentPage={setCurrentpage} dataLength={paginations.meta.total} itemsPerPage={paginations.meta.per_page} boxShadow={false} />
            </div>}
        </>
    );
};

export default Slider;