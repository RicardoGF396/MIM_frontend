import axios from 'axios';
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

function Dashboard() {

  const API_URL = import.meta.env.VITE_API_SERVICE_URL;
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
     axios.get(`${API_URL}/dashboard`, {
      headers: {
        'access-token' : localStorage.getItem('token')
      }
     })
     .then(res => {
      if(res.data.error){
        navigate("/login")
      }
     })
     .catch(err => console.log("Error: " + err))
  }, [])
  
  return (
    <div className='flex'>
      <Sidebar />
      <Outlet  />
    </div>
  )
}

export default Dashboard