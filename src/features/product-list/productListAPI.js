import axios from 'axios'
export const fetchProducts = () => {
    return new Promise(async (resolve) => {
        const { data } = await axios('http://localhost:8000/products')
        resolve(data)
    })
}