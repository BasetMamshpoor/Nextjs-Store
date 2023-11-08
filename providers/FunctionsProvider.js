import React, { createContext } from 'react';
import Swal from 'sweetalert2'


export const Functions = createContext()

const FunctionsProvider = ({ children }) => {

    const SwalStyled = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn",
            denyButton: "btn"
        },
        confirmButtonText: 'باشه',
        denyButtonText: 'لغو',
        cancelButtonText:'لغو',
        buttonsStyling: false
    })

    return (
        <Functions.Provider value={{ SwalStyled }}>
            {children}
        </Functions.Provider>
    );
};

export default FunctionsProvider;