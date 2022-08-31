import React, { useEffect, useState } from 'react';
import './profile.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/card01.png'
import Bids from '../../components/bids/Bids'
import { useLocation } from 'react-router';
import { axiosInstance } from '../../config';


const Profile = () => {
  const location = useLocation()
  const PF = "https://nft-marketplace-mern.herokuapp.com/images/"
  const path = location.pathname.split("/")[2];
  const [posts,setPosts] = useState([])
  const [users,setUsers] = useState([])

  useEffect(()=> {
    const fetchPosts = async () => {
     const res =  await axiosInstance.get(`/posts/?user=${path}`)
     const resUser =  await axiosInstance.get("/users")
     setPosts(res.data)
     setUsers(resUser.data)
    }
    fetchPosts()
  },[path])
  return (
    <div className='profile section__padding'>
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
            <img src={profile_pic} alt="profile" />
          {users.map(u => ( <>
            <h3>{path === u.username && u.fullname}</h3>
          </>
          ))}
        </div>
      </div>
      <div className="profile-bottom">
        <div className="profile-bottom-input">
          <input type="text" placeholder='Search Item here' />
          <select>
            <option>Recently Listed</option>
            <option>Popular</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
        <Bids posts={posts}  title="Item" />
      </div>
    </div>
  );
};

export default Profile;
