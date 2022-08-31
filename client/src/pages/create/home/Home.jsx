import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {Bids, Header, } from '../../components'
import {axiosInstance} from '../../config'

const Home = () => {
  const [posts,setPosts] = useState([])
  const [users,setUsers] = useState([])
  const {search} = useLocation()

  useEffect(()=> {
    const fetchPosts = async () => {
     const res =  await axiosInstance.get("/posts" + search)
     const resUser =  await axiosInstance.get("/users")
     setPosts(res.data)
     setUsers(resUser.data)
    }
    fetchPosts()
  },[search])

  return <div>
   <Header users={users} />
   <Bids title="Hot Bids" posts={posts}  />
  </div>;
};

export default Home;
