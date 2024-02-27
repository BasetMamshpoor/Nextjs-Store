import { GiClothes, GiKnightBanner } from 'react-icons/gi'
import { MdOutlineFileUpload, MdSettings, MdSpaceDashboard } from 'react-icons/md'
import { BsCart3, BsBuilding } from 'react-icons/bs'
import { FaUsers } from "react-icons/fa";
import { FiSliders } from 'react-icons/fi';
import { BiCategory } from 'react-icons/bi';
import { GrUserAdmin } from "react-icons/gr";
import Slider from 'Components/Vendor/Slider';
import Brands from 'Components/Vendor/Brands';
import Category from 'Components/Vendor/Category';
import Banner from 'Components/Vendor/Banner';
import AdminProducts from 'Components/Vendor/Products/AdminProducts';
import ProductForm from 'Components/Vendor/Option_Product/ProductForm';
import React from 'react'
let adminRoutes = [
    { link: undefined, icon: <GrUserAdmin />, name: 'ادمین' },
    { link: 'dashboard', icon: <MdSpaceDashboard />, name: 'داشبورد' },
    { link: 'new-product', icon: <MdOutlineFileUpload />, name: 'اضافه کردن محصول جدید', component: <ProductForm />, },
    { link: 'category', icon: <BiCategory />, name: 'دسته بندی', component: <Category />, },
    { link: 'brands', icon: <BsBuilding />, name: 'برندها', component: <Brands />, },
    { link: 'slider', icon: <FiSliders />, name: 'اسلایدر', component: <Slider />, },
    { link: 'banners', icon: <GiKnightBanner />, name: 'بنرها', component: <Banner />, },
    { link: 'products', icon: <GiClothes />, name: 'محصولات', component: <AdminProducts /> },
    { link: 'orders', icon: <BsCart3 />, name: 'سفارشات' },
    { link: 'setting', icon: <MdSettings />, name: 'تغییر مشخصات' },
    { link: 'users', icon: <FaUsers />, name: 'کاربران' },
]
export { adminRoutes }