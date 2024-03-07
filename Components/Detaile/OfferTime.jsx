import Timer from 'Components/Timer';
import style from './OfferTime.module.css';
import Image from 'next/image';
import img from 'public/Images/IncredibleOffer.svg'
const OfferTime = ({ off_date_to }) => {
    const timeDiscount = ((new Date(off_date_to).getTime() - new Date().getTime()) / 1000)

    return (
        <>
            <div className={style.offer}>
                {!!off_date_to && (timeDiscount < 86400) && <>
                    <Timer time={timeDiscount} message='اتمام تخفیف' classNameTimer={style.timer} classNameEtmam={style.EtmamTakhfif} withProgress={false} />
                </>}
                <div className={style.img}>
                    <Image src={img.src} width={100} height={100} alt='' />
                </div>
            </div>
        </>
    );
};

export default OfferTime;