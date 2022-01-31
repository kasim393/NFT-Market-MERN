import './App.css';
import {Navbar,Footer} from './components'
import {Home,Profile,Item, Create,Login,Register,Settings} from './pages'
import { Routes, Route } from "react-router-dom";
import { useContext } from 'react';
import { Context } from './context/Context';

function App() {
  const {user} = useContext(Context);
  return (
    <div>
      <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":item/:id" element={<Item />} />
            <Route path="/create" element={user ? <Create /> : <Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/login" element={user ? <Home /> : <Login />} />
            <Route path="/register" element={user ?  <Home /> :  <Register />} />
            <Route path="/setting" element={<Settings />} />
          </Routes>
      <Footer />
    </div>
  );
}

export default App;
