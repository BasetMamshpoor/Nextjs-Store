import React, { useEffect, useState } from 'react';

const Input = ({ value, isNumber = false, min, result, refrence, ...props }) => {
    const [val, setVal] = useState()
    const handleChange = event => {
        const { value } = event.target
        if (isNumber) {
            setVal(value.replace(/\D/g, ""))
        } else {
            setVal(value)
        }
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