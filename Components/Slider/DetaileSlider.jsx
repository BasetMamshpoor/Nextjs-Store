import React, { useState } from "react";
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

const DetaileSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <div dir="rtl" className='DetailSlider' >
                <Swiper
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Navigation, Thumbs]}
                    className={style.productImg}
                >
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/edc7019fd30600304ff9acb5178a2b04cf0a5a1f_1630735755.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/d9e75c89ff8ec4255f9220a08c303e462f051429_1629004379.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/8eda857e8ac9dc561bb4c4707375d58163e1f826_1629004375.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/d9401f17b386f9fe1ec4e77bb7d06d9e9062fe6e_1629004381.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/e678d23d3cb191a4618dacefae283cd93e12eac9_1628600690.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/9fa604fa086a427379c944981e90bc478eb1d170_1628600688.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/8c0f8e2178b6fccb50682a69df127f4710e473a8_1628600692.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/628f734653379140cdb7044df4616a2d11653abf_1628600694.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/02f4c29594ea4be069809398eeb42e3bee1e307e_1650089976.jpg" alt="" />
                    </SwiperSlide>
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
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/edc7019fd30600304ff9acb5178a2b04cf0a5a1f_1630735755.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/d9e75c89ff8ec4255f9220a08c303e462f051429_1629004379.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/8eda857e8ac9dc561bb4c4707375d58163e1f826_1629004375.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/d9401f17b386f9fe1ec4e77bb7d06d9e9062fe6e_1629004381.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/e678d23d3cb191a4618dacefae283cd93e12eac9_1628600690.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/9fa604fa086a427379c944981e90bc478eb1d170_1628600688.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/8c0f8e2178b6fccb50682a69df127f4710e473a8_1628600692.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/628f734653379140cdb7044df4616a2d11653abf_1628600694.jpg" alt="" />
                    </SwiperSlide>
                    <SwiperSlide className={style.swiper_slide}>
                        <img src="/Images/details/02f4c29594ea4be069809398eeb42e3bee1e307e_1650089976.jpg" alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
}
export default DetaileSlider;