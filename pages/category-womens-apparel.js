import SelectCategory from 'Components/Categories/SelectCategory';
import SelectGender from 'Components/Categories/SelectGender';
import React from 'react';

const Womens = () => {
    return (
        <>
            <SelectGender gender={'womens'} />
            <SelectCategory gender={'womens'} />
        </>
    );
};

export default Womens;