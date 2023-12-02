function validation(product) {
    let errors = {}

    // name
    if (!product.name) {
        errors.name = 'نام محصول را وارد نکردید.'
    } else if (!product.name.trim()) {
        errors.name = 'نام محصول را وارد نکردید.'
    } else if (product.name.length > 50) {
        errors.name = 'طول نام نباید بیشتر از 50 کارکتر باشد.'
    } else {
        delete errors.name
    }
    // brand
    if (!product.brand_id) {
        errors.brand_id = 'برند محصول را انتخاب نکردید.'
    } else {
        delete errors.brand_id
    }
    // category
    if (product.category_id === null) {
        errors.category_id = '.لطفا حداقل یک سطح دسته بندی را وارد کنید'
    } else {
        delete errors.category_id
    }
    // image
    if (!product._method && !product.image) {
        errors.image = 'لطفا عکس اصلی را وارد کنید.'
    } else {
        delete errors.image
    }
    //images
    if (!product._method && !product.images.length) {
        errors.images = 'لطفا حداقل یک عکس برای لیست انتخاب کنید.'
    } else {
        delete errors.images
    }
    // price
    if (!product.price) {
        errors.price = 'قیمت محصول را وارد کنید.'
    } else if (product.price < 1) {
        errors.price = 'قیمت محصول را به درستی وارد کنید.'
    } else {
        delete errors.price
    }
    // off-price
    if (!product.off_date_from) {
        delete errors.offPrice
    }
    else if (!!product.off_date_from && (product.offPrice === product.price)) {
        errors.offPrice = 'قیمت اصلی با قیمت تخفیف برابر است!'
    } else if (!product.offPrice) {
        errors.offPrice = 'لطفا قیمت تخفیفی را وارد کنید.'
    } else if ((product.offPrice) > (product.price)) {
        errors.offPrice = 'قیمت تخفیفی نباید بیشتر از قیمت اصلی باشد.'
    } else {
        delete errors.offPrice
    }
    //discountTime
    if (60 > Math.round((product.off_date_to - product.off_date_from) / 6e4)) {
        errors.discountTime = 'حداقل زمان تخفیف یک ساعت است.'
    } else {
        delete errors.discountTime
    }
    // color
    if (!product.color) {
        errors.color = 'نام رنگ را وارد کنید.'
    } else if (/^[~`!@#$%^&*()_+=[\]\\{}|;':",./<>?a-zA-Z0-9-]+$/.test(product.color)) {
        errors.color = 'نام رنگ را به فارسی وارد کنید.'
    } else if (!product.color.trim()) {
        errors.color = 'نام رنگ را وارد کنید.'
    } else {
        delete errors.color
    }
    // colorCode
    if (!product.colorCode) {
        errors.colorCode = 'پالت رنگ را انتخاب کنید.'
    } else {
        delete errors.colorCode
    }
    // sizes
    if (!product._method && !product.sizes.length) {
        errors.sizes = 'سایز و تعداد موجود رو وارد کنید.'
    } else {
        delete errors.sizes
    }
    // attr
    if (!product.attributes.length) {
        errors.attributes = 'حداقل یک ویژگی را برای این محصول اضافه کنید.'
    } else {
        delete errors.attributes
    }

    return errors
}
export default validation;