import React, { useContext, useEffect, useState } from 'react';
import './item.css'
import creator from '../../assets/card01.png'
import item from '../../assets/item1.png'
import { useLocation } from 'react-router';
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import {axiosInstance} from '../../config'
import {Context} from "../../context/Context"
const Item = () => {
  const location = useLocation()
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({})
  const PF = "https://nft-marketplace-mern.herokuapp.com/images/"
  const {user} = useContext(Context)

  useEffect(()=> {
    const getPost = async  () => {
      const res = await axiosInstance.get("/posts/" + path)
      setPost(res.data)
    }
    getPost()
  },[path])

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/posts/${post._id}`,{
        data:{username:user.username}
      })
      window.location.replace("/");
    } catch (error) {}
  }

  return( 
      <div className='item section__padding'>
        <div className="item-image">
          {post.photo ? (
            <img src={PF + post.photo} alt="item" />
            ):(
              <img src={item} alt="item" />
          )}
        </div>
          <div className="item-content">
            {post.username === user?.username &&(
              <div className="item-content-action">
              <p  onClick={handleDelete}><AiFillDelete/></p>
              </div>
              )}
            <div className="item-content-title">
              <h1>{post.title}</h1>
                  <p>From <span>{post.price}</span>
                {post.available}  of 25 available</p>
            </div>
            <div className="item-content-creator">
              <div><p>Creater</p></div>
              <div>
                <img src={creator} alt="creator" />
                <p>{post.username}</p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>{post.desc}</p>
            </div>
            <div className="item-content-buy">
              <button className="primary-btn">Buy For {post.price} {post.coin}</button>
              <button className="secondary-btn">Make Offer</button>
            </div>
          </div>
      </div>
  )
};

export default Item;
