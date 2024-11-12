
import './App.css'
import Home from './pages/Home/Home'
import {useDispatch} from "react-redux"
import axios from 'axios'
import { setUser } from './Store/slices/user.slice'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/dashboard'
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function App() {
  const dispatch = useDispatch()
  // const user = useSelector(state => state.user)

  const getUser = async () => {
    try {
      const url = `${baseUrl}/auth/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      const userData = {
        name : data.user._json.name,
        email : data.user._json.email,
        picture : data.user._json.picture
      }
      dispatch(setUser(userData))
      
      console.log("from frotend", data.user._json);
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {
    getUser();
  }, []);


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
