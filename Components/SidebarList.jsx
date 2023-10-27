import Link from 'next/link';
import { GiClothes } from 'react-icons/gi'
import { MdOutlineFileUpload, MdSettings, MdSpaceDashboard } from 'react-icons/md'
import { BsCart3, BsBuilding } from 'react-icons/bs'
import { FiSliders } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';

const SidebarList = ({ vendor, style }) => {
    let list = [
        { link: 'dashboard', icon: <MdSpaceDashboard />, name: 'داشبورد' },
        { link: 'category', icon: <BiCategory />, name: 'دسته بندی' },
        { link: 'brands', icon: <BsBuilding />, name: 'برندها' },
        { link: 'products', icon: <GiClothes />, name: 'محصولات' },
        { link: 'new-product', icon: <MdOutlineFileUpload />, name: 'اضافه کردن محصول جدید' },
        { link: 'slider', icon: <FiSliders />, name: 'اسلایدر' },
        { link: 'orders', icon: <BsCart3 />, name: 'سفارشات' },
        { link: '', icon: <MdSettings />, name: 'تغییر مشخصات' },
    ]
    return (
        <>
            <div className={style.loVgtSw_5Q}>
                <ul className={style.OcWz_yc1a}>
                    {list.map(l => {
                        return (
                            <li className={style.list} key={l.link}>
                                <Link href={`/admin/${l.link}`} className={`${style.JbxnrS_6g6d} ${!!(vendor === l.link) ? style.JbxnrS_active : ''}`}>
                                    <div className={style.cxZw_p112}>
                                        <div>
                                            {l.icon}
                                        </div>
                                        <p>{l.name}</p>
                                    </div>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
};

export default SidebarList;