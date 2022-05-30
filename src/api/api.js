import axios from "axios"

axios.defaults.baseURL = 'https://api.thecatapi.com/v1'
axios.defaults.headers.common['x-api-key'] = '64d2caac-7fe4-4839-a1d3-81e9c7fcdc54'

export const getCats = (page) => axios.get('/images/search', {
    params: {
        limit: 20,
        page
    }
})

export const getFavoriteCats = async () => {
    let {data} = await axios.get('/favourites')
    return data.map((item) => ({...item.image, favourite: true, id: item.id}))    
}

export const addToFavorite = (id) => axios.post('/favourites', {
    image_id: id
})

export const removeFromFavorite = (id) => axios.delete(`/favourites/${id}`)