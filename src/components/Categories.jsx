import React from 'react'
import { categories } from '../data'
import "../styles/Categories.scss"
import { Link } from 'react-router-dom'

export const Categories = () => {
  return (
    <div className='categories'>
        <h1>Explore Top Categories</h1>
        <p>
        Explore our wide range of rentals that cater to all types of pilgrims and
        travelers. Immerse yourself in the festival, enjoy the comforts of
        home, and create unforgettable memories in this mahakumbh with us.
        </p>
      
      <div className='categories_list'>
        {categories?categories.slice(1,5).map((category,index)=>(
            <Link to={`/properties/category/${category.label}`} key={index}>
                <div className='category'>
                  <img src={category.img} alt={category.label}/>
                  <div className='overlay'></div>
                  <div className='category_text'>
                    <div className='category_text_icon'>{category.icon}</div>
                   <p>{category.label}</p>
                  </div>
                </div>
            </Link>
        )):<div></div>}
      </div>
    </div>
  )
}
