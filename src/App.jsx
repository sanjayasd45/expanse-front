
import './App.css'
import Home from './pages/Home/Home'
import {useDispatch} from "react-redux"
import axios from 'axios'
import { setUser } from './Store/slices/user.slice'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard'
import Auth from './pages/Auth/Auth'
const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

function App() {
  const dispatch = useDispatch()
  // const user = useSelector(state => state.user)

  const getUser = async () => {
    try {
      const url = `${baseUrl}/auth/login`;
      const { data } = await axios.get(url, { withCredentials: true });
      const value = JSON.parse(localStorage.getItem('userData'));
      console.log(data.user);
      dispatch(setUser(value))
      
      console.log("from frotend", data.user);
    } catch (e) {
      console.log(e.message);
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
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
