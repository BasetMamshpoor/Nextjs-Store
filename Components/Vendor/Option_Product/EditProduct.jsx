import React, { useContext } from 'react';
import EditForm from './EditForm';
import { Functions } from 'providers/FunctionsProvider';

const EditProduct = () => {
    const { SwalStyled } = useContext(Functions)
    return (
        <>
            <EditForm SwalStyled={SwalStyled} />
        </>
    );
};

export default EditProduct;