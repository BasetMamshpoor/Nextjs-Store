import React from 'react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import 'swiper/css/autoplay';
import 'swiper/css';

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

    return (
        <>
            <section className="slider">
                <Swiper
                    navigation
                    modules={[Pagination, Autoplay, Navigation]}
                    loop
                    speed={300}
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ disableOnInteraction: false }}
                >
                    <SwiperSlide>
                        <div style={style}>
                            <a href="/" style={styleA}>
                                <img src='Images/123f3fcf8fe1ad45977debe08521b6d6249d0ebe_1655095296.jpg' alt="" />
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={style}>
                            <a href="/" style={styleA}>
                                <img src='Images/356e3d694010a8976b7ccbd02b3566aed02ae6c6_1655095354.jpg' alt="" />
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={style}>
                            <a href="/" style={styleA}>
                                <img src='Images/4254f19745e2df1770471407b585fb3502fc86af_1655203082.jpg' alt="" />
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={style}>
                            <a href="/" style={styleA}>
                                <img src='Images/b6d809bb0a50824bacfedf881e63a89250dd9547_1655095013.jpg' alt="" />
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div style={style}>
                            <a href="/" style={styleA}>
                                <img src='Images/c41a7b6a8f90d7344e2fa517faa38320a3ba69c2_1662131478.jpg' alt="" />
                            </a>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </section>
        </>
    );
};

export default React.memo(Slider);