import React from 'react'
import './header.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import card01 from '../../assets/card01.png'
import coin from '../../assets/coin.png'
import { Link,useLocation  } from 'react-router-dom';
const Header = ({users}) => {
  const location = useLocation()
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide:true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide:true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };
  return (
    <div className='header section__padding'>
      <div className="header-content">
        <div>
          <h1>Discover, collect, and sell extraordinary NFTs</h1>
          <img className='shake-vertical' src={coin} alt="" />
        </div>
      </div>
      <div className="header-slider">
        <h1>Top Sellers</h1>
       <Slider {...settings} className='slider'>
        {users.map(user => (
            <div className='slider-card'>
            <p className='slider-card-number'>1</p>
            <img src={card01} alt="" />
            <Link to={`/profile/${user.username}`}>
            <p className='slider-card-name'>{user.fullname}</p>
            </Link>
            <p className='slider-card-price'>4.932 <span>ETH</span></p>
          </div>
        ))}
          
         
        </Slider>
      </div>
    </div>
  )
}

export default Header
