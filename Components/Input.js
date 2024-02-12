import React, { useEffect, useState } from 'react';

const Input = ({ value, isNumber = false, result, refrence, ...props }) => {
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
        if (!!value) setVal(value)
        else if (value === 0) setVal(value)
    }, [value])

    const handleBlur = () => {
        result && result(props.name, val)
    }

    return (
        <>
            <input ref={refrence && refrence} onBlur={handleBlur} onChange={handleChange} value={val} {...props} />
        </>
    );
};

export default React.memo(Input);