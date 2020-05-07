import React  from 'react'
import logo from '../assets/eurovision-logo.svg'
const Header = () => {

    return (
        <>
            <nav className="navbar">
                <a href="/" className="navbar__logo">
                    <img src={logo}
                         alt="Logo"/>
                </a>
                <div>EUROVISION-CONTEXT 2020</div>
            </nav>
        </>
    )
}

export default Header
