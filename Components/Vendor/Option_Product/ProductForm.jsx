import React, { useContext } from 'react';
import Form from './Form';
import { useRouter } from 'next/router';
import { Functions } from 'providers/FunctionsProvider';

const ProductForm = () => {
    const router = useRouter()
    const { SwalStyled } = useContext(Functions)
    return (
        <>
            <Form title='افزودن محصول جدید' push={router.push} SwalStyled={SwalStyled} />
        </>
    );
};

export default ProductForm;