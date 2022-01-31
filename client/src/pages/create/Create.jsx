import './create.css'
import Image from '../../assets/Image.png'
import { useContext, useEffect, useState } from 'react';
import {Context} from "../../context/Context"
import axios from 'axios'
const Create = () => {
  const [title,setTitle] = useState("")
  const [desc,setDesc] = useState("")
  const [price,setPrice] = useState("")
  const [coin,setCoin] = useState("")
  const [available,setAvail] = useState("")
  const [cat,setCat] = useState([])
  const [categories,setCate] = useState([])
  const [file,setFile] = useState(null)
  const {user} = useContext(Context)

  useEffect(()=> {
    const fetchPosts = async () => {
     const res =  await axios.get("/categories")
     setCat(res.data)
    }
    fetchPosts()
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username:user.username,
      title,
      desc,
      price,
      coin,
      categories,
      available
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name
      data.append("name",filename)
      data.append("file",file)
      newPost.photo = filename
      try {
        await axios.post("/upload",data)
      } catch (error) {
        
      }
    }
    try {
      const res = await axios.post("/posts",newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      
    }
  }


  return (
    <div className='create section__padding'>
      <div className="create-container">
        <h1>Create new Item</h1>
        <p className='upload-file'>Upload File</p>
        <div className="upload-img-show">
         
          {file ?(
            <>
            <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</h3>

            <img src={URL.createObjectURL(file)} alt="banner" className="writeImg" width={100} />
            </>
          ):(
            <>
            <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</h3>
            <img src={Image} alt="banner" />
            <p>Drag and Drop File</p>
            <p><span>or</span> browse media on your device</p>
            </>
          )
          }
         
         
        </div>
        <form className='writeForm' autoComplete='off' onSubmit={handleSubmit}>
          
          <div className="formGroup">
            <label>Upload</label>
            <input type="file" className='custom-file-input'
            onChange={(e) => setFile(e.target.files[0])}
          />
          </div>
          <div className="formGroup">
            <label>Name</label>
            <input type="text" placeholder='Item Name' autoFocus={true} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="formGroup">
            <label>Description</label>
            <textarea type="text" rows={4}
          placeholder='Decription of your item' onChange={e => setDesc(e.target.value)}
          ></textarea>
          </div>
          <div className="formGroup">
            <label>Price</label>
            <div className="twoForm">
              <input type="text" placeholder='Price' onChange={e => setPrice(e.target.value)} />
              <select onChange={e => setCoin(e.target.value)}>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="LTC">LTC</option>
              </select>
            </div>
          </div>
          <div className="formGroup">
            <label>Category</label>
            <select onChange={e => setCate(e.target.value)} >
              {cat.map(c => (
               <option  value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="formGroup">
            <label>Available Items</label>
            <input type="text" placeholder='No of Items' onChange={e => setAvail(e.target.value)} />
          </div>
          <button className='writeButton' type='submit'>Create Item</button>
        </form>
      </div>
    </div>
   
  )
};

export default Create;
