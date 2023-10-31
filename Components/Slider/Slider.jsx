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

    let style = {
        width: '100%',
        height: '28rem'
    }
    let styleA = {
        display: 'block',
        height: '100%',
        width: '100%'
    }

    const [data] = useRequest('/sliders?page=2')

    return (
        <>
            <section className="slider">
                <Swiper
                    navigation
                    modules={[Pagination, Autoplay, Navigation]}
                    loop
                    // speed={300}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                // autoplay={{ disableOnInteraction: false }}
                >
                    {!!data && data.map(el => {
                        return (
                            <SwiperSlide key={el.id}>
                                <div style={style}>
                                    <Link href={el.link} style={styleA}>
                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={el.src} alt="" />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </section>
        </>
    );
};

export default React.memo(Slider);