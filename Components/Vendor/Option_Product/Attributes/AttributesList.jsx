import { BsDash } from 'react-icons/bs'
import style from './Attributes.module.css'

const AttributesList = ({ data = [], setProduct }) => {
    const handleDelete = (index) => {
        setProduct(prev => {
            prev.attributes.splice(index, 1);
            return { ...prev }
        })
    }
    return (
        <>
            <ul className={style.list}>
                {data.map((i, index) => {
                    return (
                        <li key={i.name} className={style.list_item}>
                            <span className={style.item_remove} onClick={() => handleDelete(index)}>
                                <BsDash fill='red' />
                            </span>
                            <p className={style.item_name}>{i.name} :</p>
                            <p className={style.item_value}>{i.value}</p>
                        </li>
                    )
                })}
            </ul>
        </>
    );
};

export default AttributesList;