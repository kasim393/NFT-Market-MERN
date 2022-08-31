import React, { useState } from 'react';
import './register.css'
import {Link} from 'react-router-dom'
import Image from '../../assets/Image.png'
import { axiosInstance } from '../../config';

const Register = () => {
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [file,setFile] = useState(null)
  const handleSubtmit = async (e) => {
    e.preventDefault();
    setError(false)
    const newUser = {
        fullname,
        username,
        email,
        password
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name
      data.append("name",filename)
      data.append("file",file)
      newUser.profilePic = filename
      try {
        await axiosInstance.post("/upload",data)
      } catch (error) {}
    }
    try {
      const res = await axiosInstance.post("/auth/register",newUser)
      res.data && window.location.replace("/login")
      
      
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div className='register section__padding'>
      <div className="register-container">
        <h1>register</h1>
        <p className='upload-file'>Upload Profile pic</p>
        <div className="upload-img-show">
        {file ? (
          <img src={URL.createObjectURL(file)} width={100} alt="banner" />
        ):(
          <img src={Image} alt="banner" />
        )}
          <p>browse media on your device</p>
        </div>
        <form className='register-writeForm' autoComplete='off' onSubmit={handleSubtmit}>
          <div className="register-formGroup">
            <label>Upload</label>
            <input type="file" className='custom-file-input'
            onChange={(e) => setFile(e.target.files[0])}
          />
          </div>
          <div className="register-formGroup">
            <label>Full Name</label>
            <input type="text" placeholder='Name' onChange={e=> setFullname(e.target.value)} />
          </div>
          <div className="register-formGroup">
            <label>Username</label>
            <input type="text" placeholder='Username' onChange={e=> setUsername(e.target.value)} />
          </div>
          <div className="register-formGroup">
            <label>Email</label>
            <input type="email" placeholder='Email' onChange={e=> setEmail(e.target.value)} />
          </div>
          <div className="register-formGroup">
            <label>Password</label>
            <input type="text" placeholder='Password' onChange={e=> setPassword(e.target.value)}   />
          </div>
         <div className="register-button">
          <button className='register-writeButton' type='submit'>register</button>
          <Link to="/login">
            <button className='reg-login-writeButton' type='submit'>Login</button>
          </Link>
         </div>
         {error && <span style={{color:"crimson", marginTop:"10px"}}>Something went wrong!</span>}
        </form>
      </div>
    </div>
   )
};

export default Register;
