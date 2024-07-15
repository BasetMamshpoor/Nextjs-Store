import style from './ManageAddresses.module.css'
import { MdOutlineAddLocation, MdKeyboardArrowLeft, MdMailOutline, MdPersonOutline } from "react-icons/md";
import { BsSignpost2 } from "react-icons/bs";
import { BiMobileAlt } from "react-icons/bi";
import { e2p } from 'Functions/ConvertNumbers';
import createModal from 'Components/Modal';
import AddAddress from 'Components/Profile/Address/AddAddress';
import { ImRadioChecked, ImRadioUnchecked } from "react-icons/im";

const ManageAddresses = ({ addresses, dispatch, index, setIndex, reload, SwalStyled, user, tokens, setIsOpen }) => {
    return (
        <>
            <div className={style.main}>
                <div className={style.newAddress} onClick={() => createModal(<AddAddress reload={reload} SwalStyled={SwalStyled} user={{ ...user, ...tokens }} />)}>
                    <div className={style.label}>
                        <div className={style.icon}><MdOutlineAddLocation /></div>
                        <p>افزودن آدرس جدید</p>
                    </div>
                    <div className={style.icon}><MdKeyboardArrowLeft /></div>
                </div>
                <div className={style.list}>
                    {addresses.map((a, i) => {
                        return (
                            <label className={style.address} htmlFor={a.id} key={a.id} onClick={() => { setIndex(i); setIsOpen(false); dispatch({ type: "ADD_ADDRESS", payload: { id: a.id } }) }}>
                                <input id={a.id} type="radio" name='address' hidden value={a.id} defaultChecked={index == i ?? false} />
                                <span className={style.radio}><ImRadioUnchecked /><ImRadioChecked /></span>
                                <div className={style.content}>
                                    <p className={style.addresstext}>{a.address}</p>
                                    <div className={style.detail}>
                                        <div className={style.row}>
                                            <div className={style.icon}><MdMailOutline /></div>
                                            <p>{e2p(a.postalcode)}</p>
                                        </div>
                                        <div className={style.row}>
                                            <div className={style.icon}><BiMobileAlt /></div>
                                            <p>{e2p(a.cellphone)}</p>
                                        </div>
                                        <div className={style.row}>
                                            <div className={style.icon}><MdPersonOutline /></div>
                                            <p>{a.name}</p>
                                        </div>
                                        <div className={style.row}>
                                            <div className={style.icon}><BsSignpost2 /></div>
                                            <p>{e2p(a.number)}</p>
                                        </div>
                                    </div>
                                </div>
                            </label>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default ManageAddresses;