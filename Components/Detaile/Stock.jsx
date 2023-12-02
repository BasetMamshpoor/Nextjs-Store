import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import { IsInCart, quantityItem } from 'helper/functions';
import { CartContext } from 'providers/CartContextProvider';
import { useContext } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import style from './Stock.module.css'

const stock = ({ product, size, setSize }) => {
    const { id, price, offPrice, sizes, color, colorCode, offPercent, off_date_from, off_date_to } = product
    const { state, dispatch } = useContext(CartContext)

    const sizeList = sizes.map((i, index) => <div className={`${style.EzP3_wzm1} ${size?.size === i.size ? style.det_active : ''}`} key={i.id} onClick={() => setSize(sizes[index])}><span>{i.size}</span></div>)

    return (
        <>
            <div className={style.qOOp}>
                <div className={style.sections}>
                    <label>رنگ:</label>
                    <div className={style.Asewq}>
                        <div className={`${style.EzP3_wzm2} ${style.det_active}`}>
                            <span style={{ background: colorCode }}></span>
                        </div>
                        <p>{color}</p>
                    </div>
                </div>
                {!!off_date_from && ((new Date(off_date_to).getTime() - new Date(off_date_from).getTime()) / 1000)}
            </div>
            {!!sizes.length ? <>
                <div className={style.qOOp}>
                    <div className={style.sections}>
                        <label>اندازه:</label>
                        <div className={style.Asewq}>
                            {sizeList}
                        </div>
                    </div>
                </div>
                <div className={style.WZZps} dir="ltr">
                    <div className={style.hJkg}>
                        <div className={style.ogSeft}>{addComma(offPrice.toString())}</div>
                        {price !== offPrice && < div className={style.OFFqap}><span>%{e2p(offPercent)}</span><del>{addComma(price.toString())}</del>
                        </div>}
                    </div>
                    <div className={style.Sxpot}>
                        {IsInCart(state, id + size?.size) ?
                            <div className={style.Dc_Oi88Ted}>
                                <button className={style.bTxn}>
                                    {quantityItem(state, id + size.size) < 2 ?
                                        <FiTrash2 onClick={() => dispatch({ type: "REMOVE_ITEM", payload: { ...product, idp: id + size.size } })} /> :
                                        <FiMinus onClick={() => dispatch({ type: "DECREASE", payload: { ...product, idp: id + size.size } })} />
                                    }
                                </button>
                                <span className={style.num_2Cproduct}>{e2p(quantityItem(state, id + size.size))}</span>
                                <button className={`${style.bTxn} ${quantityItem(state, id + size.size) >= size.stock ? style.enughNumber : ''}`} onClick={() => dispatch({ type: 'INCREASE', payload: { ...product, idp: id + size.size } })}>
                                    <FiPlus />
                                </button>
                            </div>
                            : <button className={style.TcoPjy} onClick={() => dispatch({ type: "ADD_ITEM", payload: { ...product, sizes: size, idp: id + size.size } })}>
                                <BsCart3 className={style.pkDes} />
                                افزودن به سبد خرید
                            </button>
                        }
                    </div>
                </div>
            </> :
                <div className={style.etmamMojody}>
                    <b>ناموجود</b>
                </div>}
        </>
    );
};

export default stock;