export default function decodeQueryData(data) {
    const ret = [];
    for (let d in data)
        if (d !== 'type' && d !== 'gender') {
            ret.push(decodeURIComponent(d) + '=' + decodeURIComponent(data[d]));
        }
    return ret.join('&');
}