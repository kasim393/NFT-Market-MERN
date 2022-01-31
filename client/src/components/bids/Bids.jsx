import React from 'react'
import './bids.css'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import bids1 from '../../assets/bids1.png'
import { Link } from 'react-router-dom';

const Bids = ({title, posts}) => {
  const PF = "http://localhost:5000/images/"
  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
  
          {posts.map(p => (
              <div className="card-column" key={p._id}>
              <div className="bids-card">
                <div className="bids-card-top">
                {p.photo ? (
                  <img src={PF + p.photo} alt="" />
                ):(
                  <img src={bids1} alt="" />
                )}

                <Link to={`/post/${p._id}`}>
                <p className="bids-title">{p.title}</p>
                </Link>
                </div>
                <div className="bids-card-bottom">
                  <p>{p.price} <span>{p.coin}</span></p>
                  <p> <AiFillHeart /> 92</p>
                </div>
              </div>
              </div>
          
          ))}

        </div>
      </div>
    </div>
  )
}

export default Bids
