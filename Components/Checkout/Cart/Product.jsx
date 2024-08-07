import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { BsBuilding } from "react-icons/bs";
import { TfiRuler } from 'react-icons/tfi'
import style from './Product.module.css'
import img from 'public/Images/empty-cart.svg'
import Link from 'next/link';
import Image from 'next/image';

const Product = ({ state, dispatch }) => {

    return (
        <>
            {state.length ? state.map(p => {
                const isDeleted = p.messages?.find(m => m.type === 'deleted')
                return (
                    <div className={`${style.tEl_7HqZy} ${isDeleted ? style.deleted_pro : ''}`} key={p.idp} id='product'>
                        <div className={style.LbOT_Plwz33}>
                            <Link href={`/products/${p.id}`} className={style.C41A__jF}>
                                <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={p.image} alt="" />
                            </Link>
                            <div className={style.lGJkVwYt}>
                                <h3 className={style.RxQOi_5_ed}>{p.name}</h3>
                                <div className={style.MncBgTfd_Pr}>
                                    <div className={style.box}>
                                        <div className={style.Detail_Pnmvg}>
                                            <BsBuilding />
                                        </div>
                                        <p>{p.brand.name}</p>
                                    </div>
                                    <div className={style.box}>
                                        <div className={style.Detail_Pnmvg}><span style={{ background: p.colorCode }}></span></div>
                                        <p>{p.color}</p>
                                    </div>
                                    {!!p.sizes && <div className={style.box}>
                                        <div className={style.Detail_Pnmvg}>
                                            <TfiRuler />
                                        </div>
                                        <p>{p.sizes.size}</p>
                                    </div>}
                                </div>
                                {!isDeleted && <div className={`${style.vVBE__0Oiju} ${style.lg_screen}`}>
                                    <div className={style.G_VwXabc_99L}>
                                        <p className={style.price_3Sproduct}>{addComma(p.offPrice.toString())}</p>
                                        {p.offPrice !== p.price && <div className={style.UcUrzyq}>{addComma(p.price.toString())}<span>تخفیف</span></div>}
                                    </div>
                                    <div className={style.Dc_Oi88Ted}>
                                        <button className={`${style.bTxn} ${p.quantity >= p.sizes?.stock ? style.enughNumber : ''}`} onClick={() => dispatch({ type: "INCREASE", payload: p })}>
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
                                </div>}
                                <div className={style.MncBgTfd_Pr}>
                                    {p.messages && <div className={style.message}>
                                        {
                                            p.messages.map(m => {
                                                return (
                                                    <p className={style[m.type]}>{m.text}</p>
                                                )
                                            })
                                        }
                                    </div>}
                                </div>
                            </div>
                        </div>
                        {!isDeleted && <div className={`${style.vVBE__0Oiju} ${style.sm_screen}`}>
                            <div className={style.G_VwXabc_99L}>
                                <p className={style.price_3Sproduct}>{addComma(p.offPrice.toString())}</p>
                                {p.offPrice !== p.price && <div className={style.UcUrzyq}>{addComma(p.price.toString())}<span>تخفیف</span></div>}
                            </div>
                            <div className={style.Dc_Oi88Ted_sm}>
                                <button className={`${style.bTxn} ${p.quantity >= p.sizes?.stock ? style.enughNumber : ''}`} onClick={() => dispatch({ type: "INCREASE", payload: p })}>
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
                        </div>}
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