import './errorStyle.scss'
import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useNavigate } from 'react-router-dom'

const ErrorComponent = () => {
  const navigate = useNavigate()

  return (
    <div className="error">
      <Sidebar />
      <div className="errorContainer">
        <Navbar />
        <div className="errorBody">
          <div className="errorContent">
            <div className="text">You don't have permission!</div>
            <button className="button" onClick={() => navigate('/')}>
              Back to home
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorComponent
