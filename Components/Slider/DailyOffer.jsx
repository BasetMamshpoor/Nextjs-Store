import React, { useContext } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import amazing from 'public/Images/amazing-typo.svg'
import 'swiper/css/navigation'
import 'swiper/css';
import Image from 'next/image';
import useRequest from 'hooks/useRequest';
import Link from 'next/link';
import { e2p } from 'Functions/ConvertNumbers';
import addComma from 'Functions/addComma';
import { CiDiscount1 } from 'react-icons/ci'
import { Categories } from 'providers/CategoriesProvider';

const DailyOffer = () => {

    const [data] = useRequest('/products/discounts')
    const { categories } = useContext(Categories)

    return (
        <>
            <section className='dealyOff'>
                {!!data && <div className="container">
                    <div className="kfIu">
                        <div dir='rtl' className='slideList'>
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                spaceBetween={5}
                                slidesPerView={6}
                                centeredSlides={false}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 2,
                                    },
                                    640: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                    },
                                    992: {
                                        slidesPerView: 5,
                                    },
                                    1200: {
                                        slidesPerView: 6,
                                    },
                                    1980: {
                                        slidesPerView: 6,
                                    },
                                }}
                            >
                                <SwiperSlide>
                                    <div className="Lfjhe">
                                        <div className="amazingImg">
                                            <Image src={amazing} alt="" />
                                        </div>
                                        <div className="box_offer">
                                            <CiDiscount1 />
                                        </div>
                                        <Link href={`/category-${categories[0].slug}-apparel?discount=true`}>مشاهده همه</Link>
                                    </div>
                                </SwiperSlide>
                                {data.map((el, index) => {
                                    if (index < 9) {
                                        return (
                                            <SwiperSlide key={el.id}>
                                                <Link href={`/products/${el.id}`} className='Jqz-03x'>
                                                    <div className="wsapJ">
                                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={el.image} alt="" />
                                                        <span>%{e2p(el.offPercent)}</span>
                                                    </div>
                                                    <div className="oHbsI">
                                                        <p>{addComma(el.offPrice)}</p>
                                                        <span>{addComma(el.price)}</span>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        )
                                    } else return
                                })}
                                <SwiperSlide>
                                    <div className='Jqz-03x'>
                                        <div className="sdlks">
                                            <Link className="vsJsm" href={`/category-${categories[0].slug}-apparel?discount=true`}>
                                                <svg viewBox="0 0 16 16">
                                                    <path
                                                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                                </svg>
                                                <p>نمایش همه</p>
                                            </Link>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>}
            </section>
        </>
    );
};

export default React.memo(DailyOffer);