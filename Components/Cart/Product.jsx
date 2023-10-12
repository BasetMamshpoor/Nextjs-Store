import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';

import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { TfiRuler } from 'react-icons/tfi'
import style from './Product.module.css'
import img from 'public/Images/empty-cart.svg'
import Link from 'next/link';

const Product = ({ state, dispatch }) => {

    return (
        <>
            {state.length ? state.map(({ colorCode, ...p }) => {
                return (
                    <div className={style.tEl_7HqZy} key={p.idp}>
                        <div className={style.LbOT_Plwz33}>
                            <Link href={`/products/${p.id}`} state={p.sizes} className={style.C41A__jF}>
                                <img src="images/product/111328697.jpg" alt="" />
                            </Link>
                            <div className={style.lGJkVwYt}>
                                <h3 className={style.RxQOi_5_ed}>{p.name}</h3>
                                <div className={style.MncBgTfd_Pr}>
                                    <div className={style.Detail_Pnmvg}><span style={{ background: colorCode }}></span></div>
                                    <p>{p.color}</p>
                                </div>
                                <div className={style.MncBgTfd_Pr}>
                                    <div className={style.Detail_Pnmvg}>
                                        <TfiRuler />
                                    </div>
                                    <p>{p.sizes.size}</p>
                                </div>
                                <div className={style.vVBE__0Oiju}>
                                    <div className={style.G_VwXabc_99L}>
                                        <p className={style.price_3Sproduct}>{addComma(p.offPrice.toString())}</p>
                                        {p.offPrice !== p.price && <div className={style.UcUrzyq}>{addComma(p.price.toString())}<span>تخفیف</span></div>}
                                    </div>
                                    <div className={style.Dc_Oi88Ted}>
                                        <button className={`${style.bTxn} ${p.quantity >= p.sizes.stock ? style.enughNumber : ''}`} onClick={() => dispatch({ type: "INCREASE", payload: p })}>
                                            <FiPlus />
                                        </button>
                                        <span className={style.num_2Cproduct}>{e2p(p.quantity)}</span>
                                        <button className={style.bTxn}>
                                            {p.quantity < 2 ?
                                                <FiTrash2 onClick={() => dispatch({ type: "REMOVE_ITEM", payload: p })} /> :
                                                <FiMinus onClick={() => dispatch({ type: "DECREASE", payload: p })} />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) :
                <div className={style.empty}>
                    <div className={style.pHvtxu}>
                        <img src={img.src} alt="" />
                        <p>سبد خرید شما خالی است.</p>
                    </div>
                </div>
            }
        </>
    );
};

export default Product;