import SelectCategory from 'Components/Categories/SelectCategory';
import SelectGender from 'Components/Categories/SelectGender';
import React from 'react';

const Womens = () => {
    return (
        <>
            <SelectGender gender={'kids'} />
            <SelectCategory gender={'kids'} />
        </>
    );
};

export default Womens;