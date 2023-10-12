const addComma = (Number, character = ',') => {
    let newNumber;

    newNumber = Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, character);

    return newNumber.toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
};

export default addComma;