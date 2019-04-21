const formatData = (options={}) => {
    let defaults = {
        data: [],
        code: 200
    }

    let res = { ...defaults, ...options }


    return res;
}

module.exports = formatData;