

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
        width: '20px',
        height: '20px',
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
                                <svg style={remove_listSvg} fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
                            </span>
                        </div>
                    )
                })
            }
        </>
    );
};

export default SpecificationsList;