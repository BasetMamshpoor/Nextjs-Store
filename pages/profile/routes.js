import { BsPerson, BsBag, BsHeart, } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { FaRegCommentDots } from 'react-icons/fa';
import { MdOutlineMessage } from 'react-icons/md';
import { RiHomeSmile2Line } from "react-icons/ri";
import Address from 'Components/Profile/Address';
import Information from 'Components/Profile/Information';
import Orders from 'Components/Profile/Orders';
import Wishlist from 'Components/Profile/Wishlist';
import Comments from 'Components/Profile/Comments';

let profileRoutes = [
    { link: undefined, icon: <RiHomeSmile2Line />, name: 'حساب کاربری' },
    { link: 'information', icon: <BsPerson />, name: 'اطلاعات حساب کاربری', component: <Information />, },
    { link: 'orders', icon: <BsBag />, name: 'سفارشات', component: <Orders />, },
    { link: 'wishlist', icon: <BsHeart />, name: 'لیست علاقه‌مندی', component: <Wishlist />, },
    { link: 'address', icon: <GrLocation />, name: 'آدرس‌ها', component: <Address />, },
    { link: 'comments', icon: <FaRegCommentDots />, name: 'دیدگاه‌ها', component: <Comments />, },
    { link: 'messages', icon: <MdOutlineMessage />, name: 'پیغام‌های پشتیبانی' },
]
export default profileRoutes;