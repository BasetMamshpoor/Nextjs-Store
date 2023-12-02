import { BsDash } from 'react-icons/bs'
const AttributesList = ({ data = [], setProduct }) => {
    const handleDelete = (index) => {
        setProduct(prev => {
            prev.attributes.splice(index, 1);
            return { ...prev }
        })
    }
    return (
        <>
            <ul className="oVtn flex-column">
                {data.map((i, index) => {
                    return (
                        <li key={index} style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                            <span style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                onClick={() => handleDelete(index)}>
                                <BsDash fill='red' />
                            </span>
                            <p className="ms-2" style={{ color: '#747474', width: '200px', padding: '12px 8px' }}>{i.name} :</p>
                            <p className="Vxqz_o border-bottom flex-grow-1" style={{ padding: '12px 0', fontSize: '12px' }}>{i.value}</p>
                        </li>
                    )
                })}
            </ul>
        </>
    );
};

export default AttributesList;