import React from 'react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/autoplay';
import 'swiper/css';
import Image from 'next/image';
import useRequest from 'hooks/useRequest';
import Link from 'next/link';

const Slider = () => {

    const [data] = useRequest('/sliders')

    return (
        <>
            <section className="main_slider">
                <div className="container">
                    <div className="main_slide">
                        <Swiper
                            navigation
                            modules={[Pagination, Autoplay, Navigation]}
                            loop
                            speed={300}
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{ disableOnInteraction: false, delay: 6000, reverseDirection: true }}
                        >
                            {!!data && data.reverse().map(el => {
                                return (
                                    <SwiperSlide key={el.id}>
                                        <div>
                                            <Link href={el.link}>
                                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={el.src} alt="" />
                                            </Link>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </section>
        </>
    );
};

export default React.memo(Slider);