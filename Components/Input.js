import React, { useEffect, useState } from 'react';

const Input = ({ value, min, result, refrence, ...props }) => {
    const [val, setVal] = useState('')
    const handleChange = event => {
        setVal(event.target.value)
    }

    useEffect(() => {
        value && setVal(value)
    }, [value])

    const handleBlur = () => {
        result && result(val, props.name)
    }

    return (
        <>
            <input ref={refrence && refrence} onBlur={handleBlur} onChange={handleChange} value={val} min={min && min} {...props} />
        </>
    );
};

export default React.memo(Input);