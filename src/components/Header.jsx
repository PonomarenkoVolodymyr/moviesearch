import React from 'react'
import '../assets/css/header.scss'
import logo from '../assets/img/logo.png'
import { NavLink } from 'react-router-dom'
import Swicher from './Swicher'
const Header = () => {
 
  return (
    <div className='header'>
      <div className='left-part'>
        <div className='logo-group'>
          <img src={logo} alt="logo" />
          <h2>Movie search</h2>
        </div>
        <ul className='nav'>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about" end>About us</NavLink></li>
          <li><NavLink to="/favorites" end>Favorites</NavLink></li>
        </ul>
      </div> 
      <Swicher/>
    </div>
  )
}

export default Header
