function validation(err) {
    let errors = {}

    // name
    if (!err.name) {
        errors.name = 'نام محصول را وارد نکردید.'
    } else if (!err.name.trim()) {
        errors.name = 'نام محصول را وارد نکردید.'
    } else if (err.name.length > 50) {
        errors.name = 'طول نام نباید بیشتر از 50 کارکتر باشد.'
    } else {
        delete errors.name
    }
    //brand
    if (!err.brand) {
        errors.brand = 'برند محصول را وارد نکردید.'
    } else if (!err.brand.trim()) {
        errors.brand = 'برند محصول را وارد نکردید.'
    } else if (err.brand.length > 50) {
        errors.brand = 'طول برند نباید بیشتر از 50 کارکتر باشد.'
    } else {
        delete errors.brand
    }
    // category
    if (!err.category.length) {
        errors.category = 'حداقل یک دسته را انتخاب کنید.'
    } else {
        delete errors.category
    }
    // img
    if (!err.img) {
        errors.img = 'لطفا عکس اصلی را وارد کنید.'
    } else {
        delete errors.img
    }
    // images
    if (!err.imageList.length) {
        errors.imageList = 'لطفا حداقل یک عکس برای لیست وارد کنید.'
    } else {
        delete errors.imageList
    }
    // price
    if (!err.price) {
        errors.price = 'قیمت محصول را فراموش کردید.'
    } else if (err.price < 1) {
        errors.price = 'قیمت محصول را به درستی وارد کنید.'
    } else {
        delete errors.price
    }
    // off-price 
    if (err.off_price === '') {
        errors.off_price = 'لطفا قیمت تخفیفی را وارد کنید.'
    } else if ((err.off_price) > (err.price)) {
        errors.off_price = 'قیمت تخفیفی نباید بیشتر از قیمت اصلی باشد.'
    } else {
        delete errors.off_price
    }
    // color
    if (!err.color) {
        errors.color = 'نام رنگ را وارد کنید.'
    } else if (/^[~`!@#$%^&*()_+=[\]\\{}|;':",./<>?a-zA-Z0-9-]+$/.test(err.color)) {
        errors.color = 'نام رنگ را به فارسی وارد کنید.'
    } else if (!err.color.trim()) {
        errors.color = 'نام رنگ را وارد کنید.'
    } else {
        delete errors.color
    }
    // colorCode
    if (!err.colorCode) {
        errors.colorCode = 'لطفا رنگ مورد نظر را وارد کنید.'
    } else {
        delete errors.colorCode
    }
    // sizes
    if (!err.sizes.length) {
        errors.sizes = 'سایز و تعداد موجود رو وارد کنید.'
    } else {
        delete errors.sizes
    }
    // attr
    if (!err.specifications.length) {
        errors.specifications = 'حداقل یک ویژگی را برای این محصول اضافه کنید.'
    } else {
        delete errors.specifications
    }

    return errors
}
export default validation;