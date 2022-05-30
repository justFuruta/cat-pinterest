import React from 'react'

const Header = ({favorite, setFavorites}) => {
    return (
        <header className='header'>
            <nav className='header__nav'>
                <ul className='nav__list'>
                    <li className={'list__item ' + (favorite ? '' : 'active')}>
                        <a 
                            href='#'
                            className='nav__link'
                            onClick={(e) => {
                                e.preventDefault()
                                setFavorites(false)
                            }}
                            >Все котики</a>
                    </li>
                    <li className={'list__item ' + (favorite ? 'active' : '')}>
                        <a  
                            href='#'
                            className='nav__link'
                            onClick={(e) => {
                                e.preventDefault()
                                setFavorites(true)
                            }}
                            >Любимые котики</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header