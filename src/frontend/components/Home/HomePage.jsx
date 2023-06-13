import React, { useState } from 'react';
import Layout from '../common/Layout';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useProductData } from '../../contexts/productContext/productContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ACTION_TYPE } from '../../utils';

const HomePage = () => {
  const { categories, dispatchProductData } = useProductData();

  const navigate = useNavigate();
  const categoryFilter = () => { };
  const [carouselImages, setcarouselImages] = useState([
    'essentials.jpg', 'Back-to-school_Banner_1500x300.gif', 'healtly.jpg', "mangomadness.jpg", 'supersaver.jpg'
  ])
  const navigateToProductPage = (categoryName) => {
    dispatchProductData({
      type: ACTION_TYPE.SELECTED_CATEGORY,
      payload: categoryName
    });
    navigate(`/products/${categoryName}`)
  }


  return (
    <Layout>
      <div className="home-container">
        <div className="home-hero-img-container">
          <img
            onClick={() => navigate('/products')}
            className="img-responsive home-hero-img"
            src="/images/homepage-main-baner.jpg"
            alt="home-image"
          />
        </div>
        <div className="home-cards">
          {categories.map(({ categoryName, _id, id, banner }) => {
            return (
              <div
                key={_id}
                onClick={() => categoryFilter('Men')}
                className="card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq">
                <div className="card-img-container-hz home-card-img-container"
                  onClick={() => navigateToProductPage(categoryName)}>
                  <img className="banner-img" src={banner} alt="card image" />
                </div>
                <div>
                  <h3 className="card-content">
                    {categoryName}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="home-subheading-image">
          <Carousel
            showArrows={true}
            showIndicators={false}
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            stopOnHover={true}
            swipeable={true}

            interval={3000}
            transitionTime={1000}>

            {
              carouselImages.map((image, index) => {
                return <div key={index}>
                  <img src={`/images/carousel/${image}`} alt="" />
                </div>
              })
            }
          </Carousel>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
