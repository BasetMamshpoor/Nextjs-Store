import { IoIosClose } from 'react-icons/io';

const SpecificationsList = ({ setProduct, sizes = [] }) => {

    const handleDelete = (index) => {
        setProduct(prev => {
            prev.sizes.splice(index, 1);
            return { ...prev }
        })
    }
    const hpxea_fzjbg = {
        margin: '5px 3px',
        border: '1px solid gray',
        background: 'rgb(189, 189, 189)',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '15px',
        padding: '2px 4px',
    }
    const cAzqpbg = {
        marginLeft: '2px',
        padding: '0 2px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '-3px',
        userSelect: 'none',
        fontSize: '14px',
        fontWeight: '600',
        color: '#000',
        letterSpacing: '3px',
    }

    const remove_list = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
    const remove_listSvg = {
        cursor: 'pointer',
    }

    return (
        <>
            {
                sizes.map((i, index) => {
                    return (
                        <div style={hpxea_fzjbg} key={index}>
                            <div style={cAzqpbg}>
                                <span>{i.size}</span>
                                _
                                <span>{i.stock}</span>
                            </div>
                            <span style={remove_list}
                                onClick={() => handleDelete(index)}>
                                <IoIosClose style={remove_listSvg} />
                            </span>
                        </div>
                    )
                })
            }
        </>
    );
};

export default SpecificationsList;