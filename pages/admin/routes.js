import { GiClothes } from 'react-icons/gi'
import { MdOutlineFileUpload, MdSettings, MdSpaceDashboard } from 'react-icons/md'
import { BsCart3, BsBuilding } from 'react-icons/bs'
import { FiSliders } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';
import Form from 'Components/Vendor/Form';
import Slider from 'Components/Vendor/Slider';
import Brands from 'Components/Vendor/Brands';
import Category from 'Components/Vendor/Category';

let adminRoutes = [
    { link: 'dashboard', icon: <MdSpaceDashboard />, name: 'داشبورد' },
    { link: 'new-product', icon: <MdOutlineFileUpload />, name: 'اضافه کردن محصول جدید', component: <Form />, },
    { link: 'category', icon: <BiCategory />, name: 'دسته بندی', component: <Category />, },
    { link: 'brands', icon: <BsBuilding />, name: 'برندها', component: <Brands />, },
    { link: 'slider', icon: <FiSliders />, name: 'اسلایدر', component: <Slider />, },
    { link: '', icon: <GiClothes />, name: 'محصولات' },
    { link: '', icon: <BsCart3 />, name: 'سفارشات' },
    { link: '', icon: <MdSettings />, name: 'تغییر مشخصات' },
]
export default adminRoutes