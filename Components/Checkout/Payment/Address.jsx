import createModal from 'Components/Modal';
import style from './Address.module.css';
import { HiOutlineLocationMarker } from "react-icons/hi";
import ManageAddresses from './ManageAddresses';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useState } from 'react';
const Address = ({ address, reload, SwalStyled, user, tokens }) => {
    const [index, setIndex] = useState(address.length - 1)
    return (
        <>
            <div className={style.address}>
                <div className={style.content}>
                    <div className={style.main}>
                        <div className={style.marker_icon}><HiOutlineLocationMarker /></div>
                        <div>
                            <div className={style.title}>آدرس تحویل سفارش</div>
                            <div className={style.address_text}>{address[index].address}</div>
                            <div className={style.name}>{address[index].name}</div>
                        </div>
                    </div>
                    <div onClick={() =>
                        createModal(<ManageAddresses addresses={address} reload={reload} SwalStyled={SwalStyled}
                            index={index} setIndex={setIndex} user={user} tokens={tokens} />)}
                        className={style.change}>تغییر یا ویرایش آدرس <MdKeyboardArrowLeft /></div>
                </div>
            </div>
        </>
    );
};

export default Address;