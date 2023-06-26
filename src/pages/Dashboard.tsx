import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const API_URL = import.meta.env.VITE_API_SERVICE_URL;
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  
  useEffect(() => {
     axios.get(`${API_URL}/dashboard`)
     .then(res => {
      if(res.data.Error){
        navigate("/login")
      }
     })
     .catch(err => console.log("Error: " + err))
  }, [])

  const handleLogout = async () => {
    axios.post(`${API_URL}/logout`)
    .then(res => {
      navigate("/login")
    })
    .catch(err => console.log("Error: " + err))
  }
  
  return (
    <div>
      Dashboard <br/><br/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard