import React, { useState } from 'react'
import "./footer.css"
import { useProductData } from '../../contexts/productContext/productContext';

const Footer = () => {
  const { categories } = useProductData();
  const [style, setStyle] = useState({})
  return (
    <section className='footer-container'>
      <div >
        <h3 className='footer-heading'>All Categories</h3>
        <div className='all-list'>
          {
            categories.map(({ categoryName, _id }) => <p
              key={_id}


              style={style}
            >{categoryName}</p>)
          }
        </div>

      </div>
      <div>
        <h3 className='footer-heading' >Connect With Us</h3>
        <div className='all-list'>
          <p>Linkdin</p>

          <p>GitHub</p>
          <p>InstaGram</p>
        </div>

      </div>
      <div>
        <h3 className='footer-heading'>Contact Us</h3>

        <div className='all-list' >
          <h4>Rohit Bahuguna</h4>
          <p>Call / Whatsapp : <span className='contact'>9627944998</span></p>

          <p>Email :  <span className='contact'>rohitbahuguna.work@gmail.com</span></p>
        </div>


      </div>
    </section>
  )
}

export default Footer