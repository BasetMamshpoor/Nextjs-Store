export default function PasswordValidation(value, confirm) {
    const error = {
        length: false,
        letter: false,
        number: false,
        symbol: false,
        isMatch: false,
        progress: 0
    }

    if (!value.trim()) error.length = true
    else if (value.length < 8) error.length = true
    else if (value.length > 64) error.length = true
    else error.length = false

    if (!(/([a-z].*[A-Z])|([A-Z].*[a-z])/).test(value)) error.letter = true
    else error.letter = false

    if (!(/([0-9])/).test(value)) error.number = true
    else error.number = false

    if (!(/([!,%,&,@,#,$,^,*,?,_,~])/).test(value)) error.symbol = true
    else error.symbol = false

    if (!error.length) error.progress += 1
    if (!error.letter) error.progress += 1
    if (!error.number) error.progress += 1
    if (!error.symbol) error.progress += 1

    if (error.progress === 4 && confirm.trim() && value === confirm) error.isMatch = true
    else error.isMatch = false

    return error
}