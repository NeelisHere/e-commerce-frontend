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
        if(productfilters[key].length>0) {
            query += `${k}=${productfilters[key].pop()}&`
        }
    })
    query = query.slice(0, query.length-1)
    return new Promise(async (resolve) => {
        // console.log('>>', query)
        const { data } = await axios(`http://localhost:8000/products?${query}`)
        resolve(data)
    })
}