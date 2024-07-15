import createModal from 'Components/Modal';
import style from './Address.module.css';
import { HiOutlineLocationMarker } from "react-icons/hi";
import ManageAddresses from './ManageAddresses';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from 'react';
const Address = ({ address, reload, dispatch, SwalStyled, user, tokens }) => {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        if (!!address && !!address.length) {
            setIndex(address.length - 1)
            dispatch({ type: "ADD_ADDRESS", payload: { id: address[address.length - 1].id } })
        }
    }, [address])
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
                        createModal(<ManageAddresses addresses={address} reload={reload} SwalStyled={SwalStyled} dispatch={dispatch}
                            index={index} setIndex={setIndex} user={user} tokens={tokens} />)}
                        className={style.change}>تغییر یا ویرایش آدرس <MdKeyboardArrowLeft /></div>
                </div>
            </div>
        </>
    );
};

export default Address;