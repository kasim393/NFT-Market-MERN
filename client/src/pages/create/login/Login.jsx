import React, { useContext, useRef } from 'react';
import './login.css'
import {Link} from 'react-router-dom'
import { Context } from '../../context/Context';
import {axiosInstance} from '../../config'
const Login = () => {
  const userRef = useRef()
  const passRef = useRef()
  const {dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault()
    //fetching
    dispatch({type:"LOGIN_START"})
    try {
      const res = await axiosInstance.post("/auth/login",{
        username: userRef.current.value,
        password: passRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload:res.data})
    } catch (error) {
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
  return (
    <div className='login section__padding'>
      <div className="login-container">
        <h1>Login</h1>
        <form className='login-writeForm' autoComplete='off' onSubmit={handleSubmit}>
          <div className="login-formGroup">
            <label>Username</label>
            <input type="text" placeholder='Username' ref={userRef} />
          </div>
          <div className="login-formGroup">
            <label>Password</label>
            <input type="password" placeholder='Password' ref={passRef} />
          </div>
          
         <div className="login-button">
          <button className='login-writeButton' type='submit' disabled={isFetching}>Login</button>
          <Link to="/register">
            <button className='login-reg-writeButton' type='submit'>Register</button>
          </Link>
         </div>
        </form>
      </div>
    </div>
   )
};

export default Login;
