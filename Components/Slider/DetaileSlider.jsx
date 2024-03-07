import { useContext, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import style from "./DetaileSlider.module.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import Image from "next/image";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BiShare } from "react-icons/bi";
import { MdOutlineReportProblem } from "react-icons/md";
import axios from "axios";
import { Authorization } from "providers/AuthorizationProvider";
import { Functions } from "providers/FunctionsProvider";

const DetaileSlider = ({ Images, isBookmarked, id }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [like, setLike] = useState(isBookmarked)
    const { tokens } = useContext(Authorization)
    const { SwalStyled } = useContext(Functions)
    const headers = {
        Authorization: `${tokens.token_type} ${tokens.access_token}`
    }
    
    const handleBookmark = async () => {
        if (tokens) {
            await axios.post('/bookmark', { product_id: id }, { headers })
                .then(res => {
                    SwalStyled.fire('تایید شد', res.data.message, 'success')
                    setLike(!like)
                })
        } else SwalStyled.fire({
            title: 'ایراد در شناسایی',
            text: 'لطفا ابتدا وارد حساب کاربری شوید',
            icon: 'warning',
            showCancelButton: true,
            cancleButtonText: '',
            confirmButtonText: 'ورود',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            willClose: () => setIsOpen(false)
        }).then((result) => {
            if (result.isConfirmed) push('/auth/login')
        })
    }
    const handleCopy = () => {
        SwalStyled.fire({
            title: "اشتراک‌گذاری",
            text: 'این کالا را با دوستان خود به اشتراک بگذارید!',
            showDenyButton: true,
            confirmButtonText: "کپی کردن لینک",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    SwalStyled.fire("کپی شد!", "", "success");
                } catch (error) {
                    SwalStyled.fire("کپی نشد!", error, "error");
                }
            }
        })
    }

    return (
        <>
            <div dir="rtl" className={`DetailSlider ${style.slider}`} >
                <Swiper
                    navigation={true}
                    spaceBetween={15}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs]}
                    className={style.productImg}
                >
                    {Images.map(s => {
                        return (
                            <SwiperSlide className={style.swiper_slide} key={s.id}>
                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={s.src} alt="" />
                            </SwiperSlide>
                        )
                    })}

                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={20}
                    slidesPerView={4}
                    slidesPerGroup={2}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={style.productListImg}
                >
                    {Images.map((s, i) => {
                        return (
                            <SwiperSlide className={style.swiper_slide} key={i}>
                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={s.src} alt="" />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className={style.actions}>
                    <div className={style.item} onClick={handleBookmark}>
                        {like ? <FaHeart fill="red" /> : <FaRegHeart />}
                    </div>
                    <div className={style.item} onClick={handleCopy}>
                        <BiShare />
                    </div>
                    <div className={style.item}>
                        <MdOutlineReportProblem />
                    </div>
                </div>
            </div >
        </>
    );
}
export default DetaileSlider;