const p2e = s => {
    return parseInt(s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
}
const e2p = s => {
    return (s).toString().replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}
export { p2e, e2p };