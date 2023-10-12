

const ColorLabel = ({ name, code }) => {
    let style = {
        width: '16px',
        height: '16px',
        borderRadius: '50%'
    }
    return (
        <>

            <span>{name}</span>
            <span style={{ background: code, ...style }}></span>
        </>
    );
};

export default ColorLabel;