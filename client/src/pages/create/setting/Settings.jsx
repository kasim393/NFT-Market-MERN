import React, { useContext, useState } from 'react';
import './settings.css'
import Image from '../../assets/Image.png'
import { Context } from '../../context/Context'
import { axiosInstance } from '../../config';

const Settings = () => {
  const [fullname, setFullname] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [success,setSuccess] = useState(false)
  const [file,setFile] = useState(null)
  const {user,dispatch } = useContext(Context)

  const PF = "https://nft-marketplace-mern.herokuapp.com/images/"
  const handleSubtmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
        userId:user._id,
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
      updatedUser.profilePic = filename
      try {
        await axiosInstance.post("/upload",data)
      } catch (error) {}
    }
    try {
      const res = await axiosInstance.put("/users/"+ user._id,updatedUser);
      setSuccess(true)
      dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    } catch (error) {
      dispatch({type:"UPDATE_FAILURE"})
    }
  }

  return (
    <div className='settings section__padding'>
      <div className="settings-container">
        <h1>Update Your Account</h1>
        <p className='upload-file'>Upload Profile pic</p>
        <div className="upload-img-show">
        {file ? (
          <img src={URL.createObjectURL(file)} width={100} alt="banner" />
        ):(
          <img src={ PF+user.profilePic} alt="banner" width={100} />
        )}
          <p>browse media on your device</p>
        </div>
        <form className='settings-writeForm' autoComplete='off' onSubmit={handleSubtmit}>
          <div className="settings-formGroup">
            <label>Upload</label>
            <input type="file" className='custom-file-input'
            onChange={(e) => setFile(e.target.files[0])}
          />
          </div>
          <div className="settings-formGroup">
            <label>Full Name</label>
            <input type="text" placeholder={user.fullname} onChange={e=> setFullname(e.target.value)} />
          </div>
          <div className="settings-formGroup">
            <label>Username</label>
            <input type="text" placeholder={user.username}onChange={e=> setUsername(e.target.value)} />
          </div>
          <div className="settings-formGroup">
            <label>Email</label>
            <input type="email" placeholder={user.email} onChange={e=> setEmail(e.target.value)} />
          </div>
          <div className="settings-formGroup">
            <label>Password</label>
            <input type="text" placeholder='Password'  onChange={e=> setPassword(e.target.value)}   />
          </div>
         <div className="settings-button">
          <button className='settings-writeButton' type='submit'>Update</button>
          {success && <span style={{color:"green"}}>Profile has been updated</span>}
         </div>
        </form>
      </div>
    </div>
   )
};

export default Settings;
