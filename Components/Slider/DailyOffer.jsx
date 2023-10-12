import React from 'react';
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


const DailyOffer = () => {

    const [data] = useRequest('/products/discounts')

    return (
        <>
            <section className='dealyOff'>
                {data && <div className="container">
                    <div className="kfIu">
                        <div dir='rtl'>
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                spaceBetween={5}
                                slidesPerView={6}
                                centeredSlides={false}
                            >
                                {data.data.map((el, index) => {
                                    if (index < 9) {
                                        return (
                                            <SwiperSlide>
                                                <Link href={`/products/${el.id}`} className='Jqz-03x'>
                                                    <div className="wsapJ">
                                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={el.image} alt="" />
                                                        <span>%{e2p(el.offPercent)}</span>
                                                    </div>
                                                    <div className="oHbsI">
                                                        <p>{addComma(el.offPrice.toString())}</p>
                                                        <span>{addComma(el.price.toString())}</span>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        )
                                    } else return
                                })}
                                <SwiperSlide>
                                    <div className='Jqz-03x'>
                                        <div className="sdlks">
                                            <Link className="vsJsm" href="/incredible-offers/">
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
                        <div className="Lfjhe">
                            <div className="amazingImg">
                                <Image src={amazing} alt="" />
                            </div>
                            <div className="box_offer">
                                <svg viewBox="0 0 122.88 122.88"><path d="M13.7,49.54,8,33.63a3.47,3.47,0,0,1,2.1-4.44,3.93,3.93,0,0,1,.81-.18L27.3,27.3,29,10.79a3.47,3.47,0,0,1,3.81-3.1,2.9,2.9,0,0,1,.71.15l16,4.11L58.8,1.21A3.49,3.49,0,0,1,63.7.83a3.91,3.91,0,0,1,.61.68l9,12.17,15.91-5.8A3.48,3.48,0,0,1,93.69,10a3.44,3.44,0,0,1,.19.83l1.7,16.51L112.09,29a3.47,3.47,0,0,1,2.71,5.09l-7.3,13.77,14,10.83a3.46,3.46,0,0,1,.62,4.87,3.18,3.18,0,0,1-.72.7L109.2,73.33,115,89.24a3.48,3.48,0,0,1-2.08,4.45,3.44,3.44,0,0,1-.83.19l-16.51,1.7L93.88,112a3.48,3.48,0,0,1-3.81,3.1,3.61,3.61,0,0,1-1.27-.38L75,107.49l-10.85,14a3.46,3.46,0,0,1-5.57-.1l-9.08-12.25-15.91,5.74A3.47,3.47,0,0,1,29,112.05L27.3,97.29,10.53,93.82a3.46,3.46,0,0,1-2.7-4.09A2.62,2.62,0,0,1,8,89.11L13.7,73.34,1.4,64.23a3.48,3.48,0,0,1-.72-4.86,3.42,3.42,0,0,1,.77-.75L13.7,49.54Zm62.39-6.2L55.66,78.86a6.86,6.86,0,0,1-.67,1,2.76,2.76,0,0,1-.82.71,3.14,3.14,0,0,1-1.1.31,10.25,10.25,0,0,1-1.31.07H47.9a1.16,1.16,0,0,1-1.16-1.15,1.18,1.18,0,0,1,.21-.67L67.39,43.57a7.2,7.2,0,0,1,.65-1l0-.06a2.84,2.84,0,0,1,.78-.65A3.15,3.15,0,0,1,70,41.59h0a10,10,0,0,1,1.29-.07h3.85a1.16,1.16,0,0,1,1.16,1.15,1.18,1.18,0,0,1-.21.67Zm-7.4,36.07c-1.72-1.8-2.59-4.56-2.59-8.28s.87-6.48,2.59-8.28,4.52-2.7,8.4-2.7,6.68.9,8.4,2.7,2.58,4.56,2.58,8.28-.86,6.48-2.58,8.28-4.52,2.7-8.4,2.7-6.68-.9-8.4-2.7Zm6-11.44v8h1.3a16.21,16.21,0,0,0,3.27-.26c.22-.18.33-.67.33-1.46v-8h-3a3,3,0,0,0-1.58.26c-.21.18-.32.67-.32,1.46ZM37.39,60q-2.58-2.7-2.58-8.28t2.58-8.28q2.58-2.7,8.4-2.7t8.4,2.7q2.58,2.7,2.58,8.28T54.19,60q-2.58,2.7-8.4,2.7T37.39,60Zm6-11.44v8h3a2.93,2.93,0,0,0,1.57-.27c.22-.18.33-.67.33-1.46v-8H46.93a15.28,15.28,0,0,0-3.26.27c-.22.17-.33.66-.33,1.45ZM16,35.46l5,14a3.48,3.48,0,0,1-1.14,4.13L9.3,61.44,19.9,69.3a3.48,3.48,0,0,1,1.2,4L15.84,87.84,31,91a3.48,3.48,0,0,1,3,3.05l1.49,12.9,14.05-5.06A3.47,3.47,0,0,1,53.59,103l7.91,10.68,9.74-12.61A3.48,3.48,0,0,1,75.69,100l11.81,6.21L89,92.1A3.47,3.47,0,0,1,92.06,89L107,87.43,101.8,73.32a3.46,3.46,0,0,1,1.18-4l10.67-7.92-12.52-9.67A3.5,3.5,0,0,1,100,47.18l6.26-11.8L92.1,33.93A3.48,3.48,0,0,1,89,30.82L87.43,15.93,73.32,21.08a3.48,3.48,0,0,1-4-1.18L61.24,9l-7.8,9.07a3.48,3.48,0,0,1-3.5,1.1L35.5,15.5,33.92,30.78a3.47,3.47,0,0,1-3.1,3.14L16,35.46Z" /></svg>
                            </div>
                            <a href=".">مشاهده همه</a>
                        </div>
                    </div>
                </div>}
            </section>
        </>
    );
};

export default React.memo(DailyOffer);