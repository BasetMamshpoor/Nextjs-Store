import { BsPerson, BsBag, BsHeart, } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { FaRegCommentDots } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { MdOutlineMessage } from 'react-icons/md';
import Address from 'Components/Profile/Address';
import Information from 'Components/Profile/Information';
import Orders from 'Components/Profile/Orders';
import Wishlist from 'Components/Profile/Wishlist';
import Comments from 'Components/Profile/Comments';

let profileRoutes = [
    { link: 'information', icon: <BsPerson />, name: 'اطلاعات حساب کاربری', component: <Information />, },
    { link: 'orders', icon: <BsBag />, name: 'سفارشات', component: <Orders />, },
    { link: 'wishlist', icon: <BsHeart />, name: 'لیست علاقه‌مندی', component: <Wishlist />, },
    { link: 'address', icon: <GrLocation />, name: 'آدرس‌ها', component: <Address />, },
    { link: 'comments', icon: <FaRegCommentDots />, name: 'دیدگاه‌ها', component: <Comments />, },
    { link: '', icon: <MdOutlineMessage />, name: 'پیغام‌های پشتیبانی' },
    { link: '', icon: <IoIosLogOut />, name: 'خروج' },
]
export default profileRoutes;