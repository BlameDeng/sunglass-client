const formatDate = (params) => {
    const obj = ensureObj(params)
    const year = obj.getFullYear()
    const month = fixed(obj.getMonth()+1)
    const date = fixed(obj.getDate())
    const hours = fixed(obj.getHours())
    const minutes = fixed(obj.getMinutes())
    return '' + year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
}

const ensureObj = (params) => {
    if (typeof params === 'string') {
        return new Date(params)
    } else {
        return params
    }
}

const fixed = (params) => {
    return params > 9 ? params : '0' + params
}

export default formatDate