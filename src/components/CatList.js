import React, { useEffect, useState } from 'react'
import { getCats, getFavoriteCats, addToFavorite, removeFromFavorite } from '../api/api'

const CatList = ({ favorite }) => {
    const [cats, setCats] = useState([])
    const [page, setPage] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        if (isLoading) {
            if (favorite) {
                getFavoriteCats()
                    .then((data) => {
                        setCats(c => [...c, ...data])
                    })
                    .finally(() => {
                        setIsLoading(false)
                    })
            } else {
                getCats(page)
                    .then(({ data }) => {
                        setCats(c => [...c, ...data])
                    })
                    .finally(() => {
                        setIsLoading(false)
                        setPage(p => p + 1)
                    })
            }

        }
    }, [isLoading])

    useEffect(() => {
        if (!isLoading) {
            setPage(0)
            setCats([])
            setIsLoading(true)
        }
    }, [favorite])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    })



    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            if (!isLoading && !favorite) {
                setIsLoading(true)
            }
        }
    }

    const addToFavorites = (id) => {
        addToFavorite(id)
            .then(() => {
                setCats(c => c.map(cat => {
                    if (cat.id === id) {
                        return { ...cat, favourite: true }
                    } else {
                        return cat
                    }
                }))
            })
            .catch((error) => console.log(error))
    }

    const removeFromFavorites = (id) => {
        removeFromFavorite(id)
            .then(() => {
                setCats(c => c.map(cat => {
                    if (cat.id === id) {
                        return { ...cat, favourite: false }
                    } else {
                        return cat
                    }
                }))
            })
            .catch((error) => console.log(error))
    }


    return (
        <>
            <div className='catlist'>
                {
                    cats.map((cat) => {
                        return (
                            <div key={cat.id} className='catlist__card'>
                                <img alt='cat' className='card__image' src={cat.url} />
                                {
                                    cat.favourite
                                        ?
                                        <span
                                            onClick={() => removeFromFavorites(cat.id)}
                                            className='card__like liked' />
                                        :
                                        <span
                                            onClick={() => addToFavorites(cat.id)}
                                            className='card__like' />
                                }
                            </div>
                        )
                    })
                }
            </div>
            {isLoading
                ?
                <p className='text_center'>... загружаем еще котиков ...</p>
                :
                null}
        </>
    )
}

export default CatList