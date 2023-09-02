import axios from 'axios'

export const fetchProducts = () => {
    return new Promise(async (resolve) => {
        const { data } = await axios('http://localhost:8000/products')
        resolve(data)
    })
}

export const fetchProductsByFilters = (productfilters) => {
    // console.log('inside fetchProductsByFilters:\n', productfilters)
    let query = ''
    Object.keys(productfilters).forEach((key) => {
        let k;
        switch (key) {
            case 'brands': 
                k = 'brand'
                break
            case 'categories':
                k = 'category'
                break
            default:
                k = ''
                break
        }
        // console.log(productfilters[key])
        if(productfilters[key].length>0) {
            const last = productfilters[key].length-1
            query += `${k}=${productfilters[key][last]}&`
        }
    })
    query = query.slice(0, query.length-1)
    return new Promise(async (resolve) => {
        const { data } = await axios(`http://localhost:8000/products?${query}`)
        resolve(data)
    })
}