import React from 'react'
import './swicher.scss'


const Swicher = () => {
  return (    
    <label className="switch">
      <input type="checkbox" id="toggle"/>
      <span className="slider"></span>      
    </label>  
  )
}

export default Swicher
