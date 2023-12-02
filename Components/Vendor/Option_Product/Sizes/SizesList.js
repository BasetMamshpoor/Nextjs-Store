import { IoIosClose } from 'react-icons/io';
import style from './Size.module.css'
import { e2p } from 'Functions/ConvertNumbers';
const SpecificationsList = ({ setProduct, sizes = [] }) => {

    const handleDelete = (index) => {
        setProduct(prev => {
            prev.sizes.splice(index, 1);
            return { ...prev }
        })
    }
    return (
        <>
            {
                sizes.map((i, index) => {
                    return (
                        <div className={style.hpxea_fzjbg} key={index}>
                            <div className={style.cAzqpbg}>
                                <span>{i.size}</span>
                                _
                                <span>({e2p(i.stock)})</span>
                            </div>
                            <span className={style.remove_list}
                                onClick={() => handleDelete(index)}>
                                <IoIosClose className={style.remove_listSvg} />
                            </span>
                        </div>
                    )
                })
            }
        </>
    );
};

export default SpecificationsList;