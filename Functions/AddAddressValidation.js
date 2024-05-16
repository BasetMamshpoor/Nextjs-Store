export default function (params) {
    let errors = {};

    // title
    if (!params.title) {
        errors.title = true
    } else if (!params.title.trim()) {
        errors.title = true
    } else if (params.title.length > 20) {
        errors.title = true
    } else {
        delete errors.title
    }
    // address
    if (!params.address) {
        errors.address = true
    } else if (!params.address.trim()) {
        errors.address = true
    } else if (params.address.length < 6) {
        errors.address = 'طول آدرس حداقل 5 حرف باید باشد.'
    } else if (params.address.length > 400) {
        errors.address = 'طول ادرس حداکثر 400 حرف میتواند باشد.'
    } else {
        delete errors.address
    }
    // province
    if (!params.province) {
        errors.province = true
    } else if (!params.province.trim()) {
        errors.province = true
    } else {
        delete errors.province
    }
    // city
    if (!params.city) {
        errors.city = true
    } else if (!params.city.trim()) {
        errors.city = true
    } else {
        delete errors.city
    }

    // number
    if (!params.number) {
        errors.number = true
    } else if (!params.number.trim()) {
        errors.number = true
    } else {
        delete errors.number
    }
    // postalcode
    if (!params.postalcode) {
        errors.postalcode = true
    } else if (!params.postalcode.trim()) {
        errors.postalcode = true
    } else {
        delete errors.postalcode
    }
    // name
    if (!params.name) {
        errors.name = true
    } else if (!params.name.trim()) {
        errors.name = true
    } else {
        delete errors.name
    }
    // cellphone
    if (!params.cellphone) {
        errors.cellphone = true
    } else if (!params.cellphone.trim()) {
        errors.cellphone = true
    } else {
        delete errors.cellphone
    }

    return errors;
}
