import { useState } from "react";
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

const DetaileSlider = ({ Images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <div dir="rtl" className={`DetailSlider ${style.slider}`} >
                <Swiper
                    navigation={true}
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
            </div >
        </>
    );
}
export default DetaileSlider;